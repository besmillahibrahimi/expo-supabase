import type React from "react";
import { AppProvider } from "./app.provider";

export function Providers({ children }: Readonly<React.PropsWithChildren>) {
  return <AppProvider>{children}</AppProvider>;
}
