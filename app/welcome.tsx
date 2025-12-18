import React from 'react';
import { View, StyleSheet, Text, ScrollView, Platform, Linking, StatusBar } from 'react-native';
import { Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { SupplyChain } from '@/components/SupplyChain';

export default function WelcomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

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

  const handleGetStarted = () => {
    router.push('/login');
  };

  const handleApiTest = () => {
    router.push('/api-test');
  };

  const handleTermsOfService = () => {
    // Navigate to terms of service screen or open URL
    Linking.openURL('https://example.com/terms');
  };

  const handlePrivacy = () => {
    // Navigate to privacy screen or open URL
    Linking.openURL('https://example.com/privacy');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView 
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom, 24) }
        ]}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Top Section - Graphic with light blue background (60% of screen) */}
        <View style={styles.graphicSection}>
          <SupplyChain width="100%" height={400} variant="hero" />
        </View>

        {/* Bottom Section - Content (40% of screen) */}
        <View style={styles.contentSection}>
          <View style={styles.textContainer}>
            <Text style={[styles.headline, { fontFamily: fontFamilySemiBold }]}>
              Track Trucks.{'\n'}
              Manage Drivers.{'\n'}
              Grow Business.
            </Text>
            
            <Text style={[styles.description, { fontFamily: fontFamilyRegular }]}>
              Simplify your logistics operations with tools to monitor fleet activity and boost performance
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={handleGetStarted}
              style={styles.button}
              buttonColor="#C8202F"
              textColor="#FFFFFF"
              labelStyle={styles.buttonLabel}
              contentStyle={styles.buttonContent}
            >
              Get Started
            </Button>

            <Button
              mode="outlined"
              onPress={handleApiTest}
              style={styles.secondaryButton}
              textColor="#C8202F"
            >
              API Test
            </Button>
          </View>

          <View style={styles.legalContainer}>
            <Text style={[styles.legalText, { fontFamily: fontFamilyRegular }]}>
              By continuing this, you accept the pickgo{' '}
              <Text 
                style={styles.linkText}
                onPress={handleTermsOfService}
              >
                Terms of Service
              </Text>
              {' '}and{' '}
              <Text 
                style={styles.linkText}
                onPress={handlePrivacy}
              >
                Privacy
              </Text>
            </Text>
          </View>
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
  },
  graphicSection: {
    width: '100%',
    minHeight: 400,
    backgroundColor: '#E6F4FE', // Light blue background
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  contentSection: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
  },
  textContainer: {
    marginBottom: 32,
  },
  headline: {
    fontSize: 28,
    fontWeight: Platform.OS === 'web' ? '600' : 'normal',
    fontStyle: 'normal',
    lineHeight: 36,
    letterSpacing: -0.5,
    color: '#000000',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666666',
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 24,
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
  legalContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  legalText: {
    fontSize: 12,
    lineHeight: 18,
    color: '#666666',
    textAlign: 'center',
  },
  linkText: {
    color: '#C8202F',
    textDecorationLine: 'underline',
    fontWeight: Platform.OS === 'web' ? '500' : 'normal',
  },
  secondaryButton: {
    width: '100%',
    height: 48,
    borderRadius: 12,
    marginTop: 12,
    borderColor: '#C8202F',
  },
});

