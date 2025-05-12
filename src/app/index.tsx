import { View } from "react-native";
import ForgotPasswordForm from "./(auth)/forgot-password/_forgot-password-form";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ForgotPasswordForm />
    </View>
  );
}
