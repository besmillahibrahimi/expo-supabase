import { supabase } from "@/configs/supabase";
import type { ResetPasswordFormData } from "@/lib/schema/reset-password.schema";
import type { ServiceResponse } from "@/types/service.types";
import type { User } from "@supabase/supabase-js";

export async function resetPassword(
  data: ResetPasswordFormData,
): Promise<ServiceResponse<User>> {
  const { password, confirmPassword } = data;

  if (password !== confirmPassword) {
    return {
      ok: false,
      error: new Error("Password and confirm password do not match"),
    };
  }
  
  const { data: user, error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    return {
      ok: false,
      error,
    };
  }

  return {
    ok: true,
    data: user.user,
  };
}
