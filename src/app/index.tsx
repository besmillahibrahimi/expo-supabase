import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { useApp } from "@/providers/app.provider";


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
    </Box>
  );
}
