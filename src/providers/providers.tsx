import type React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppProvider } from "./app.provider";
import ThemeProvider from "./theme.provider";

export function Providers({ children }: Readonly<React.PropsWithChildren>) {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppProvider>{children}</AppProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
