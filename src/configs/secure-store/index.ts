
import * as SecureStore from 'expo-secure-store';

export class ExpoSecureStoreAdapter  {
  async getItem(key: string) {
    return SecureStore.getItemAsync(key);
  }

  async setItem(key: string, value: string) {
    await SecureStore.setItemAsync(key, value, {
      keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK,
    });
  }

  async removeItem(key: string) {
    await SecureStore.deleteItemAsync(key);
  }
}
