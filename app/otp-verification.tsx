import React, { useEffect, useMemo, useRef, useState } from 'react';
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
import { useRouter, useLocalSearchParams } from 'expo-router';
import Constants from 'expo-constants';

import { verifyOTP, sendOTP } from '@/services/authService';
import { saveSession } from '@/services/sessionService';
import { OTPInput } from '@/components/OTPInput';
import { safeGoBack } from '@/utils/navigation';

const OTP_LENGTH = 6;
const RESEND_INTERVAL = 30;

// Check if API is enabled
const API_ENABLED = Constants.expoConfig?.extra?.apiEnabled === true;

export default function OTPVerificationScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ phoneNumber?: string; sessionId?: string }>();

  const phoneNumber = useMemo(() => (params.phoneNumber as string) || '', [params.phoneNumber]);
  const initialSessionId = useMemo(() => (params.sessionId as string) || '', [params.sessionId]);

  // Generate mock sessionId if missing and API is disabled
  const defaultSessionId = initialSessionId || (API_ENABLED ? '' : 'mock_session_' + Date.now());
  const [sessionId, setSessionId] = useState(defaultSessionId);
  const [otpDigits, setOtpDigits] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(RESEND_INTERVAL);
  const [isResending, setIsResending] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  // Prevent duplicate submissions (auto-complete + button spam or rerenders)
  const isVerifyingRef = useRef(false);

  // If phoneNumber is missing from params, try to get it from session
  useEffect(() => {
    if (!phoneNumber && !API_ENABLED) {
      // In mock mode, allow proceeding without phoneNumber
      // The verifyOTP function will handle it
    }
  }, [phoneNumber]);

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

  // Countdown timer for resend
  useEffect(() => {
    if (resendTimer <= 0) return;

    const interval = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [resendTimer]);

  // Auto-verify when OTP is complete
  const handleOTPComplete = async (otpValue: string) => {
    if (isVerifyingRef.current || isLoading || isVerified) return;
    await handleVerify(otpValue);
  };

  const handleVerify = async (otpValue?: string) => {
    if (isVerifyingRef.current || isLoading || isVerified) return;
    isVerifyingRef.current = true;
    const otp = otpValue || otpDigits.join('');
    
    if (otp.length !== OTP_LENGTH) {
      setError('Please enter the 6-digit code.');
      return;
    }

    // When API is disabled, we can proceed without phoneNumber/sessionId
    // Otherwise, require both
    if (API_ENABLED) {
      if (!phoneNumber || !sessionId) {
        setError('Missing verification details. Please go back and request a new code.');
        return;
      }
    }

    // Use provided values or generate mock ones for testing
    const currentPhoneNumber = phoneNumber || 'mock_phone_' + Date.now();
    const currentSessionId = sessionId || 'mock_session_' + Date.now();
    
    // Update state if we generated mock values
    if (!sessionId) {
      setSessionId(currentSessionId);
    }

    try {
      setIsLoading(true);
      setError('');
      setSuccessMessage('');
      
      const response = await verifyOTP(currentPhoneNumber, otp, currentSessionId);

      if (response.success) {
        setSuccessMessage('Verification successful!');
        setIsVerified(true);
        
        // Save session with sessionId and authToken
        await saveSession({
          phoneNumber: currentPhoneNumber,
          sessionId: currentSessionId,
          authToken: response.token,
          profileCompleted: false,
        });

        // Navigate to user type selection after short delay
        setTimeout(() => {
          router.replace('/user-type-selection');
        }, 1000);
      } else {
        setError(response.error || 'Invalid OTP. Please try again.');
        setIsVerified(false);
        // Clear OTP on error
        setOtpDigits(Array(OTP_LENGTH).fill(''));
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred. Please try again.';
      setError(errorMessage);
      setIsVerified(false);
      setOtpDigits(Array(OTP_LENGTH).fill(''));
    } finally {
      setIsLoading(false);
      isVerifyingRef.current = false;
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0 || isResending) return;

    try {
      setIsResending(true);
      setError('');
      setSuccessMessage('');
      setOtpDigits(Array(OTP_LENGTH).fill(''));
      setResendTimer(RESEND_INTERVAL);

      const response = await sendOTP(phoneNumber);
      
      if (response.success) {
        setSessionId(response.sessionId || '');
        setSuccessMessage('New OTP sent successfully!');
      } else {
        setError(response.error || 'Failed to resend OTP. Please try again.');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to resend OTP. Please try again.';
      setError(errorMessage);
    } finally {
      setIsResending(false);
    }
  };

  const formatPhoneNumber = (phone: string) => {
    // Format: +255 123 456 789
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length < 4) return phone;
    const countryCode = cleaned.slice(0, -9);
    const number = cleaned.slice(-9);
    const formatted = number.match(/.{1,3}/g)?.join(' ') || number;
    return `+${countryCode} ${formatted}`;
  };

  const isOtpComplete = otpDigits.every((digit) => digit !== '');

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
          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => safeGoBack('/login')}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="arrow-back" size={24} color="#000000" />
          </TouchableOpacity>

          {/* Content */}
          <View style={styles.content}>
            <Text style={[styles.title, { fontFamily: fontFamilySemiBold }]}>
              OTP Verification
            </Text>

            <Text style={[styles.description, { fontFamily: fontFamilyRegular }]}>
              {phoneNumber ? (
                <>
                  Enter the verification code we just sent to your number{'\n'}
                  <Text style={styles.phoneNumber}>{formatPhoneNumber(phoneNumber)}</Text>
                </>
              ) : (
                <>
                  Enter the verification code{'\n'}
                  {!API_ENABLED && (
                    <Text style={styles.phoneNumber}>Use 123456 for testing</Text>
                  )}
                </>
              )}
            </Text>

            {/* Success Message */}
            {successMessage && !error && (
              <View style={styles.successBanner}>
                <Ionicons name="checkmark-circle" size={20} color="#34C759" />
                <Text style={[styles.successText, { fontFamily: fontFamilyRegular }]}>
                  {successMessage}
                </Text>
              </View>
            )}

            {/* Error Message */}
            {error && (
              <View style={styles.errorBanner}>
                <Ionicons name="close-circle" size={20} color="#FF3B30" />
                <Text style={[styles.errorText, { fontFamily: fontFamilyRegular }]}>
                  {error}
                </Text>
              </View>
            )}

            {/* OTP Input */}
            <OTPInput
              length={OTP_LENGTH}
              value={otpDigits}
              onChange={setOtpDigits}
              onComplete={handleOTPComplete}
              error={!!error && !successMessage}
              disabled={isLoading || isVerified}
              fontFamily={fontFamilySemiBold}
            />

            {/* Resend Section */}
            <View style={styles.resendContainer}>
              <Text style={[styles.resendText, { fontFamily: fontFamilyRegular }]}>
                Didn't receive the OTP?{' '}
              </Text>
              {resendTimer > 0 ? (
                <Text style={[styles.resendTimer, { fontFamily: fontFamilyRegular }]}>
                  Resend in {String(Math.floor(resendTimer / 60)).padStart(2, '0')}:
                  {String(resendTimer % 60).padStart(2, '0')}
                </Text>
              ) : (
                <TouchableOpacity
                  onPress={handleResend}
                  disabled={isResending}
                  hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
                >
                  <Text style={[styles.resendLink, { fontFamily: fontFamilyRegular }]}>
                    Resend
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Continue Button */}
            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                onPress={() => handleVerify()}
                style={styles.button}
                buttonColor={isOtpComplete && !isVerified ? '#C8202F' : '#E5E5E5'}
                textColor={isOtpComplete && !isVerified ? '#FFFFFF' : '#999999'}
                labelStyle={styles.buttonLabel}
                disabled={!isOtpComplete || isLoading || isVerified}
                loading={isLoading}
                contentStyle={styles.buttonContent}
              >
                Continue
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
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  content: {
    flex: 1,
    paddingTop: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: Platform.OS === 'web' ? '600' : 'normal',
    color: '#000000',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666666',
    marginBottom: 24,
    textAlign: 'left',
  },
  phoneNumber: {
    color: '#000000',
    fontWeight: Platform.OS === 'web' ? '500' : 'normal',
  },
  successBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    gap: 8,
  },
  successText: {
    fontSize: 14,
    color: '#2E7D32',
    flex: 1,
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEBEE',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    gap: 8,
  },
  errorText: {
    fontSize: 14,
    color: '#FF3B30',
    flex: 1,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    flexWrap: 'wrap',
  },
  resendText: {
    fontSize: 14,
    color: '#666666',
  },
  resendTimer: {
    fontSize: 14,
    color: '#999999',
  },
  resendLink: {
    fontSize: 14,
    color: '#C8202F',
    textDecorationLine: 'underline',
    fontWeight: Platform.OS === 'web' ? '500' : 'normal',
  },
  buttonContainer: {
    width: '100%',
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

