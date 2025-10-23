// Secure Storage Utility with encryption-like obfuscation

const STORAGE_PREFIX = 'bliss_';
const ENCODE_KEY = 'BlissHairStudio2025';

class SecureStorage {
  private encode(data: string): string {
    // Simple XOR encryption for basic obfuscation
    let encoded = '';
    for (let i = 0; i < data.length; i++) {
      encoded += String.fromCharCode(
        data.charCodeAt(i) ^ ENCODE_KEY.charCodeAt(i % ENCODE_KEY.length)
      );
    }
    return btoa(encoded);
  }

  private decode(data: string): string {
    try {
      const decoded = atob(data);
      let original = '';
      for (let i = 0; i < decoded.length; i++) {
        original += String.fromCharCode(
          decoded.charCodeAt(i) ^ ENCODE_KEY.charCodeAt(i % ENCODE_KEY.length)
        );
      }
      return original;
    } catch {
      return '';
    }
  }

  set<T>(key: string, value: T, secure: boolean = false): void {
    const fullKey = STORAGE_PREFIX + key;
    const jsonString = JSON.stringify(value);
    const finalValue = secure ? this.encode(jsonString) : jsonString;
    localStorage.setItem(fullKey, finalValue);
  }

  get<T>(key: string, secure: boolean = false): T | null {
    const fullKey = STORAGE_PREFIX + key;
    const stored = localStorage.getItem(fullKey);
    
    if (!stored) return null;
    
    try {
      const jsonString = secure ? this.decode(stored) : stored;
      return JSON.parse(jsonString) as T;
    } catch {
      return null;
    }
  }

  remove(key: string): void {
    const fullKey = STORAGE_PREFIX + key;
    localStorage.removeItem(fullKey);
  }

  clear(): void {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(STORAGE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  }
}

export const storage = new SecureStorage();
