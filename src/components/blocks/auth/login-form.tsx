import { GoogleSignIn } from "@/components/google-sign-in";
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
import { Toast, ToastDescription, useToast } from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import { login } from "@/services/auth/login.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  type LoginFormData,
  loginSchema,
} from "../../../lib/schema/login.schema";
import { Box } from "../../ui/box";
export default function LoginForm() {
  const toast = useToast();
  const router = useRouter();
  const { t } = useTranslation(["auth"]);

  const [isPending, startTransition] = useTransition();
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async () => {
    const res = await form.trigger();
    console.log("form res", res);
    if (res) {
      const data = form.getValues();
      startTransition(async () => {
        const res = await login(data);
        console.log("login res", res);
        if (!res.ok) {
          const newId = Math.random();
          toast.show({
            id: newId.toString(),
            placement: "bottom",
            duration: 3000,
            render: () => (
              <SafeAreaView>
                <Toast>
                  <ToastDescription>{res.error.message}</ToastDescription>
                </Toast>
              </SafeAreaView>
            ),
          });
        }
        if (res.ok) {
          router.push("/");
        }
      });
    }
  };

  return (
    <Box className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
      <VStack space="md">
        <Heading size="xl" className="text-center">
          {t("login")}
        </Heading>

        <VStack space="md" className="w-full">
          <GoogleSignIn />
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
                  <FormControlLabelText>Email</FormControlLabelText>
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
          <Controller
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormControl
                isRequired
                isInvalid={!!form.formState.errors.password?.message}
                isDisabled={isPending}
              >
                <FormControlLabel>
                  <FormControlLabelText>Password</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    type="password"
                    placeholder={t("password.placeholder")}
                    value={field.value}
                    onChangeText={field.onChange}
                  />
                </Input>

                <FormControlError>
                  <FormControlErrorText className="text-red-500">
                    {form.formState.errors.password?.message &&
                      t(form.formState.errors.password?.message)}
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
            <ButtonText>
              {isPending ? <ButtonSpinner /> : t("login")}
            </ButtonText>
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
}
