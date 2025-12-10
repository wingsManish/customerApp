import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { loadSvgFromAsset } from '@/utils/svgLoader';

const activeTripsSvg = require('@/assets/screen-asset/active-trips.svg');
const tripsPendingSvg = require('@/assets/screen-asset/Trips-Pending.svg');
const requestedQuoteSvg = require('@/assets/screen-asset/requested-quote.svg');
const pendingQuoteSvg = require('@/assets/screen-asset/pending-quote.svg');

interface OverviewCardProps {
  value: number | string;
  label: string;
  icon: string;
}

export const OverviewCard: React.FC<OverviewCardProps> = ({ value, label, icon }) => {
  const [iconXml, setIconXml] = useState<string>('');

  useEffect(() => {
    const loadSvg = async () => {
      let svgSource;
      switch (icon) {
        case 'car':
          svgSource = activeTripsSvg;
          break;
        case 'time':
          svgSource = tripsPendingSvg;
          break;
        case 'document-text':
          svgSource = requestedQuoteSvg;
          break;
        case 'hourglass':
          svgSource = pendingQuoteSvg;
          break;
        default:
          return;
      }

      if (Platform.OS === 'web') {
        return;
      }
      const svg = await loadSvgFromAsset(svgSource);
      if (svg) {
        setIconXml(svg);
      }
    };

    loadSvg();
  }, [icon]);

  const fontFamilySemiBold = Platform.select({
    ios: 'Figtree-SemiBold',
    android: 'Figtree-SemiBold',
    web: 'Figtree',
    default: 'Figtree',
  });

  const fontFamilyMedium = Platform.select({
    ios: 'Figtree-Medium',
    android: 'Figtree-Medium',
    web: 'Figtree',
    default: 'Figtree',
  });

  const getSvgSource = () => {
    switch (icon) {
      case 'car':
        return activeTripsSvg;
      case 'time':
        return tripsPendingSvg;
      case 'document-text':
        return requestedQuoteSvg;
      case 'hourglass':
        return pendingQuoteSvg;
      default:
        return null;
    }
  };

  const svgSource = getSvgSource();

  return (
    <View style={styles.card}>
      <Text style={[styles.value, { fontFamily: fontFamilySemiBold }]}>{value}</Text>
      <Text style={[styles.label, { fontFamily: fontFamilyMedium }]}>{label}</Text>
      <View style={styles.iconContainer}>
        {svgSource ? (
          Platform.OS === 'web' ? (
            <Image source={svgSource} style={styles.iconSvg} contentFit="contain" />
          ) : (
            iconXml ? <SvgXml xml={iconXml} width={45} height={47} /> : null
          )
        ) : (
          <Ionicons name="document-text-outline" size={48} color="#FFE5E5" />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%', // 2 columns with gap
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 12,
    padding: 16,
    minHeight: 100,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    position: 'relative',
    overflow: 'hidden',
  },
  value: {
    fontSize: 32,
    fontWeight: Platform.OS === 'web' ? '600' : 'normal',
    color: '#C8202F',
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  iconContainer: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    opacity: 0.9,
  },
  iconSvg: {
    width: 45,
    height: 47,
  },
});

