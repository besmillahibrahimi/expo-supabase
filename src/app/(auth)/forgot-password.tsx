import { Box } from "@/components/ui/box";
import ForgotPasswordForm from "../../components/blocks/auth/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <Box className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <ForgotPasswordForm />
    </Box>
  );
}
