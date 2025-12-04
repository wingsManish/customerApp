import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FormField } from '@/components/FormField';
import { SelectField } from '@/components/SelectField';
import { CountryCodePicker, Country } from '@/components/CountryCodePicker';
import { NavigationButtons } from '@/components/NavigationButtons';
import { getSession, updateSession } from '@/services/sessionService';
import { isRequired, isValidPhoneNumber } from '@/utils/validation';

const RELATIONSHIP_OPTIONS = [
  { label: 'Spouse', value: 'spouse' },
  { label: 'Parent', value: 'parent' },
  { label: 'Sibling', value: 'sibling' },
  { label: 'Friend', value: 'friend' },
  { label: 'Colleague', value: 'colleague' },
  { label: 'Other', value: 'other' },
];

export default function EmergencyInfoScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [relationship, setRelationship] = useState('');
  const [address, setAddress] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Country>({
    code: 'TZ',
    name: 'Tanzania',
    callingCode: '255',
  });
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
      if (session?.emergencyInfo) {
        setContactName(session.emergencyInfo.contactName || '');
        setRelationship(session.emergencyInfo.relationship || '');
        setAddress(session.emergencyInfo.address || '');

        // Handle phone number with country code
        let phone = session.emergencyInfo.contactPhone || '';
        let country: Country = {
          code: 'TZ',
          name: 'Tanzania',
          callingCode: '255',
        };

        // Try to detect country code from phone number
        const countryCodes = [
          { code: 'TZ', callingCode: '255', name: 'Tanzania' },
          { code: 'KE', callingCode: '254', name: 'Kenya' },
          { code: 'UG', callingCode: '256', name: 'Uganda' },
          { code: 'RW', callingCode: '250', name: 'Rwanda' },
          { code: 'ZA', callingCode: '27', name: 'South Africa' },
          { code: 'NG', callingCode: '234', name: 'Nigeria' },
          { code: 'GH', callingCode: '233', name: 'Ghana' },
        ];

        // Check if phone starts with a country code
        for (const cc of countryCodes) {
          if (phone.startsWith(`+${cc.callingCode}`)) {
            phone = phone.replace(`+${cc.callingCode}`, '').trim();
            country = cc;
            break;
          } else if (phone.startsWith(cc.callingCode)) {
            phone = phone.replace(cc.callingCode, '').trim();
            country = cc;
            break;
          }
        }

        setContactPhone(phone);
        setSelectedCountry(country);
      }
    };
    loadSession();
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!isRequired(contactName)) {
      newErrors.contactName = 'Contact name is required';
    }

    if (!isRequired(contactPhone)) {
      newErrors.contactPhone = 'Phone number is required';
    } else if (!isValidPhoneNumber(contactPhone)) {
      newErrors.contactPhone = 'Please enter a valid phone number';
    }

    if (!isRequired(relationship)) {
      newErrors.relationship = 'Relationship is required';
    }

    if (!isRequired(address)) {
      newErrors.address = 'Emergency address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePrevious = () => {
    router.back();
  };

  const handleCreate = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Combine country code with phone number
      const fullPhoneNumber = `+${selectedCountry.callingCode}${contactPhone}`;

      await updateSession({
        emergencyInfo: {
          contactName,
          contactPhone: fullPhoneNumber,
          relationship,
          address,
        },
        emergencyInfoCompleted: true,
        onboardingComplete: true,
      });

      // Navigate to success screen
      router.replace('/company-success');
    } catch (error) {
      console.error('Error saving emergency info:', error);
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
              <View style={[styles.progressFill, { width: '90%' }]} />
            </View>
          </View>

          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={handlePrevious}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="arrow-back" size={24} color="#000000" />
          </TouchableOpacity>

          <View style={styles.content}>
            <Text style={[styles.title, { fontFamily: fontFamilySemiBold }]}>
              Emergency Info
            </Text>

            <Text style={[styles.subtitle, { fontFamily: fontFamilyRegular }]}>
              Please provide emergency contact information
            </Text>

            {/* Form Fields */}
            <FormField
              label="Alternate Contact Name"
              value={contactName}
              onChangeText={setContactName}
              placeholder="Enter contact name"
              error={errors.contactName}
              fontFamily={fontFamilyRegular}
              autoCapitalize="words"
            />

            {/* Alternate Phone Number Field with Country Code */}
            <View style={styles.phoneFieldContainer}>
              <Text style={[styles.label, { fontFamily: fontFamilyRegular }, errors.contactPhone && styles.labelError]}>
                Alternate Phone Number
              </Text>
              <View style={[styles.phoneInputWrapper, errors.contactPhone && styles.phoneInputWrapperError]}>
                <View style={styles.countryCodeContainer}>
                  <CountryCodePicker
                    selectedCountry={selectedCountry}
                    onSelect={setSelectedCountry}
                    fontFamily={fontFamilyRegular}
                  />
                </View>
                <View style={styles.divider} />
                <View style={styles.phoneInputContainer}>
                  <TextInput
                    style={[styles.phoneInput, { fontFamily: fontFamilyRegular }]}
                    value={contactPhone}
                    onChangeText={setContactPhone}
                    placeholder="Enter phone number"
                    placeholderTextColor="#999999"
                    keyboardType="phone-pad"
                    autoComplete="tel"
                    textContentType="telephoneNumber"
                    maxLength={15}
                  />
                </View>
              </View>
              {errors.contactPhone && (
                <Text style={[styles.errorText, { fontFamily: fontFamilyRegular }]}>{errors.contactPhone}</Text>
              )}
            </View>

            <SelectField
              label="Relationship"
              value={relationship}
              options={RELATIONSHIP_OPTIONS}
              onSelect={setRelationship}
              placeholder="Select relationship"
              error={errors.relationship}
              fontFamily={fontFamilyRegular}
            />

            <FormField
              label="Emergency Address"
              value={address}
              onChangeText={setAddress}
              placeholder="Enter emergency address"
              error={errors.address}
              fontFamily={fontFamilyRegular}
              multiline
              numberOfLines={3}
              autoCapitalize="sentences"
            />

            {/* Navigation Buttons */}
            <NavigationButtons
              onPrevious={handlePrevious}
              onNext={handleCreate}
              nextLabel="Create"
              isLoading={isLoading}
            />
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
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666666',
    marginBottom: 32,
    textAlign: 'center',
  },
  phoneFieldContainer: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: Platform.OS === 'web' ? '500' : 'normal',
    color: '#000000',
    marginBottom: 8,
  },
  labelError: {
    color: '#FF3B30',
  },
  phoneInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    minHeight: 56,
    width: '100%',
  },
  phoneInputWrapperError: {
    borderColor: '#FF3B30',
    borderWidth: 1,
  },
  countryCodeContainer: {
    backgroundColor: '#FFFFFF',
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: '#E5E5E5',
    marginHorizontal: 4,
  },
  phoneInputContainer: {
    flex: 1,
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  errorText: {
    fontSize: 12,
    color: '#FF3B30',
    marginTop: 4,
    marginLeft: 4,
  },
});

