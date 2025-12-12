import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type SuitOption = 'individuals' | 'openForum';

export default function AddQuoteSuitScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<SuitOption>('openForum');

  const fontSemi = Platform.select({
    ios: 'Figtree-SemiBold',
    android: 'Figtree-SemiBold',
    web: 'Figtree',
    default: 'Figtree',
  });
  const fontRegular = Platform.select({
    ios: 'Figtree-Regular',
    android: 'Figtree-Regular',
    web: 'Figtree',
    default: 'Figtree',
  });

  const renderCard = (key: SuitOption, label: string, icon: string) => {
    const isActive = selected === key;
    return (
      <TouchableOpacity
        key={key}
        activeOpacity={0.9}
        style={[
          styles.optionCard,
          isActive ? styles.optionCardActive : styles.optionCardInactive,
        ]}
        onPress={() => setSelected(key)}
      >
        <Ionicons
          name={icon as any}
          size={28}
          color={isActive ? '#C8202F' : '#111111'}
          style={styles.optionIcon}
        />
        <Text
          style={[
            styles.optionLabel,
            { fontFamily: fontSemi },
            isActive ? styles.optionLabelActive : styles.optionLabelInactive,
          ]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style="dark" backgroundColor="#FFFFFF" />
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.8}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={20} color="#222" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { fontFamily: fontSemi }]}>What Suits You?</Text>

        <View style={styles.optionsRow}>
          {renderCard('individuals', 'Individuals', 'person-outline')}
          {renderCard('openForum', 'Open Forum', 'business-outline')}
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.footerButton, styles.footerButtonSecondary]}
          activeOpacity={0.8}
          onPress={() => router.back()}
        >
          <Text style={[styles.footerButtonTextSecondary, { fontFamily: fontSemi }]}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.footerButton, styles.footerButtonPrimary]}
          activeOpacity={0.8}
          onPress={() => {
            if (selected === 'individuals') {
              router.push('/add-quote/individuals/cargo-info');
            } else {
              router.push('/add-quote/cargo-info');
            }
          }}
        >
          <Text style={[styles.footerButtonTextPrimary, { fontFamily: fontSemi }]}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerRow: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 8,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F3F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  title: {
    fontSize: 22,
    color: '#111111',
    marginBottom: 24,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  optionCard: {
    flex: 1,
    minWidth: 150,
    borderRadius: 10,
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  optionCardInactive: {
    borderColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
  },
  optionCardActive: {
    borderColor: '#C8202F',
    backgroundColor: '#FFFFFF',
  },
  optionIcon: {
    marginBottom: 12,
  },
  optionLabel: {
    fontSize: 16,
  },
  optionLabelInactive: {
    color: '#111111',
  },
  optionLabelActive: {
    color: '#C8202F',
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  footerButton: {
    flex: 1,
    height: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerButtonSecondary: {
    backgroundColor: '#F1F1F1',
  },
  footerButtonPrimary: {
    backgroundColor: '#C8202F',
  },
  footerButtonTextSecondary: {
    fontSize: 16,
    color: '#1A1A1A',
  },
  footerButtonTextPrimary: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});
