import { Env } from "@/configs/env";
import { supabase } from "@/configs/supabase";
import { useToast } from "@/hooks/use-toast";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";

export const GoogleSignIn = () => {
  const toast = useToast();

  GoogleSignin.configure({
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    webClientId: Env.google.webClientId,
    iosClientId: Env.google.iosClientId,
    offlineAccess: true,
    forceCodeForRefreshToken: true,
  });

  return (
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          if (userInfo.data?.idToken) {
            const { data, error } = await supabase.auth.signInWithIdToken({
              provider: "google",
              token: userInfo.data.idToken,
            });
            console.log(error, data);
          } else {
            throw new Error("no ID token present!");
          }
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        } catch (error: any) {
          console.log("error", error);
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
            toast.show({
              title: "Login cancelled",
              description: "Please try again",
            });
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
            toast.show({
              title: "Login in progress",
              description: "Please try again",
            });
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {  
            // play services not available or outdated
            toast.show({
              title: "Play services not available",
              description: "Please try again",
            });
          } else {
            // some other error happened
            toast.show({
              title: "Login error",
              description: "Please try again",
            });
          }
        }
      }}
    />
  );
};
