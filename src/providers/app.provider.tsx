"use client";

import { type ReactNode, createContext, useContext, useMemo, useState } from "react";

import { type AuthState, useAuth } from "@/hooks/use-auth";

interface AppContextType {
  auth: AuthState & {
    isLoading: boolean;
    logout: () => Promise<void>;
    refetchUser: () => Promise<void>;
  };
  isBusy: boolean;
  setIsBusy: (isBusy: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: Readonly<AppProviderProps>) {
  const [isBusy, setIsBusy] = useState(false);

  const auth = useAuth();

  const value = useMemo(
    () => ({
      auth,
      isBusy,
      setIsBusy,
    }),
    [auth, isBusy]
  );

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}