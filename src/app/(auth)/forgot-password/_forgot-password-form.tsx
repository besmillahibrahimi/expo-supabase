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
import { type ForgotPasswordFormData, forgotPasswordSchema } from "./_scheam";

export default function ForgotPasswordForm() {
	const [isLoading, setIsLoading] = useState(false);
	const form = useForm<ForgotPasswordFormData>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			email: "",
		},
	});
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);
	const [formData, setFormData] = useState<ForgotPasswordFormData>({
		email: "",
	});


	const handleSubmit = async (data: ForgotPasswordFormData) => {
		
		setIsLoading(true);
		setError("");
		setSuccess(false);

		try {
			const { error } = await supabase.auth.resetPasswordForEmail(
				formData.email,
				{
					redirectTo: `${window.location.origin}/reset-password`,
				},
			);

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
					Forgot Password
				</Heading>
				{success ? (
					<VStack space="md" className="text-center">
						<Text>
							Password reset instructions have been sent to your email address.
						</Text>
						<Link href="/login" className="text-blue-600 hover:text-blue-800">
						<LinkText>
							Back to Login
						</LinkText>
						</Link>
					</VStack>
				) : (
					<>
						<Text className="text-center">
							Enter your email address and we&apos;ll send you instructions to
							reset your password.
						</Text>
						<Box className="space-y-4 w-full">
							<Controller
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormControl isRequired>
										<FormControlLabel>
											<FormControlLabelText>Email</FormControlLabelText>
										</FormControlLabel>
										<Input>
											<InputField
												placeholder="Enter your email"
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

							<Button isDisabled={isLoading} className="mt-4">
								<ButtonText>
									{isLoading ? "Sending..." : "Send Reset Instructions"}
								</ButtonText>
							</Button>
						</Box>

						<Link href="/login" className="text-blue-600 hover:text-blue-800">
						<LinkText>
							Back to Login
						</LinkText>
						</Link>
					</>
				)}
			</VStack>
		</Box>
	);
}
