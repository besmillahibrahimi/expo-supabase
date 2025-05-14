import { Box } from "@/components/ui/box";
import ResetPasswordForm from "../../components/blocks/auth/reset-password-form";

export default function ResetPasswordPage() {
  return (
    <Box className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <ResetPasswordForm />
    </Box>
  );
}
