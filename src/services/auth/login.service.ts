import { supabase } from "@/configs/supabase";
import type { LoginFormData } from "@/lib/schema/login.schema";
import type { ServiceResponse } from "@/types/service.types";
import type { User } from "@supabase/supabase-js";

export async function login(
  data: LoginFormData,
): Promise<ServiceResponse<User>> {
  const { email, password } = data;

  const { data: user, error } = await supabase.auth.signInWithPassword({
    email,
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
