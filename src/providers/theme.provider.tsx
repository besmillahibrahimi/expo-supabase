import { GluestackUIProvider, type ModeType } from "@/components/ui/gluestack-ui-provider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";



interface ThemeContextType {
  theme: ModeType;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>({
  theme: "light",
  toggleTheme: () => {},
});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export default function ThemeProvider({
  children,
}: Readonly<React.PropsWithChildren>) {
  const [theme, setTheme] = useState<ModeType>("light");

  useEffect(() => {
    (async () => {
      const savedTheme = (await AsyncStorage.getItem("theme")) as
        | ModeType
        | "light";
      if (savedTheme) {
        setTheme(savedTheme);
        AsyncStorage.setItem("theme", savedTheme);
      }
    })();
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    AsyncStorage.setItem("theme", newTheme);
  }, [theme]);

  const value = useMemo(
    () => ({ theme, toggleTheme }),
    [theme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>
      <GluestackUIProvider mode={theme}>{children}</GluestackUIProvider>
    </ThemeContext.Provider>
  );
}
