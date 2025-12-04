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
import { Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FormField } from '@/components/FormField';
import { SelectField } from '@/components/SelectField';
import { CountryCodePicker, Country } from '@/components/CountryCodePicker';
import { NavigationButtons } from '@/components/NavigationButtons';
import { getSession, updateSession } from '@/services/sessionService';
import { isValidEmail, isRequired } from '@/utils/validation';

const COMMUNICATION_MODES = [
  { label: 'SMS', value: 'sms' },
  { label: 'Email', value: 'email' },
  { label: 'Both', value: 'both' },
];

export default function ContactInfoScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [communicationMode, setCommunicationMode] = useState('');
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
      if (session) {
        let phone = '';
        let country: Country = {
          code: 'TZ',
          name: 'Tanzania',
          callingCode: '255',
        };

        // Load phone number from session
        if (session.phoneNumber) {
          phone = session.phoneNumber;
        } else if (session.contactInfo?.mobile) {
          phone = session.contactInfo.mobile;
        }

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

        setMobile(phone);
        setSelectedCountry(country);

        if (session.contactInfo) {
          setEmail(session.contactInfo.email || '');
          setCommunicationMode(session.contactInfo.communicationMode || '');
        }
        // Also check personal info for email
        if (session.personalInfo?.email && !email) {
          setEmail(session.personalInfo.email);
        }
      }
    };
    loadSession();
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!isRequired(mobile)) {
      newErrors.mobile = 'Mobile number is required';
    }

    if (!isRequired(email)) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!isRequired(communicationMode)) {
      newErrors.communicationMode = 'Please select a communication mode';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePrevious = () => {
    router.back();
  };

  const handleNext = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Combine country code with phone number
      const fullPhoneNumber = `+${selectedCountry.callingCode}${mobile}`;
      
      await updateSession({
        contactInfo: {
          mobile: fullPhoneNumber,
          email,
          communicationMode,
        },
        contactInfoCompleted: true,
      });

      router.push('/bank-details');
    } catch (error) {
      console.error('Error saving contact info:', error);
      // Show error alert
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
              <View style={[styles.progressFill, { width: '25%' }]} />
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
              Contact Info
            </Text>

            {/* Form Fields */}
            <View style={styles.formFieldsContainer}>
              {/* Mobile Field with Country Code */}
              <View style={styles.phoneFieldContainer}>
                <Text style={[styles.label, { fontFamily: fontFamilyRegular }, errors.mobile && styles.labelError]}>
                  Mobile
                </Text>
                <View style={[styles.phoneInputWrapper, errors.mobile && styles.phoneInputWrapperError]}>
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
                      value={mobile}
                      onChangeText={setMobile}
                      placeholder="Enter mobile number"
                      placeholderTextColor="#999999"
                      keyboardType="phone-pad"
                      autoComplete="tel"
                      textContentType="telephoneNumber"
                      maxLength={15}
                    />
                  </View>
                </View>
                {errors.mobile && (
                  <Text style={[styles.errorText, { fontFamily: fontFamilyRegular }]}>{errors.mobile}</Text>
                )}
              </View>

              <FormField
                label="Email ID"
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                error={errors.email}
                keyboardType="email-address"
                autoCapitalize="none"
                fontFamily={fontFamilyRegular}
                autoComplete="email"
                textContentType="emailAddress"
              />

              <SelectField
                label="Mode of Communication"
                value={communicationMode}
                options={COMMUNICATION_MODES}
                onSelect={setCommunicationMode}
                placeholder="Select communication mode"
                error={errors.communicationMode}
                fontFamily={fontFamilyRegular}
              />
            </View>

            {/* Navigation Buttons */}
            <NavigationButtons
              onPrevious={handlePrevious}
              onNext={handleNext}
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
    width: '100%',
  },
  formFieldsContainer: {
    width: '100%',
    alignItems: 'flex-start',
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
  title: {
    fontSize: 24,
    fontWeight: Platform.OS === 'web' ? '600' : 'normal',
    color: '#000000',
    marginBottom: 32,
    textAlign: 'center',
  },
});

