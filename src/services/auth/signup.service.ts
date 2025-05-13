import { supabase } from "@/configs/supabase";
import type { SignupFormData } from "@/lib/schema/signup.schema";
import type { ServiceResponse } from "@/types/service.types";
import type { User } from "@supabase/supabase-js";

export async function signup(
  data: SignupFormData,
): Promise<ServiceResponse<User>> {
  console.log("signup", data);
  const { email, password, confirmPassword, ...rest } = data;
  if (password !== confirmPassword) {
    return {
      ok: false,
      error: new Error("Passwords do not match"),
    };
  }
  const { data: user, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: rest.fullName },
    },
  });
  console.log("res", error, user);

  if (error) {
    return {
      ok: false,
      error,
    };
  }

  return {
    ok: true,
    data: user.user as User,
  };
}
