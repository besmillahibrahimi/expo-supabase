import { supabase } from "@/configs/supabase";
import type {
  MagicLoginFormData,
  OtpFormData,
} from "@/lib/schema/magic-login.schema";

export async function sendMagicOtp( data: MagicLoginFormData) {
  const res = await supabase.auth.signInWithOtp({
    email: data.email,
    options: {
      shouldCreateUser: false,
    },
  });
  
  return res;
}

export async function verifyOtp(data: OtpFormData) {
  const res = await supabase.auth.verifyOtp({
    email: data.email,
    token: data.otp,
    type: "email",
  });
  return res;
}
