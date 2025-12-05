import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Platform } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { SvgXml } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { loadSvgFromAsset } from '@/utils/svgLoader';
import { Asset } from 'expo-asset';
import { Image } from 'expo-image';

const homeActiveSvg = require('@/assets/screen-asset/home-active.svg');
const homeInactiveSvg = require('@/assets/screen-asset/home-inactive.svg');
const quoteActiveSvg = require('@/assets/screen-asset/quote-active.svg');
const quoteInactiveSvg = require('@/assets/screen-asset/quote-button.svg');
const tripsActiveSvg = require('@/assets/screen-asset/trips-active.svg');
const tripsInactiveSvg = require('@/assets/screen-asset/trips-inactive.svg');
const invoiceButtonSvg = require('@/assets/screen-asset/invoice-button.svg');

const tabs = [
  { name: 'home', label: 'Home', activeSvg: homeActiveSvg, inactiveSvg: homeInactiveSvg },
  { name: 'quotes', label: 'Quotes', activeSvg: quoteActiveSvg, inactiveSvg: quoteInactiveSvg },
  { name: 'trips', label: 'Trips', activeSvg: tripsActiveSvg, inactiveSvg: tripsInactiveSvg },
  { name: 'invoice', label: 'Invoice', activeSvg: invoiceButtonSvg, inactiveSvg: invoiceButtonSvg },
];

export const BottomTabNavigator: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const [svgCache, setSvgCache] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadSvgs = async () => {
      const svgs: Record<string, string> = {};
      const allSvgs = [
        homeActiveSvg,
        homeInactiveSvg,
        quoteActiveSvg,
        quoteInactiveSvg,
        tripsActiveSvg,
        tripsInactiveSvg,
        invoiceButtonSvg,
      ];

      for (const svg of allSvgs) {
        if (Platform.OS === 'web') {
          continue;
        }
        const asset = Asset.fromModule(svg);
        await asset.downloadAsync();
        const svgContent = await loadSvgFromAsset(svg);
        if (svgContent) {
          svgs[asset.uri] = svgContent;
        }
      }

      setSvgCache(svgs);
    };

    loadSvgs();
  }, []);

  const fontFamilyRegular = Platform.select({
    ios: 'Figtree-Regular',
    android: 'Figtree-Regular',
    web: 'Figtree',
    default: 'Figtree',
  });

  const isActive = (tabName: string) => {
    if (tabName === 'home') {
      return pathname === '/home' || pathname === '/';
    }
    return pathname?.includes(`/${tabName}`);
  };

  const handleTabPress = (tabName: string) => {
    if (tabName === 'home') {
      router.push('/home');
    } else {
      router.push(`/${tabName}`);
    }
  };

  const renderIcon = (tab: typeof tabs[0], active: boolean) => {
    const svgSource = active ? tab.activeSvg : tab.inactiveSvg;
    
    if (Platform.OS === 'web') {
      return <Image source={svgSource} style={styles.tabIcon} contentFit="contain" />;
    }

    // For native, try to get from cache
    const asset = Asset.fromModule(svgSource);
    const cached = svgCache[asset.uri];
    if (cached) {
      return <SvgXml xml={cached} width={24} height={24} />;
    }

    return null;
  };

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      {tabs.map((tab) => {
        const active = isActive(tab.name);
        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            onPress={() => handleTabPress(tab.name)}
            activeOpacity={0.7}
          >
            {renderIcon(tab, active)}
            <Text
              style={[
                styles.tabLabel,
                { fontFamily: fontFamilyRegular },
                active && styles.tabLabelActive,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingTop: 8,
    paddingHorizontal: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    gap: 4,
  },
  tabLabel: {
    fontSize: 12,
    color: '#999999',
  },
  tabLabelActive: {
    color: '#C8202F',
    fontWeight: Platform.OS === 'web' ? '500' : 'normal',
  },
  tabIcon: {
    width: 24,
    height: 24,
  },
});

