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
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FormField } from '@/components/FormField';
import { SelectField } from '@/components/SelectField';
import { NavigationButtons } from '@/components/NavigationButtons';
import { getSession, updateSession } from '@/services/sessionService';
import {
  isRequired,
  isValidTIN,
  isValidAccountNumber,
  isValidIFSC,
  isValidMICR,
  minLength,
  maxLength,
} from '@/utils/validation';
import { safeGoBack } from '@/utils/navigation';

const ACCOUNT_TYPES = [
  { label: 'Savings', value: 'savings' },
  { label: 'Current', value: 'current' },
  { label: 'Checking', value: 'checking' },
];

export default function BankDetailsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [tinNumber, setTinNumber] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountType, setAccountType] = useState('');
  const [bankBranch, setBankBranch] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [micr, setMicr] = useState('');
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
      if (session?.bankDetails) {
        setTinNumber(session.bankDetails.tinNumber || '');
        setAccountNumber(session.bankDetails.accountNumber || '');
        setBankName(session.bankDetails.bankName || '');
        setAccountType(session.bankDetails.accountType || '');
        setBankBranch(session.bankDetails.bankBranch || '');
        setIfsc(session.bankDetails.ifsc || '');
        setMicr(session.bankDetails.micr || '');
      }
    };
    loadSession();
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // TIN Number validation
    if (!isRequired(tinNumber)) {
      newErrors.tinNumber = 'TIN number is required';
    } else if (!isValidTIN(tinNumber)) {
      newErrors.tinNumber = 'TIN number must be 9-15 alphanumeric characters';
    }

    // Account Number validation
    if (!isRequired(accountNumber)) {
      newErrors.accountNumber = 'Bank account number is required';
    } else if (!isValidAccountNumber(accountNumber)) {
      newErrors.accountNumber = 'Account number must be 9-18 digits';
    }

    // Bank Name validation
    if (!isRequired(bankName)) {
      newErrors.bankName = 'Bank name is required';
    } else if (!minLength(bankName, 2)) {
      newErrors.bankName = 'Bank name must be at least 2 characters';
    } else if (!maxLength(bankName, 100)) {
      newErrors.bankName = 'Bank name must be no more than 100 characters';
    }

    // Account Type validation
    if (!isRequired(accountType)) {
      newErrors.accountType = 'Account type is required';
    }

    // Bank Branch validation
    if (!isRequired(bankBranch)) {
      newErrors.bankBranch = 'Bank branch is required';
    } else if (!minLength(bankBranch, 2)) {
      newErrors.bankBranch = 'Bank branch must be at least 2 characters';
    } else if (!maxLength(bankBranch, 100)) {
      newErrors.bankBranch = 'Bank branch must be no more than 100 characters';
    }

    // IFSC validation (optional but validate format if provided)
    if (ifsc && ifsc.trim() !== '') {
      if (!isValidIFSC(ifsc)) {
        newErrors.ifsc = 'IFSC code must be 11 characters (e.g., ABCD0123456)';
      }
    }

    // MICR validation (optional but validate format if provided)
    if (micr && micr.trim() !== '') {
      if (!isValidMICR(micr)) {
        newErrors.micr = 'MICR code must be 9 digits';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Clear error when user starts typing
  const handleFieldChange = (fieldName: string, value: string) => {
    if (errors[fieldName]) {
      setErrors({ ...errors, [fieldName]: '' });
    }
    
    switch (fieldName) {
      case 'tinNumber':
        setTinNumber(value.toUpperCase().replace(/[^A-Z0-9]/g, ''));
        break;
      case 'accountNumber':
        setAccountNumber(value.replace(/[^0-9]/g, ''));
        break;
      case 'bankName':
        setBankName(value);
        break;
      case 'bankBranch':
        setBankBranch(value);
        break;
      case 'ifsc':
        setIfsc(value.toUpperCase().replace(/[^A-Z0-9]/g, ''));
        break;
      case 'micr':
        setMicr(value.replace(/[^0-9]/g, ''));
        break;
    }
  };

  const handlePrevious = () => {
    safeGoBack('/contact-info');
  };

  const handleNext = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await updateSession({
        bankDetails: {
          tinNumber,
          accountNumber,
          bankName,
          accountType,
          bankBranch,
          ifsc: ifsc || undefined,
          micr: micr || undefined,
        },
        bankDetailsCompleted: true,
      });

      router.push('/upload-documents');
    } catch (error) {
      console.error('Error saving bank details:', error);
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
              <View style={[styles.progressFill, { width: '40%' }]} />
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
              Bank Details
            </Text>

            {/* Form Fields */}
            <FormField
              label="TIN Number"
              value={tinNumber}
              onChangeText={(text) => handleFieldChange('tinNumber', text)}
              placeholder="Enter TIN number"
              error={errors.tinNumber}
              fontFamily={fontFamilyRegular}
              autoCapitalize="characters"
              maxLength={15}
            />

            <FormField
              label="Bank Account Number"
              value={accountNumber}
              onChangeText={(text) => handleFieldChange('accountNumber', text)}
              placeholder="Enter account number"
              error={errors.accountNumber}
              keyboardType="numeric"
              fontFamily={fontFamilyRegular}
              maxLength={18}
            />

            <FormField
              label="Bank Name"
              value={bankName}
              onChangeText={(text) => handleFieldChange('bankName', text)}
              placeholder="Enter bank name"
              error={errors.bankName}
              fontFamily={fontFamilyRegular}
              autoCapitalize="words"
              maxLength={100}
            />

            <SelectField
              label="Account Type"
              value={accountType}
              options={ACCOUNT_TYPES}
              onSelect={(value) => {
                setAccountType(value);
                if (errors.accountType) {
                  setErrors({ ...errors, accountType: '' });
                }
              }}
              placeholder="Select account type"
              error={errors.accountType}
              fontFamily={fontFamilyRegular}
            />

            <FormField
              label="Bank Branch"
              value={bankBranch}
              onChangeText={(text) => handleFieldChange('bankBranch', text)}
              placeholder="Enter bank branch"
              error={errors.bankBranch}
              fontFamily={fontFamilyRegular}
              autoCapitalize="words"
              maxLength={100}
            />

            <FormField
              label="IFSC (Optional)"
              value={ifsc}
              onChangeText={(text) => handleFieldChange('ifsc', text)}
              placeholder="Enter IFSC code"
              error={errors.ifsc}
              fontFamily={fontFamilyRegular}
              autoCapitalize="characters"
              maxLength={11}
            />

            <FormField
              label="MICR (Optional)"
              value={micr}
              onChangeText={(text) => handleFieldChange('micr', text)}
              placeholder="Enter MICR code"
              error={errors.micr}
              keyboardType="numeric"
              fontFamily={fontFamilyRegular}
              maxLength={9}
            />

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
  },
  title: {
    fontSize: 24,
    fontWeight: Platform.OS === 'web' ? '600' : 'normal',
    color: '#000000',
    marginBottom: 32,
    textAlign: 'center',
  },
});

