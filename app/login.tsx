import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { CountryCodePicker, Country } from '@/components/CountryCodePicker';
import { SupplyChain } from '@/components/SupplyChain';
import { sendOTP } from '@/services/authService';

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Country>({
    code: 'TZ',
    name: 'Tanzania',
    callingCode: '255',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Determine font family based on platform
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

  // Phone number validation
  const validatePhoneNumber = (phone: string): boolean => {
    // Remove all non-digit characters
    const digitsOnly = phone.replace(/\D/g, '');
    
    // Basic validation: should be 7-15 digits (international standard)
    if (digitsOnly.length < 7 || digitsOnly.length > 15) {
      return false;
    }
    
    return true;
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setError(''); // Clear error when country changes
  };

  const handlePhoneChange = (text: string) => {
    // Allow only digits and common phone number characters
    const cleaned = text.replace(/[^\d\s\-\(\)]/g, '');
    setPhoneNumber(cleaned);
    setError(''); // Clear error on input change
  };

  const handleContinue = async () => {
    // Clear previous errors
    setError('');

    // Validation
    if (!phoneNumber.trim()) {
      setError('Please enter your phone number');
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setError('Please enter a valid phone number (7-15 digits)');
      return;
    }

    setIsLoading(true);

    try {
      // Format phone number with country code
      const fullPhoneNumber = `+${selectedCountry.callingCode}${phoneNumber.replace(/\D/g, '')}`;
      
      // Call auth service to send OTP
      const response = await sendOTP(fullPhoneNumber);
      
      if (response.success) {
        console.log('OTP sent successfully:', fullPhoneNumber, response.sessionId);
        router.push({
          pathname: '/otp-verification',
          params: {
            phoneNumber: fullPhoneNumber,
            sessionId: response.sessionId ?? '',
          },
        });
      } else {
        setError(response.error || 'Failed to send OTP. Please try again.');
      }
      
    } catch (err) {
      // Error handling
      const errorMessage = err instanceof Error ? err.message : 'An error occurred. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? insets.top : 0}
      >
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + 32 },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          bounces={false}
        >
          {/* Top Section - Graphic with light blue background */}
          <View style={styles.graphicSection}>
            <SupplyChain width="100%" height={400} variant="hero" />
          </View>

          {/* Bottom Section - Form */}
          <View style={styles.formSection}>
            <View style={styles.formContainer}>
              {/* Welcome Message */}
              <Text style={[styles.title, { fontFamily: fontFamilySemiBold }]}>
                Welcome Back!
              </Text>
              
              <Text style={[styles.subtitle, { fontFamily: fontFamilyRegular }]}>
                Enter your phone number to continue
              </Text>

              {/* Phone Number Input */}
              <View style={styles.inputContainer}>
                <View style={[
                  styles.phoneInputWrapper,
                  error ? styles.phoneInputWrapperError : null,
                ]}>
                  <View style={styles.countryCodeContainer}>
                    <CountryCodePicker
                      selectedCountry={selectedCountry}
                      onSelect={handleCountrySelect}
                      fontFamily={fontFamilyRegular}
                    />
                  </View>

                  <View style={styles.divider} />

                  <TextInput
                    style={[
                      styles.phoneInput,
                      { fontFamily: fontFamilyRegular }
                    ]}
                    placeholder="Enter mobile number"
                    placeholderTextColor="#999999"
                    value={phoneNumber}
                    onChangeText={handlePhoneChange}
                    keyboardType="phone-pad"
                    maxLength={15}
                    autoComplete="tel"
                    textContentType="telephoneNumber"
                    editable={!isLoading}
                    returnKeyType="done"
                    onSubmitEditing={handleContinue}
                  />
                </View>

                {/* Error Message */}
                {error ? (
                  <View style={styles.errorContainer}>
                    <Text style={[styles.errorText, { fontFamily: fontFamilyRegular }]}>
                      {error}
                    </Text>
                  </View>
                ) : (
                  <View style={styles.helpTextContainer}>
                    <Text style={[styles.helpText, { fontFamily: fontFamilyRegular }]}>
                      We'll send you a verification code
                    </Text>
                  </View>
                )}
              </View>

              {/* Continue Button */}
              <View style={styles.buttonContainer}>
                <Button
                  mode="contained"
                  onPress={handleContinue}
                  style={styles.button}
                  buttonColor="#C8202F"
                  textColor="#FFFFFF"
                  labelStyle={styles.buttonLabel}
                  loading={isLoading}
                  disabled={isLoading || !phoneNumber.trim()}
                  contentStyle={styles.buttonContent}
                >
                  {isLoading ? 'Sending...' : 'Continue'}
                </Button>
              </View>

              {/* Privacy Note */}
              <Text style={[styles.privacyText, { fontFamily: fontFamilyRegular }]}>
                By continuing, you agree to our Terms of Service and Privacy Policy
              </Text>
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
  },
  graphicSection: {
    width: '100%',
    backgroundColor: '#E6F4FE',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  formSection: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  formContainer: {
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: Platform.OS === 'web' ? '600' : 'normal',
    lineHeight: 36,
    color: '#000000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
    color: '#666666',
    marginBottom: 32,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 24,
  },
  phoneInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  phoneInputWrapperError: {
    borderColor: '#FF3B30',
    borderWidth: 1.5,
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
  phoneInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 18,
    fontSize: 16,
    color: '#000000',
    backgroundColor: '#FFFFFF',
  },
  errorContainer: {
    marginTop: 8,
    paddingLeft: 4,
  },
  errorText: {
    fontSize: 13,
    color: '#FF3B30',
    lineHeight: 18,
  },
  helpTextContainer: {
    marginTop: 8,
    paddingLeft: 4,
  },
  helpText: {
    fontSize: 13,
    color: '#999999',
    lineHeight: 18,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 8,
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
  privacyText: {
    fontSize: 12,
    color: '#999999',
    textAlign: 'center',
    marginTop: 24,
    lineHeight: 18,
    paddingHorizontal: 16,
  },
});

