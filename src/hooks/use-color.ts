import type { ModeType } from "@/components/ui/gluestack-ui-provider";
import { darkColors } from "@/configs/colors/dark";
import { lightColors } from "@/configs/colors/light";
import { useTheme } from "@/providers/theme.provider";
import { useMemo } from "react";

const config: Record<ModeType, Record<string, string>> = {
  light: lightColors,
  system: lightColors,
  dark: darkColors,
};

export const useColors = () => {
  const { theme } = useTheme();

  const colors = useMemo(() => {
    return config[theme];
  }, [theme]);

  return colors;
};
export const useColor = (color: string, variable = false) => {
  const { theme } = useTheme();

  const colors = useMemo(() => {
    return variable ? config[theme][color] : `rgb(${config[theme][color]})`;
  }, [theme, color, variable    ]);

  return colors;
};
