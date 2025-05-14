import LoginForm from "@/components/blocks/auth/login-form";
import { Text } from "@/components/ui/text";
import { useApp } from "@/providers/app.provider";
import { View } from "react-native";


export default function Index() {
  const {auth} = useApp();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{auth.authUser?.email}</Text>
      <LoginForm/>
    </View>
  );
}
