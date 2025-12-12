import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const cargoOptions = ['Select Cargo', 'Cement', 'Steel', 'FMCG', 'Machinery'];
const truckOptions = ['Select Truck', 'Flatbed', 'Container', 'Tanker', 'Refrigerated'];

export default function IndividualsCargoInfoScreen() {
  const router = useRouter();
  const [cargoType, setCargoType] = useState('Select Cargo');
  const [truckType, setTruckType] = useState('Select Truck');
  const [openDropdown, setOpenDropdown] = useState<'cargo' | 'truck' | null>(null);

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

  const renderDropdown = (label: string, value: string, options: string[], type: 'cargo' | 'truck') => (
    <View
      style={[
        styles.dropdownWrapper,
        openDropdown === type ? styles.dropdownRaised : undefined,
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.inputRow}
        onPress={() => setOpenDropdown(openDropdown === type ? null : type)}
      >
        <Text
          style={[
            styles.inputPlaceholder,
            { fontFamily: fontRegular },
            value !== `Select ${type === 'cargo' ? 'Cargo' : 'Truck'}` && styles.inputValue,
          ]}
        >
          {value}
        </Text>
        <Ionicons name="chevron-down" size={18} color="#606060" />
      </TouchableOpacity>
      {openDropdown === type ? (
        <View style={styles.dropdownList}>
          <ScrollView style={styles.dropdownScroll} showsVerticalScrollIndicator={false}>
            {options.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.dropdownItem}
                activeOpacity={0.9}
                onPress={() => {
                  if (type === 'cargo') setCargoType(option);
                  if (type === 'truck') setTruckType(option);
                  setOpenDropdown(null);
                }}
              >
                <Text style={[styles.dropdownText, { fontFamily: fontRegular }]}>{option}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ) : null}
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style="dark" backgroundColor="#FFFFFF" />

      {openDropdown ? (
        <TouchableOpacity
          activeOpacity={1}
          style={styles.dropdownBackdrop}
          onPress={() => setOpenDropdown(null)}
        />
      ) : null}

      <View style={styles.progressContainer}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: '25%' }]} />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { fontFamily: fontSemi }]}>Cargo Information</Text>

        {renderDropdown('Cargo Type', cargoType, cargoOptions, 'cargo')}
        <TextInput
          placeholder="Product"
          placeholderTextColor="#9A9A9A"
          style={[styles.textInput, { fontFamily: fontRegular }]}
        />
        <TextInput
          placeholder="Weight (in Tons)"
          placeholderTextColor="#9A9A9A"
          keyboardType="numeric"
          style={[styles.textInput, { fontFamily: fontRegular }]}
        />
        {renderDropdown('Truck Type', truckType, truckOptions, 'truck')}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.footerButton, styles.footerButtonSecondary]}
          activeOpacity={0.8}
          onPress={() => router.back()}
        >
          <Text style={[styles.footerButtonTextSecondary, { fontFamily: fontSemi }]}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.footerButton, styles.footerButtonPrimary]}
          activeOpacity={0.8}
          onPress={() => {
            setOpenDropdown(null);
            router.push('/add-quote/individuals/pickup-drop');
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
  progressContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E0E0E0',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#C8202F',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    color: '#111111',
    marginBottom: 20,
  },
  inputRow: {
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputPlaceholder: {
    fontSize: 14,
    color: '#6A6A6A',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 14,
    fontSize: 14,
    color: '#111111',
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
  dropdownWrapper: {
    marginBottom: 14,
    position: 'relative',
  },
  dropdownRaised: {
    zIndex: 25,
  },
  dropdownBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    zIndex: 10,
  },
  dropdownList: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    marginTop: 6,
    maxHeight: 220,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    zIndex: 20,
    ...(Platform.OS === 'web'
      ? { boxShadow: '0px 6px 16px rgba(0,0,0,0.12)' }
      : {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.15,
          shadowRadius: 12,
          elevation: 8,
        }),
  },
  dropdownScroll: {
    maxHeight: 220,
  },
  dropdownItem: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  dropdownText: {
    fontSize: 14,
    color: '#111111',
  },
  inputValue: {
    color: '#111111',
  },
});
