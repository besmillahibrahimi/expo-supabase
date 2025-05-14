import { Box } from "@/components/ui/box";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText
} from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { resetPassword } from "@/services/auth/reset-password.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  type ResetPasswordFormData,
  resetPasswordSchema,
} from "../../../lib/schema/reset-password.schema";

export default function ResetPasswordForm() {
  const router = useRouter();
  const { t } = useTranslation(["auth"]);
  const [isPending, startTransition] = useTransition();
  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async () => {
    const res = await form.trigger();
    if (res) {
      startTransition(async () => {
        const res = await resetPassword(form.getValues());
        if (res.ok) {
          router.push("/login");
        }
      });
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
              <FormControl isRequired isInvalid={!!form.formState.errors.password?.message} isDisabled={isPending}>
                <FormControlLabel>
                  <FormControlLabelText>{t("password")}</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField type="password"
                    placeholder={t("password.placeholder")}
                    value={field.value}
                    onChangeText={field.onChange}
                  />
                </Input>
               
                <FormControlError>
                  <FormControlErrorText>
                    {form.formState.errors.password?.message &&
                      t(form.formState.errors.password?.message)}
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>
            )}
          />
          <Controller
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormControl isRequired isInvalid={!!form.formState.errors.confirmPassword?.message} isDisabled={isPending}>
                <FormControlLabel>
                  <FormControlLabelText>
                    {t("confirmPassword")}
                  </FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField type="password"
                    placeholder={t("confirmPassword.placeholder")}
                    value={field.value}
                    onChangeText={field.onChange}
                  />
                </Input>
                <FormControlError>
                  <FormControlErrorText>
                    {form.formState.errors.confirmPassword?.message &&
                      t(form.formState.errors.confirmPassword?.message)}
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
              {isPending ? <ButtonSpinner /> : t("resetPassword")}
            </ButtonText>
          </Button>
        </Box>
      </VStack>
    </Box>
  );
}
