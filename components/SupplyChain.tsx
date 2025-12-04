import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, Platform, DimensionValue } from 'react-native';
import { Image } from 'expo-image';
import { Asset } from 'expo-asset';

const sources = {
  onboarding: require('@/assets/images/supply-chain-onboard.jpg'),
  hero: require('@/assets/images/supply-chain.jpg'),
} as const;

type SupplyChainVariant = keyof typeof sources;

interface SupplyChainProps {
  width?: DimensionValue;
  height?: DimensionValue;
  variant?: SupplyChainVariant;
}

export const SupplyChain = ({
  width = '100%',
  height = 350,
  variant = 'onboarding',
}: SupplyChainProps) => {
  const [webUri, setWebUri] = useState<string | null>(null);
  const source = useMemo(() => sources[variant], [variant]);

  useEffect(() => {
    if (Platform.OS !== 'web') {
      return;
    }

    let mounted = true;

    const load = async () => {
      const asset = Asset.fromModule(source);
      await asset.downloadAsync();
      if (mounted) {
        setWebUri(asset.localUri || asset.uri || null);
      }
    };

    load().catch(() => mounted && setWebUri(null));

    return () => {
      mounted = false;
    };
  }, [source]);

  if (Platform.OS === 'web') {
    if (!webUri) {
      return <View style={[styles.container, { width, height }]} />;
    }

    return (
      <View style={[styles.container, { width, height }]}>
        <Image source={{ uri: webUri }} style={StyleSheet.absoluteFill} contentFit="cover" />
      </View>
    );
  }

  return (
    <View style={[styles.container, { width, height }]}>
      <Image 
        source={source} 
        style={StyleSheet.absoluteFill} 
        contentFit="cover"
        onError={(error) => {
          console.error('SupplyChain image load error:', error);
        }}
        onLoadStart={() => {
          console.log('SupplyChain: Image loading started');
        }}
        onLoad={() => {
          console.log('SupplyChain: Image loaded successfully');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: '#E6F3FE',
  },
});

