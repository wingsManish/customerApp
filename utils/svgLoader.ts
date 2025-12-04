import { Asset } from 'expo-asset';
import { Platform } from 'react-native';

// Import legacy API - this import path should suppress warnings
// eslint-disable-next-line @typescript-eslint/no-var-requires
const FileSystem = require('expo-file-system/legacy');

/**
 * Loads SVG content from an asset module
 * Uses legacy API - the /legacy import suppresses deprecation warnings
 */
export async function loadSvgFromAsset(assetModule: any): Promise<string | null> {
  if (Platform.OS === 'web') {
    return null;
  }

  try {
    const asset = Asset.fromModule(assetModule);
    await asset.downloadAsync();
    
    const uri = asset.localUri || asset.uri;
    if (!uri) {
      console.warn('No URI found for SVG asset');
      return null;
    }

    // Use legacy FileSystem API
    // The /legacy import should suppress deprecation warnings
    const svg = await FileSystem.readAsStringAsync(uri);
    
    if (svg && svg.trim().length > 0) {
      return svg;
    }
    
    console.warn('SVG content is empty for URI:', uri);
    return null;
  } catch (error: any) {
    // Only log non-deprecation errors
    if (error?.message && !error.message.includes('deprecated')) {
      console.warn('Error loading SVG:', error.message);
    }
    return null;
  }
}

