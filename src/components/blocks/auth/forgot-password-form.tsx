import { Button, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { Link, LinkText } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { forgotPassword } from "@/services/auth/forgot-password.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  type ForgotPasswordFormData,
  forgotPasswordSchema,
} from "../../../lib/schema/forgot-password.schema";
import { Box } from "../../ui/box";

export default function ForgotPasswordForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async () => {
    const res = await form.trigger();
    if (res) {
      startTransition(async () => {
        const res = await forgotPassword(form.getValues());
        if (res.ok) {
          form.reset();
        }
      });
    }
  };

  return (
    <Box className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
      <VStack space="md">
        <Heading size="xl" className="text-center">
          Forgot Password
        </Heading>

        <Text className="text-center">
          Enter your email address and we&apos;ll send you instructions to reset
          your password.
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

          <Button
            isDisabled={isPending}
            className="mt-4"
            onPress={handleSubmit}
          >
            <ButtonText>
              {isPending ? "Sending..." : "Send Reset Instructions"}
            </ButtonText>
          </Button>
        </Box>

        <Link href="/login" className="text-blue-600 hover:text-blue-800">
          <LinkText>Back to Login</LinkText>
        </Link>
      </VStack>
    </Box>
  );
}
