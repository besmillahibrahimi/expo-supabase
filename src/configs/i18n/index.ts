import * as FileSystem from "expo-file-system";
import * as Localization from "expo-localization";
import i18n, { type Module, type NewableModule } from "i18next";
import { initReactI18next } from "react-i18next";

// Create a custom backend for Expo
const createExpoBackend = () => {
  return {
    type: "backend",
    init: () => {},
    read: async (
      language: string,
      namespace: string,
      callback: (error: Error | null, data: unknown) => void,
    ) => {
      try {
        // The path to the translation files in the project
        const filePath = `${FileSystem.documentDirectory}locales/${language}/${namespace}.json`;

        // First try to read from document directory (for downloaded translations)
        let content = null;
        const fileInfo = await FileSystem.getInfoAsync(filePath);

        if (fileInfo.exists) {
          content = await FileSystem.readAsStringAsync(filePath);
        } else {
          // If not found, use the bundled translations as fallback
          // This assumes you've bundled translations in your assets
          try {
            // For bundled assets, we need to use require
            // This is handled differently at runtime
            const moduleId = getModuleIdForTranslation(language, namespace);
            if (moduleId) {
              content = JSON.stringify(moduleId);
            }
          } catch (e) {
            console.error(`Error loading translation file: ${e}`);
          }
        }

        if (content) {
          callback(null, JSON.parse(content));
        } else {
          // If everything fails, return an empty object
          callback(null, {});
        }
      } catch (error) {
        console.error(`Error loading translation file: ${error}`);
        callback(error as Error, null);
      }
    },
  };
};

// Helper function to get bundled translations
// This is a workaround since we can't use dynamic imports in React Native
function getModuleIdForTranslation(language: string, namespace: string) {
  // Map of bundled translations
  // These will be included in the bundle
  const translations: Record<string, Record<string, string>> = {
    "en-common": require("../../assets/locales/en/common.json"),
    "en-auth": require("../../assets/locales/en/auth.json"),
    "fa-common": require("../../assets/locales/fa/common.json"),
    "fa-auth": require("../../assets/locales/fa/auth.json")
  };

  const key = `${language}-${namespace}`;
  const translation = translations[key];

  if (!translation) {
    console.log(`Translation not found for ${key}`);
    return {};
  }
  
  return translation;
}

// Initialize i18next
i18n
  .use(initReactI18next)
  .use(createExpoBackend() as unknown as NewableModule<Module>)
  .init({
    lng: Localization.getLocales()[0].languageCode ?? "en", // Use device language by default
    fallbackLng: "en",
    defaultNS: "common",
    ns: ["common"],

    interpolation: {
      escapeValue: false, // React already escapes by default
    },
    react: {
      useSuspense: false, // Set to false to avoid issues with Expo
    },
    // Don't load anything at init
    partialBundledLanguages: true,
    // Resources will be loaded on demand
    resources: {},
  });

// Function to download additional translations
export const downloadTranslation = async (
  language: string,
  namespace: string,
) => {
  try {
    // Here we'll simulate downloading by ensuring directory exists
    const dirPath = `${FileSystem.documentDirectory}locales/${language}/`;
    const dirInfo = await FileSystem.getInfoAsync(dirPath);

    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(dirPath, { intermediates: true });
    }

    // In a real app, you would write the fetched data
    // For this example, we'll copy from bundled assets
    const moduleId = getModuleIdForTranslation(language, namespace);
    if (moduleId) {
      const filePath = `${dirPath}${namespace}.json`;
      await FileSystem.writeAsStringAsync(filePath, JSON.stringify(moduleId));
      return true;
    }

    return false;
  } catch (error) {
    console.error(`Error downloading translation: ${error}`);
    return false;
  }
};

export default i18n;
