import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Image } from 'expo-image';
import { loadSvgFromAsset } from '@/utils/svgLoader';

const viewAllSvg = require('@/assets/screen-asset/view-all.svg');

interface SectionHeaderProps {
  title: string;
  showViewAll?: boolean;
  onViewAllPress?: () => void;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  showViewAll,
  onViewAllPress,
}) => {
  const [viewAllXml, setViewAllXml] = useState<string>('');

  useEffect(() => {
    const loadSvg = async () => {
      if (Platform.OS === 'web') {
        return;
      }
      const svg = await loadSvgFromAsset(viewAllSvg);
      if (svg) {
        setViewAllXml(svg);
      }
    };

    loadSvg();
  }, []);

  const fontFamilySemiBold = Platform.select({
    ios: 'Figtree-SemiBold',
    android: 'Figtree-SemiBold',
    web: 'Figtree',
    default: 'Figtree',
  });

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontFamily: fontFamilySemiBold }]}>{title}</Text>
      {showViewAll && (
        <TouchableOpacity onPress={onViewAllPress} activeOpacity={0.7}>
          <View style={styles.viewAllContainer}>
            {Platform.OS === 'web' ? (
              <Image source={viewAllSvg} style={styles.viewAllIcon} contentFit="contain" />
            ) : (
              viewAllXml ? <SvgXml xml={viewAllXml} width={30} height={30} /> : null
            )}
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: Platform.OS === 'web' ? '600' : 'normal',
    color: '#000000',
  },
  viewAllContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewAllIcon: {
    width: 30,
    height: 30,
  },
});

