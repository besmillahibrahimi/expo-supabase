import { supabase } from "@/configs/supabase";
import type { ForgotPasswordFormData } from "@/lib/schema/forgot-password.schema";
import type { ServiceResponse } from "@/types/service.types";
import * as Linking from "expo-linking";

export async function forgotPassword(
  data: ForgotPasswordFormData,
): Promise<ServiceResponse<unknown>> {
  const { email } = data;

  const { data: user, error } =
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: Linking.createURL("/reset-password"),
    });

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
