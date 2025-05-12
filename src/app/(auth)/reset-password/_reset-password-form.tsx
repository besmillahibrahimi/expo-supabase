import { Button, ButtonText } from "@/components/ui/button";
import {
	FormControl,
	FormControlError,
	FormControlErrorText,
	FormControlHelper,
	FormControlHelperText,
	FormControlLabel,
	FormControlLabelText
} from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { Link, LinkText } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { supabase } from "@/configs/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Box } from "../../../components/ui/box";
import { type ResetPasswordFormData, resetPasswordSchema } from "./_schema";

export default function ResetPasswordForm() {
	const [isLoading, setIsLoading] = useState(false);
	const form = useForm<ResetPasswordFormData>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			password: "",
			confirmPassword: "",
		},
	});
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);
	const [formData, setFormData] = useState<ResetPasswordFormData>({
		password: "",
		confirmPassword: "",
	});


	const handleSubmit = async (data: ResetPasswordFormData) => {
		
		setIsLoading(true);
		setError("");
		setSuccess(false);

		try {
			const { error } = await supabase.auth.updateUser({
				password: data.password,
			});

			if (error) throw error;

			setSuccess(true);
		} catch (error) {
			setError((error as Error).message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Box className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
			<VStack space="md">
				<Heading size="xl" className="text-center">
					Reset Password
				</Heading>
				
						<Text className="text-center">
							Enter your new password to reset your account.
						</Text>
						<Box className="space-y-4 w-full">
							<Controller
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormControl isRequired>
										<FormControlLabel>
											<FormControlLabelText>Password</FormControlLabelText>
										</FormControlLabel>
										<Input>
											<InputField
												placeholder="Enter your password"
												value={field.value}
												onChangeText={field.onChange}
											/>
										</Input>
										<FormControlHelper>
											<FormControlHelperText>
												Must be atleast 6 characters.
											</FormControlHelperText>
										</FormControlHelper>
										<FormControlError>
											
											<FormControlErrorText>
												Atleast 6 characters are required.
											</FormControlErrorText>
										</FormControlError>
									</FormControl>
								)}
							/>
							<Controller
								control={form.control}
								name="confirmPassword"  
								render={({ field }) => (
									<FormControl isRequired>
										<FormControlLabel>
											<FormControlLabelText>Confirm Password</FormControlLabelText>
										</FormControlLabel>
										<Input>
											<InputField
												placeholder="Confirm your password"
												value={field.value}
												onChangeText={field.onChange}
											/>
										</Input>
										<FormControlHelper>
											<FormControlHelperText>
												Must match the password.
											</FormControlHelperText>
										</FormControlHelper>
										<FormControlError>
											
											<FormControlErrorText>
												Passwords must match.
											</FormControlErrorText>
										</FormControlError>
									</FormControl>
								)}
							/>

							<Button isDisabled={isLoading} className="mt-4">
								<ButtonText>
									{isLoading ? "Sending..." : "Reset Password"}
								</ButtonText>
							</Button>
						</Box>

						<Link href="/login" className="text-blue-600 hover:text-blue-800">
						<LinkText>
							Back to Login
						</LinkText>
						</Link>
					
			</VStack>
		</Box>
	);
}
