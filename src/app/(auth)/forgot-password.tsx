import { Box } from "@/components/ui/box";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ForgotPasswordForm from "../../components/blocks/auth/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <SafeAreaView edges={["bottom", 'top']}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Box className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <ForgotPasswordForm />
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
