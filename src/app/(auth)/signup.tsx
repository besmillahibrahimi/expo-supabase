import { Box } from "@/components/ui/box";
import SignupForm from "../../components/blocks/auth/signup-form";

export default function SignupPage() {
  return (
    <Box className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <SignupForm />
    </Box>
  );
}
