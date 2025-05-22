import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { useToast } from "@/hooks/use-toast";
import {
  type MagicLoginFormData,
  magicLoginSchema,
} from "@/lib/schema/magic-login.schema";
import { sendMagicOtp } from "@/services/auth/send-magic-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export default function MagicLogin() {
  const router = useRouter();
  const { t } = useTranslation(["auth"]);
  const [isPending, setIsPending] = useState(false);
  const toast = useToast();

  const form = useForm<MagicLoginFormData>({
    resolver: zodResolver(magicLoginSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async () => {
    const res = await form.trigger();
    if (res) {
      const data = form.getValues();

      setIsPending(true);
      const res = await sendMagicOtp(data);
      if (res.error) {
        toast.show({
          title: t("error"),
          description: res.error.message,
        });
        setIsPending(false);
        return;
      }
      console.log("res", res);
      setIsPending(false);
      router.push({
        pathname: "/verify-otp/[email]",
        params: { email: data.email }
      });
    }
  };

  return (
    <VStack className="w-full">
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
              <FormControlErrorText className="text-red-500">
                {form.formState.errors.email?.message &&
                  t(form.formState.errors.email?.message)}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
        )}
      />

      <Link href="/forgot-password">{t("forgotPassword")}</Link>

      <Button
        variant="solid"
        action="primary"
        isDisabled={isPending}
        className="mt-4"
        onPress={handleSubmit}
      >
        <ButtonText>{isPending ? <ButtonSpinner /> : t("login")}</ButtonText>
      </Button>
    </VStack>
  );
}
