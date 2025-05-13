import { supabase } from "@/configs/supabase";
import type { ForgotPasswordFormData } from "@/lib/schema/forgot-password.schema";
import type { ServiceResponse } from "@/types/service.types";

export async function forgotPassword(
  data: ForgotPasswordFormData,
): Promise<ServiceResponse<unknown>> {
  const { email } = data;

  const { data: user, error } =
    await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    return {
      ok: false,
      error,
    };
  }

  return {
    ok: true,
    data: user,
  };
}
