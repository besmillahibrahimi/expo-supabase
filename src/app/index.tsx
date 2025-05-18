import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";

import { Text } from "@/components/ui/text";
import { useApp } from "@/providers/app.provider";
import { Link } from "expo-router";


export default function Index() {
  const {auth} = useApp();
  return (
    <Box>
      <Text>Email: {auth.authUser?.email}</Text>
      <Text>Email: {auth.authUser?.email}</Text>
      <Text>Email: {auth.authUser?.email}</Text>
      <Text>Email: {auth.authUser?.email}</Text>
      <Text>Email: {auth.authUser?.email}</Text>
      <Text>Email: {auth.authUser?.email}</Text>
      <Text>Email: {auth.authUser?.email}</Text>
      <Text>Email: {auth.authUser?.email}</Text>
      <Text>Email: {auth.authUser?.email}</Text>
      <Text>Email: {auth.authUser?.email}</Text>
      {/* <LoginForm/> */}
      <Button onPress={() => auth.logout()}>
        <ButtonText>Logout</ButtonText>
      </Button>
      <Link href={"/(auth)/login"}>
        Login
      </Link>
      <Link href={"/(auth)/signup"}>
        signup
      </Link>
    </Box>
  );
}
