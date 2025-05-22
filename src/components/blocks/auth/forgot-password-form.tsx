import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { useToast } from "@/hooks/use-toast";
import { forgotPassword } from "@/services/auth/forgot-password.service";
import { zodResolver } from "@hookform/resolvers/zod";
import * as IntentLauncher from 'expo-intent-launcher';
import { Link } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Platform } from "react-native";
import {
  type ForgotPasswordFormData,
  forgotPasswordSchema,
} from "../../../lib/schema/forgot-password.schema";
import { Box } from "../../ui/box";
import { Text } from "../../ui/text";


export default function ForgotPasswordForm() {
  const { t } = useTranslation(["auth"]);
  const [isPending, setIsPending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  
  const toast = useToast();

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async () => {
    const res = await form.trigger();
    if (res) {
      setIsPending(true);
      const res = await forgotPassword(form.getValues());
      if (res.ok) {
        form.reset();
        toast.show({
          title: t("success"),
          description: t("forgotPassword.success"),
        });
      }

      if (!res.ok) {
        toast.show({
          title: t("error"),
          description: res.error.message,
        });
      }

      setIsPending(false);
    }
  };

  const openEmailApp = async () => {
    if (Platform.OS === 'android') {
      await IntentLauncher.startActivityAsync(
        'android.intent.action.MAIN',
        { category: 'android.intent.category.APP_EMAIL' }
      );
    }
  };

  return (
    <Box className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
      <VStack space="md">
        <Heading size="xl" className="text-center">
          {t("forgotPassword.label")}
        </Heading>

        {isSent ?
        <VStack space="md" className="space-y-4 w-full">
          <Text className="text-center">
            {t("forgotPassword.success")}
          </Text>
          <Button onPress={openEmailApp}>
            <ButtonText>
              {t("openEmailApp")}
            </ButtonText>
          </Button>
        </VStack>
        : <VStack space="md" className="space-y-4 w-full">
          <Controller
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormControl
                isRequired
                isInvalid={!!form.formState.errors.email?.message}
                isDisabled={isPending}
              >
                <FormControlLabel>
                  <FormControlLabelText>
                    {t("email.label")}
                  </FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    accessibilityLabel={t("email.label")}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    placeholder={t("email.placeholder")}
                    value={field.value}
                    onChangeText={field.onChange}
                  />
                </Input>
                <FormControlError>
                  <FormControlErrorText>
                    {form.formState.errors.email?.message &&
                      t(form.formState.errors.email?.message)}
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
        </VStack>}

        <Link href="/login" className="text-blue-600 hover:text-blue-800">
          {t("loginBack")}
        </Link>
      </VStack>
    </Box>
  );
}
