import { Box } from "@/components/ui/box";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginForm from "../../components/blocks/auth/login-form";

export default function LoginPage() {
  return (
    <SafeAreaView edges={["bottom"]}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Box className="min-h-screen-safe flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <LoginForm />
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
