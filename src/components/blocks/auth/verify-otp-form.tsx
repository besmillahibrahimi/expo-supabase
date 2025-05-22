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
import { type OtpFormData, otpSchema } from "@/lib/schema/magic-login.schema";
import { verifyOtp } from "@/services/auth/send-magic-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export default function VerifyOtp({ email }: Readonly<{ email: string }>) {
  const { t } = useTranslation(["auth"]);
  const [isPending, setIsPending] = useState(false);
  const toast = useToast();

  const form = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      email: email,
      otp: "",
    },
  });

  const handleSubmit = async () => {
    const res = await form.trigger();
    if (res) {
      const data = form.getValues();
      
        setIsPending(true);
        const res = await verifyOtp(data);
        if (res.error) {
          toast.show({
            title: t("error"),
            description: res.error.message,
          });
        }
        console.log("res", res);
        setIsPending(false);
      
    }
  };

  return (
    <VStack className="w-full">
      <Controller
        control={form.control}
        name="otp"
        render={({ field }) => (
          <FormControl
            isRequired
            isInvalid={!!form.formState.errors.otp?.message}
            isDisabled={isPending}
          >
            <FormControlLabel>
              <FormControlLabelText>{t("otp.label")}</FormControlLabelText>
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
                {form.formState.errors.otp?.message &&
                  t(form.formState.errors.otp?.message)}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
        )}
      />

      <Button
        variant="solid"
        action="primary"
        isDisabled={isPending}
        className="mt-4"
        onPress={handleSubmit}
      >
        <ButtonText>{isPending ? <ButtonSpinner /> : t("verify")}</ButtonText>
      </Button>
    </VStack>
  );
}
