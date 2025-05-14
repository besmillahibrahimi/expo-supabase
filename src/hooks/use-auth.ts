"use client";


import { supabase } from "@/configs/supabase";
import type { Profile } from "@/types/models/profile";
import type { User } from "@supabase/supabase-js";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useReducer, useTransition } from "react";
export interface AuthState {
  authUser: User | null;
  user: Profile | null;
  error: string | null;
}

type AuthAction =
  | { type: "SET_USER"; payload: { authUser: User, user: Profile } }
  | { type: "SET_ERROR"; payload: string }
  | { type: "LOGOUT" };

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "SET_USER":
      return { authUser: action.payload.authUser, user: action.payload.user, error: null };
    case "SET_ERROR":
      return { authUser: null, user: null, error: action.payload };
    case "LOGOUT":
      return { authUser: null, user: null, error: null };
    default:
      return state;
  }
}

export function useAuth() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [state, dispatch] = useReducer(authReducer, {
    authUser: null,
    user: null,
    error: null,
  });

  const fetchCurrentUser = useCallback(async () => {
    startTransition(async () => {
      try {
        

        const authUser = await supabase.auth.getUser();

        if (!authUser.data.user) {
          router.push("/(auth)/login");
          return;
        }


        const user = await supabase.from("users").select("*").eq("id", authUser.data.user.id).single();

        dispatch({ type: "SET_USER", payload: { authUser: authUser.data.user, user: user.data } });
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload: error instanceof Error ? error.message : "An error occurred",
        });
      }
    });
  }, [router]);

  const logout = useCallback(async () => {
    startTransition(async () => {
      try {
        await supabase.auth.signOut();
        dispatch({ type: "LOGOUT" });
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload: error instanceof Error ? error.message : "Failed to logout",
        });
      }
    });
  }, []);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser,]);

  useEffect(() => {
    
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        fetchCurrentUser();
      } else if (event === "SIGNED_OUT") {
        dispatch({ type: "LOGOUT" });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchCurrentUser]);

  return {
    authUser: state.authUser,
    user: state.user,
    isLoading: isPending,
    error: state.error,
    logout,
    refetchUser: fetchCurrentUser,
  };
}