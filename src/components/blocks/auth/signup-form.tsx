import { Box } from "@/components/ui/box";
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
import { type SignupFormData, signupSchema } from "@/lib/schema/signup.schema";
import { signup } from "@/services/auth/signup.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useRouter } from "expo-router";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export default function SignupForm() {
  const router = useRouter();
  const { t } = useTranslation(["auth"]);

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async () => {
    const res = await form.trigger();
    if (res) {
      const data = form.getValues();
      if (data.password !== data.confirmPassword) {
        form.setError("confirmPassword", {
          message: t("confirmPassword.notMatch"),
        });
        return;
      }
      startTransition(async () => {
        const res = await signup(data);
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
          {t("signup")}
        </Heading>

        <VStack space="lg" className="w-full">
          <Controller
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormControl
                isRequired
                isInvalid={!!form.formState.errors.fullName}
                isDisabled={isPending}
              >
                <FormControlLabel>
                  <FormControlLabelText>{t("name.label")}</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    placeholder={t("name.placeholder")}
                    value={field.value}
                    onChangeText={field.onChange}
                  />
                </Input>
                <FormControlError>
                  <FormControlErrorText>
                    {form.formState.errors.fullName?.message &&
                      t(form.formState.errors.fullName?.message)}
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>
            )}
          />
          <Controller
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormControl
                isRequired
                isInvalid={!!form.formState.errors.email}
                isDisabled={isPending}
              >
                <FormControlLabel>
                  <FormControlLabelText>
                    {t("email.label")}
                  </FormControlLabelText>
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
                    {form.formState.errors.email?.message &&
                      t(form.formState.errors.email?.message)}
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>
            )}
          />
          <Controller
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormControl
                isRequired
                isInvalid={!!form.formState.errors.password}
                isDisabled={isPending}
              >
                <FormControlLabel>
                  <FormControlLabelText>
                    {t("password.label")}
                  </FormControlLabelText>
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
              <FormControl
                isRequired
                isInvalid={!!form.formState.errors.confirmPassword}
                isDisabled={isPending}
              >
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
            <ButtonText>
              {isPending ? <ButtonSpinner />: t("getStarted")}
            </ButtonText>
          </Button>
        </VStack>

        <Link href="/login" className="text-blue-600 hover:text-blue-800">
          {t("loginBack")}
        </Link>
      </VStack>
    </Box>
  );
}
