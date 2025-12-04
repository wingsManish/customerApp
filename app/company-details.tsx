import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FormField } from '@/components/FormField';
import { SelectField } from '@/components/SelectField';
import { getSession, updateSession } from '@/services/sessionService';
import { isRequired } from '@/utils/validation';

// Mock data - replace with API calls
const CITIES = [
  { label: 'Dar es Salaam', value: 'dar-es-salaam' },
  { label: 'Arusha', value: 'arusha' },
  { label: 'Mwanza', value: 'mwanza' },
  { label: 'Dodoma', value: 'dodoma' },
  { label: 'Tanga', value: 'tanga' },
  { label: 'Zanzibar', value: 'zanzibar' },
];

const STATES = [
  { label: 'Dar es Salaam', value: 'dar-es-salaam' },
  { label: 'Arusha', value: 'arusha' },
  { label: 'Kilimanjaro', value: 'kilimanjaro' },
  { label: 'Mwanza', value: 'mwanza' },
  { label: 'Dodoma', value: 'dodoma' },
];

const COUNTRIES = [
  { label: 'Tanzania', value: 'tanzania' },
  { label: 'Kenya', value: 'kenya' },
  { label: 'Uganda', value: 'uganda' },
];

export default function CompanyDetailsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [companyName, setCompanyName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [pin, setPin] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const fontFamilySemiBold = Platform.select({
    ios: 'Figtree-SemiBold',
    android: 'Figtree-SemiBold',
    web: 'Figtree',
    default: 'Figtree',
  });

  const fontFamilyRegular = Platform.select({
    ios: 'Figtree-Regular',
    android: 'Figtree-Regular',
    web: 'Figtree',
    default: 'Figtree',
  });

  // Load data from session
  useEffect(() => {
    const loadSession = async () => {
      const session = await getSession();
      if (session?.companyInfo) {
        setCompanyName(session.companyInfo.companyName || '');
        setOwnerName(session.companyInfo.ownerName || '');
        setLicenseNumber(session.companyInfo.licenseNumber || '');
        setAddress(session.companyInfo.address || '');
        setCity(session.companyInfo.city || '');
        setState(session.companyInfo.state || '');
        setCountry(session.companyInfo.country || '');
        setPin(session.companyInfo.pin || '');
      }
    };
    loadSession();
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!isRequired(companyName)) {
      newErrors.companyName = 'Company name is required';
    }

    if (!isRequired(ownerName)) {
      newErrors.ownerName = 'Owner name is required';
    }

    if (!isRequired(licenseNumber)) {
      newErrors.licenseNumber = 'License number is required';
    }

    if (!isRequired(address)) {
      newErrors.address = 'Address is required';
    }

    if (!isRequired(city)) {
      newErrors.city = 'City is required';
    }

    if (!isRequired(state)) {
      newErrors.state = 'State is required';
    }

    if (!isRequired(country)) {
      newErrors.country = 'Country is required';
    }

    if (!isRequired(pin)) {
      newErrors.pin = 'PIN code is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await updateSession({
        companyInfo: {
          companyName,
          ownerName,
          licenseNumber,
          address,
          city,
          state,
          country,
          pin,
        },
        companyInfoCompleted: true,
      });

      router.push('/contact-info');
    } catch (error) {
      console.error('Error saving company details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? insets.top : 0}
      >
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: Math.max(insets.bottom, 32) },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          bounces={false}
        >
          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '15%' }]} />
            </View>
          </View>

          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="arrow-back" size={24} color="#000000" />
          </TouchableOpacity>

          <View style={styles.content}>
            <Text style={[styles.title, { fontFamily: fontFamilySemiBold }]}>
              Company Details
            </Text>

            {/* Form Fields */}
            <FormField
              label="Company Name"
              value={companyName}
              onChangeText={setCompanyName}
              placeholder="Enter company name"
              error={errors.companyName}
              fontFamily={fontFamilyRegular}
              autoCapitalize="words"
            />

            <FormField
              label="Owner Name"
              value={ownerName}
              onChangeText={setOwnerName}
              placeholder="Enter owner name"
              error={errors.ownerName}
              fontFamily={fontFamilyRegular}
              autoCapitalize="words"
            />

            <FormField
              label="License Number"
              value={licenseNumber}
              onChangeText={setLicenseNumber}
              placeholder="Enter license number"
              error={errors.licenseNumber}
              fontFamily={fontFamilyRegular}
              autoCapitalize="characters"
            />

            <FormField
              label="Address"
              value={address}
              onChangeText={setAddress}
              placeholder="Enter address"
              error={errors.address}
              fontFamily={fontFamilyRegular}
              multiline
              numberOfLines={2}
              autoCapitalize="sentences"
            />

            <SelectField
              label="City"
              value={city}
              options={CITIES}
              onSelect={setCity}
              placeholder="Select city"
              error={errors.city}
              fontFamily={fontFamilyRegular}
            />

            <SelectField
              label="State"
              value={state}
              options={STATES}
              onSelect={setState}
              placeholder="Select state"
              error={errors.state}
              fontFamily={fontFamilyRegular}
            />

            <SelectField
              label="Country"
              value={country}
              options={COUNTRIES}
              onSelect={setCountry}
              placeholder="Select country"
              error={errors.country}
              fontFamily={fontFamilyRegular}
            />

            <FormField
              label="PIN"
              value={pin}
              onChangeText={(text) => setPin(text.replace(/[^0-9]/g, ''))}
              placeholder="Enter PIN code"
              error={errors.pin}
              keyboardType="numeric"
              fontFamily={fontFamilyRegular}
              maxLength={6}
            />

            {/* Next Button */}
            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                onPress={handleNext}
                style={styles.button}
                buttonColor="#C8202F"
                textColor="#FFFFFF"
                labelStyle={styles.buttonLabel}
                loading={isLoading}
                disabled={isLoading}
                contentStyle={styles.buttonContent}
              >
                Next
              </Button>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  progressContainer: {
    paddingTop: 16,
    paddingBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E5E5E5',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#C8202F',
    borderRadius: 2,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  content: {
    flex: 1,
    paddingTop: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: Platform.OS === 'web' ? '600' : 'normal',
    color: '#000000',
    marginBottom: 32,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 24,
  },
  button: {
    width: '100%',
    height: 56,
    borderRadius: 12,
    elevation: 0,
    shadowOpacity: 0,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

