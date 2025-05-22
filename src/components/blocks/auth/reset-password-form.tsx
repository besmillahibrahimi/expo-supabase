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
import { supabase } from "@/configs/supabase";
import { useToast } from "@/hooks/use-toast";
import { resetPassword } from "@/services/auth/reset-password.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  type ResetPasswordFormData,
  resetPasswordSchema,
} from "../../../lib/schema/reset-password.schema";



export default function ResetPasswordForm({ token,  }: Readonly<{ token: string, }>) {
  
  const router = useRouter();
  const { t } = useTranslation(["auth"]);
  const [isPending, setIsPending] = useState(false);
  const toast = useToast();

  
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
      const data = form.getValues();
      if (data.password !== data.confirmPassword) {
        toast.show({
          title: t("error"),
          description: t("confirmPassword.notMatch"),
        });
        return;
      }
      setIsPending(true);
      const res = await resetPassword(data);
      
      if (res.ok) {
        toast.show({
          title: t("success"),
          description: t("resetPassword.success"),
        });
        router.push("/login");
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

  // biome-ignore lint/correctness/useExhaustiveDependencies: just look at the token changes
  useEffect(() => {
    (async () => {
      if ( (token)) {
        const {  error } = await supabase.auth.exchangeCodeForSession(token );
        
        if (error) {
          toast.show({
            title: t("error"),
            description: error.message,
          });
        } 
        
      }
    })();
  }, [token]);

  return (
    <Box className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
      <VStack space="md">
        <Heading size="xl" className="text-center">
          {t("resetPassword.label")}
        </Heading>

        <Text className="text-center">
          {t("resetPassword.description")}
        </Text>
        <VStack space="md" className="space-y-4 w-full">
          <Controller
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormControl isRequired isInvalid={!!form.formState.errors.password?.message} isDisabled={isPending}>
                <FormControlLabel>
                  <FormControlLabelText>{t("password.label")}</FormControlLabelText>
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
                    {t("confirmPassword.label")}
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
            <ButtonText className="">
              {isPending ? <ButtonSpinner /> : t("resetPassword.label")}
            </ButtonText>
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
}
