import { Text } from "@/components/ui/text";
import "@/configs/i18n";
import { DefaultLocale, type Locale, Locales } from "@/configs/i18n/constants";
import { Providers } from "@/providers/providers";
import "@/styles/global.css";
import { useFonts } from "expo-font";
import * as Localization from "expo-localization";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "react-native-reanimated";
import "react-native-stream";
import "react-native-url-polyfill";

export default function RootLayout() {
  const { i18n } = useTranslation();
  const [isI18nInitialized, setIsI18nInitialized] = useState(false);

  // Initialize i18n with device locale
  useEffect(() => {
    const initializeI18n = async () => {
      try {
        // Get device locale

        const deviceLocale = (Localization.getLocales()[0].languageCode ??
          DefaultLocale) as Locale;

        // Set language based on device locale (fallback to English if not supported)
        const language = Locales.includes(deviceLocale) ? deviceLocale : "en";

        // Change language
        await i18n.changeLanguage(language);

        // Mark as initialized
        setIsI18nInitialized(true);
      } catch (error) {
        console.error("Failed to initialize i18n:", error);
        // Fall back to English in case of error
        await i18n.changeLanguage("en");
        setIsI18nInitialized(true);
      }
    };

    initializeI18n();
  }, [i18n]);

  const [loaded] = useFonts({
    "Vazirmatn-Thin": require("../assets/fonts/Vazirmatn-Thin.ttf"),
    "Vazirmatn-ExtraLight": require("../assets/fonts/Vazirmatn-ExtraLight.ttf"),
    "Vazirmatn-Light": require("../assets/fonts/Vazirmatn-Light.ttf"),
    "Vazirmatn-Regular": require("../assets/fonts/Vazirmatn-Regular.ttf"),
    "Vazirmatn-Medium": require("../assets/fonts/Vazirmatn-Medium.ttf"),
    "Vazirmatn-SemiBold": require("../assets/fonts/Vazirmatn-SemiBold.ttf"),
    "Vazirmatn-Bold": require("../assets/fonts/Vazirmatn-Bold.ttf"),
    "Vazirmatn-ExtraBold": require("../assets/fonts/Vazirmatn-ExtraBold.ttf"),
    "Vazirmatn-Black": require("../assets/fonts/Vazirmatn-Black.ttf"),
  });

  if (!isI18nInitialized || !loaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <Providers>
      <Stack/>
    </Providers>
  );
}
