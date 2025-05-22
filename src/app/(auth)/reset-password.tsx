import ResetPasswordForm from "@/components/blocks/auth/reset-password-form";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Link, useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ResetPasswordPage() {
  const { t } = useTranslation('auth');
  const params = useLocalSearchParams();
  console.log("params", params);

  return (
    <SafeAreaView edges={["bottom", "top"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Box className="min-h-screen w-full flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            {params.error ? (
              <VStack space="md">
                <Text>
                  {params.error}
                </Text>
                <Text>
                  {params.error_description}
                </Text>

                <Link href="/login">
                  <Text>
                    {t("loginBack")}
                  </Text>
                </Link>
              </VStack>
            ) : (
              <ResetPasswordForm
                token={params.code as string}
                
              />
            )}
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
