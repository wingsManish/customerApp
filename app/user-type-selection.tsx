import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  StatusBar,
  ScrollView,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { updateSession } from '@/services/sessionService';

type UserType = 'individual' | 'company';

export default function UserTypeSelectionScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedType, setSelectedType] = useState<UserType | null>(null);

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

  const handleContinue = async () => {
    if (!selectedType) return;

    // Save user type to session
    await updateSession({ userType: selectedType });

    // Navigate based on selection
    if (selectedType === 'individual') {
      router.push('/personal-info');
    } else {
      router.push('/company-details');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom, 32) },
        ]}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.content}>
          <Text style={[styles.title, { fontFamily: fontFamilySemiBold }]}>
            Choose Your Account Type
          </Text>

          <Text style={[styles.subtitle, { fontFamily: fontFamilyRegular }]}>
            Select the type of account you want to create
          </Text>

          {/* Individual Card */}
          <TouchableOpacity
            style={[
              styles.card,
              selectedType === 'individual' && styles.cardSelected,
            ]}
            onPress={() => setSelectedType('individual')}
            activeOpacity={0.7}
          >
            <View style={styles.cardContent}>
              <View style={[
                styles.iconContainer,
                selectedType === 'individual' && styles.iconContainerSelected,
              ]}>
                <Ionicons
                  name="person"
                  size={32}
                  color={selectedType === 'individual' ? '#FFFFFF' : '#C8202F'}
                />
              </View>
              <View style={styles.cardTextContainer}>
                <Text style={[styles.cardTitle, { fontFamily: fontFamilySemiBold }]}>
                  Individual
                </Text>
                <Text style={[styles.cardDescription, { fontFamily: fontFamilyRegular }]}>
                  For personal shipments and individual logistics needs
                </Text>
              </View>
              {selectedType === 'individual' && (
                <View style={styles.checkmark}>
                  <Ionicons name="checkmark-circle" size={24} color="#C8202F" />
                </View>
              )}
            </View>
          </TouchableOpacity>

          {/* Company Card */}
          <TouchableOpacity
            style={[
              styles.card,
              selectedType === 'company' && styles.cardSelected,
            ]}
            onPress={() => setSelectedType('company')}
            activeOpacity={0.7}
          >
            <View style={styles.cardContent}>
              <View style={[
                styles.iconContainer,
                selectedType === 'company' && styles.iconContainerSelected,
              ]}>
                <Ionicons
                  name="business"
                  size={32}
                  color={selectedType === 'company' ? '#FFFFFF' : '#C8202F'}
                />
              </View>
              <View style={styles.cardTextContainer}>
                <Text style={[styles.cardTitle, { fontFamily: fontFamilySemiBold }]}>
                  Company
                </Text>
                <Text style={[styles.cardDescription, { fontFamily: fontFamilyRegular }]}>
                  For businesses managing fleet operations and bulk shipments
                </Text>
              </View>
              {selectedType === 'company' && (
                <View style={styles.checkmark}>
                  <Ionicons name="checkmark-circle" size={24} color="#C8202F" />
                </View>
              )}
            </View>
          </TouchableOpacity>

          {/* Continue Button */}
          <TouchableOpacity
            style={[
              styles.button,
              !selectedType && styles.buttonDisabled,
            ]}
            onPress={handleContinue}
            disabled={!selectedType}
            activeOpacity={0.8}
          >
            <Text style={[styles.buttonText, { fontFamily: fontFamilySemiBold }]}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  content: {
    flex: 1,
    paddingTop: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: Platform.OS === 'web' ? '600' : 'normal',
    color: '#000000',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666666',
    marginBottom: 32,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    marginBottom: 16,
    overflow: 'hidden',
  },
  cardSelected: {
    borderColor: '#C8202F',
    backgroundColor: '#FFF5F5',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFE5E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconContainerSelected: {
    backgroundColor: '#C8202F',
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: Platform.OS === 'web' ? '600' : 'normal',
    color: '#000000',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666666',
  },
  checkmark: {
    marginLeft: 8,
  },
  button: {
    width: '100%',
    height: 56,
    backgroundColor: '#C8202F',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  buttonDisabled: {
    backgroundColor: '#E5E5E5',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: Platform.OS === 'web' ? '600' : 'normal',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
});

