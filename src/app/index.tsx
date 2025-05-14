import SignupForm from "@/components/blocks/auth/signup-form";
import { View } from "react-native";


export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SignupForm/>
    </View>
  );
}
