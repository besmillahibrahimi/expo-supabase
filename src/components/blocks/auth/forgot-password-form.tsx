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
import { Link, LinkText } from "@/components/ui/link";
import { VStack } from "@/components/ui/vstack";
import { forgotPassword } from "@/services/auth/forgot-password.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  type ForgotPasswordFormData,
  forgotPasswordSchema,
} from "../../../lib/schema/forgot-password.schema";
import { Box } from "../../ui/box";

export default function ForgotPasswordForm() {
  const { t } = useTranslation(['auth']);
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
          {t("forgotPassword")}
        </Heading>

        <Box className="space-y-4 w-full">
          <Controller
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormControl isRequired isInvalid={!!form.formState.errors.email?.message} isDisabled={isPending}>
                <FormControlLabel>
                  <FormControlLabelText>{t("email.label")}</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    placeholder={t("email.placeholder")}
                    value={field.value}
                    onChangeText={field.onChange}
                  />
                </Input>
                <FormControlError>
                  <FormControlErrorText>
                    {form.formState.errors.email?.message && t(form.formState.errors.email?.message)}
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
              {isPending ? <ButtonSpinner /> : t("sendResetInstructions")}
            </ButtonText>
          </Button>
        </Box>

        <Link href="/login" className="text-blue-600 hover:text-blue-800">
          <LinkText>{t("loginBack")}</LinkText>
        </Link>
      </VStack>
    </Box>
  );
}
