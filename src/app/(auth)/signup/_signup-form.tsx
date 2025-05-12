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
import { type SignupFormData, signupSchema } from "./_schema";

export default function   SignupForm() {
	const [isLoading, setIsLoading] = useState(false);
	const form = useForm<SignupFormData>({
		  resolver: zodResolver(signupSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);
	const [formData, setFormData] = useState<SignupFormData>({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});


	const handleSubmit = async (data: SignupFormData) => {
		
		setIsLoading(true);
		setError("");
		setSuccess(false);

		try {
			const { error } = await supabase.auth.signUp(
				{
					email: formData.email,
					password: formData.password,
					options: {
						data: {
							full_name: formData.name,
						},
					},
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
					Signup
				</Heading>
				
						<Text className="text-center">
							Enter your name, email address and password to signup.
						</Text>
						<Box className="space-y-4 w-full">
							<Controller
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormControl isRequired>
										<FormControlLabel>
											<FormControlLabelText>Name</FormControlLabelText>
										</FormControlLabel>
										<Input>
											<InputField
												placeholder="Enter your name"
												value={field.value}
												onChangeText={field.onChange}
											/>
										</Input>
										<FormControlHelper>
											<FormControlHelperText>
												Must be atleast 3 characters.
											</FormControlHelperText>
										</FormControlHelper>
										<FormControlError>
											
											<FormControlErrorText>
												Atleast 3 characters are required.
											</FormControlErrorText>
										</FormControlError>
									</FormControl>
								)}
							/>
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
												Must be a valid email address.
											</FormControlHelperText>
										</FormControlHelper>
										<FormControlError>
											
											<FormControlErrorText>
												Must be a valid email address.
											</FormControlErrorText>
										</FormControlError>
									</FormControl>
								)}
							/>
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
												Must be atleast 8 characters.
											</FormControlHelperText>
										</FormControlHelper>
										<FormControlError>
											
											<FormControlErrorText>
												Atleast 8 characters are required.
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
												placeholder="Enter your password"
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
									{isLoading ? "Signing up..." : "Signup"}
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
