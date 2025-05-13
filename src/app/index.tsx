import { View } from "react-native";

import SignupForm from "@/components/blocks/auth/signup-form";
export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SignupForm />
    </View>
  );
}
