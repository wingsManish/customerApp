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
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import Flag from 'react-native-country-flag';
import { FormField } from '@/components/FormField';
import { Country } from '@/components/CountryCodePicker';
import { getSession, updateSession } from '@/services/sessionService';
import { isValidEmail, isRequired } from '@/utils/validation';

export default function PersonalInfoScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
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

  // Load phone number and country from session
  useEffect(() => {
    const loadSession = async () => {
      const session = await getSession();
      if (session?.phoneNumber) {
        // Extract country code if phone number includes it
        let phone = session.phoneNumber;
        let country: Country = {
          code: 'TZ',
          name: 'Tanzania',
          callingCode: '255',
        };

        // Try to detect country code from phone number
        // Common country codes in the region
        const countryCodes = [
          { code: 'TZ', callingCode: '255', name: 'Tanzania' },
          { code: 'KE', callingCode: '254', name: 'Kenya' },
          { code: 'UG', callingCode: '256', name: 'Uganda' },
          { code: 'RW', callingCode: '250', name: 'Rwanda' },
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

        setPhoneNumber(phone);
        setSelectedCountry(country);
      }
    };
    loadSession();
  }, []);

  const handleImagePicker = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Please grant camera roll permissions to upload a profile picture.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8, // Optimize image size
      });

      if (!result.canceled && result.assets[0]) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Image picker error:', error);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };

  const handleCamera = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Please grant camera permissions to take a photo.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Camera error:', error);
      Alert.alert('Error', 'Failed to take photo. Please try again.');
    }
  };

  const showImageOptions = () => {
    Alert.alert(
      'Profile Picture',
      'Choose an option',
      [
        { text: 'Camera', onPress: handleCamera },
        { text: 'Gallery', onPress: handleImagePicker },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!isRequired(name)) {
      newErrors.name = 'Name is required';
    }

    if (!isRequired(phoneNumber)) {
      newErrors.phoneNumber = 'Phone number is required';
    }

    if (!isRequired(email)) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await updateSession({
        personalInfo: {
          firstName: name.split(' ')[0] || name,
          lastName: name.split(' ').slice(1).join(' ') || '',
          email,
          dateOfBirth: '',
          gender: '',
          address: '',
          city: '',
          state: '',
          country: '',
          pin: '',
        },
        personalInfoCompleted: true,
      });

      router.push('/contact-info');
    } catch (error) {
      Alert.alert('Error', 'Failed to save information. Please try again.');
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
              We need to know more about you!
            </Text>

            {/* Profile Picture */}
            <TouchableOpacity
              style={styles.profilePictureContainer}
              onPress={showImageOptions}
              activeOpacity={0.7}
            >
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
              ) : (
                <View style={styles.profilePlaceholder}>
                  <Ionicons name="camera" size={32} color="#C8202F" />
                </View>
              )}
              <View style={styles.cameraIconBadge}>
                <Ionicons name="camera" size={16} color="#FFFFFF" />
              </View>
            </TouchableOpacity>

            {/* Form Fields */}
            <View style={styles.formFieldsContainer}>
              <FormField
                label="Name"
                value={name}
                onChangeText={setName}
                placeholder="Enter your full name"
                error={errors.name}
                fontFamily={fontFamilyRegular}
                autoCapitalize="words"
              />

              {/* Phone Number Field with Country Code */}
              <View style={styles.phoneFieldContainer}>
                <Text style={[styles.label, { fontFamily: fontFamilyRegular }, errors.phoneNumber && styles.labelError]}>
                  Phone Number
                </Text>
                <View style={[styles.phoneInputWrapper, errors.phoneNumber && styles.phoneInputWrapperError]}>
                  <View style={styles.countryCodeDisplay}>
                    <View style={styles.flagContainer}>
                      <Flag isoCode={selectedCountry.code} size={20} />
                    </View>
                    <Text style={[styles.callingCode, { fontFamily: fontFamilyRegular }]}>
                      +{selectedCountry.callingCode}
                    </Text>
                  </View>
                  <View style={styles.divider} />
                  <View style={styles.phoneNumberDisplay}>
                    <Text style={[
                      styles.phoneNumberText,
                      { fontFamily: fontFamilyRegular },
                      !phoneNumber && styles.phoneNumberPlaceholder
                    ]}>
                      {phoneNumber || 'Enter phone number'}
                    </Text>
                  </View>
                </View>
                {errors.phoneNumber && (
                  <Text style={[styles.errorText, { fontFamily: fontFamilyRegular }]}>{errors.phoneNumber}</Text>
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
                disabled={isLoading}
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
    alignItems: 'center',
    width: '100%',
  },
  formFieldsContainer: {
    width: '100%',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: Platform.OS === 'web' ? '600' : 'normal',
    color: '#000000',
    marginBottom: 32,
    textAlign: 'center',
  },
  profilePictureContainer: {
    position: 'relative',
    marginBottom: 32,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F5F5F5',
  },
  profilePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFE5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIconBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#C8202F',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
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
  },
  phoneInputWrapperError: {
    borderColor: '#FF3B30',
  },
  countryCodeDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  flagContainer: {
    marginRight: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  callingCode: {
    fontSize: 16,
    color: '#000000',
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: '#E5E5E5',
    marginHorizontal: 4,
  },
  phoneNumberDisplay: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
  },
  phoneNumberText: {
    fontSize: 16,
    color: '#000000',
  },
  phoneNumberPlaceholder: {
    color: '#999999',
  },
  errorText: {
    fontSize: 12,
    color: '#FF3B30',
    marginTop: 4,
    marginLeft: 4,
  },
});

