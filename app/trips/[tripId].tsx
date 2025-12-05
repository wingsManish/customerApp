import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SvgXml } from 'react-native-svg';
import { Image as ExpoImage } from 'expo-image';
import { loadSvgFromAsset } from '@/utils/svgLoader';

// SVG imports
const truckSvg = require('@/assets/screen-asset/truck.svg');
const smallTruckSvg = require('@/assets/screen-asset/small-truck.svg');

interface TripDetails {
  tripId: string;
  status: 'Active' | 'Pending' | 'Completed';
  pickupLocation: string;
  dropLocation: string;
  pickupAddress: string;
  dropAddress: string;
  driverName: string;
  driverImage?: string;
  driverPhone?: string;
  vehicleType: string;
  licensePlate: string;
  distance: string;
  date: string;
  weight: string;
  trackingStatus: {
    currentStep: string;
    currentStepDescription: string;
    steps: Array<{
      label: string;
      description: string;
      completed: boolean;
    }>;
  };
}

// Mock trip details data
const mockTripDetails: TripDetails = {
  tripId: 'JKL6481M6326',
  status: 'Active',
  pickupLocation: 'Dar es Salaam',
  dropLocation: 'Nairobi',
  pickupAddress: 'Warehouse pickup • Okopowa 11/72, 01-042 Warszawa',
  dropAddress: 'Warehouse pickup • Okopowa 11/72, 01-042 Warszawa',
  driverName: 'Arthur Shelby',
  driverPhone: '+255 123 456 789',
  vehicleType: 'Mercedes Actros',
  licensePlate: 'TZA T234 ABG',
  distance: '450km',
  date: '15 May, 10:45 AM',
  weight: '90 Tons',
  trackingStatus: {
    currentStep: 'Arrived at Pickup',
    currentStepDescription: 'Reached at pickup point.',
    steps: [
      {
        label: 'Start Trip',
        description: 'On way to pickup.',
        completed: true,
      },
      {
        label: 'Arrived at Pickup',
        description: 'Reached at pickup point.',
        completed: true,
      },
      {
        label: 'Cargo load',
        description: 'Loaded on',
        completed: false,
      },
    ],
  },
};

export default function TripDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ tripId?: string }>();
  const tripId = params.tripId || 'JKL6481M6326';
  
  const [tripDetails] = useState<TripDetails>(mockTripDetails);
  const [truckImageXml, setTruckImageXml] = useState<string>('');
  const [smallTruckXml, setSmallTruckXml] = useState<string>('');

  React.useEffect(() => {
    const loadSvgs = async () => {
      if (Platform.OS === 'web') {
        return;
      }
      const truck = await loadSvgFromAsset(truckSvg);
      const smallTruck = await loadSvgFromAsset(smallTruckSvg);
      if (truck) setTruckImageXml(truck);
      if (smallTruck) setSmallTruckXml(smallTruck);
    };
    loadSvgs();
  }, []);

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

  const getStatusColor = () => {
    switch (tripDetails.status) {
      case 'Active':
        return '#D1FBE8';
      case 'Pending':
        return '#FFF9BA';
      case 'Completed':
        return '#E8F5E9';
      default:
        return '#F5F5F5';
    }
  };

  const getStatusTextColor = () => {
    switch (tripDetails.status) {
      case 'Active':
        return '#089561';
      case 'Pending':
        return '#BBAB03';
      case 'Completed':
        return '#4CAF50';
      default:
        return '#666666';
    }
  };

  const handleCallDriver = () => {
    // Handle call action
    console.log('Call driver:', tripDetails.driverPhone);
  };

  const handleViewQuotation = () => {
    // Navigate to quotation
    console.log('View quotation for trip:', tripId);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { fontFamily: fontFamilySemiBold }]}>
          Trip Details
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Map View */}
        <View style={styles.mapContainer}>
          <View style={styles.mapPlaceholder}>
            <Text style={[styles.mapPlaceholderText, { fontFamily: fontFamilyRegular }]}>
              Map View
            </Text>
            <Text style={[styles.mapPlaceholderSubtext, { fontFamily: fontFamilyRegular }]}>
              Route visualization will be displayed here
            </Text>
            {/* Truck icon on map */}
            <View style={styles.mapTruckIcon}>
              {Platform.OS === 'web' ? (
                <ExpoImage source={smallTruckSvg} style={styles.mapTruckImage} contentFit="contain" />
              ) : (
                smallTruckXml ? (
                  <SvgXml xml={smallTruckXml} width={32} height={32} />
                ) : null
              )}
            </View>
          </View>
          <TouchableOpacity style={styles.mapExpandButton}>
            <Ionicons name="expand" size={20} color="#C8202F" />
          </TouchableOpacity>
        </View>

        {/* Driver Information */}
        <View style={styles.card}>
          <View style={styles.driverSection}>
            <View style={styles.driverInfo}>
              <Text style={[styles.sectionLabel, { fontFamily: fontFamilyRegular }]}>Driver</Text>
              <View style={styles.driverProfile}>
                <View style={styles.driverAvatar}>
                  <Ionicons name="person" size={32} color="#C8202F" />
                </View>
                <Text style={[styles.driverName, { fontFamily: fontFamilySemiBold }]}>
                  {tripDetails.driverName}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.callButton}
              onPress={handleCallDriver}
              activeOpacity={0.7}
            >
              <Ionicons name="call" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Shipping Info */}
        <View style={styles.card}>
          <View style={styles.shippingInfoRow}>
            <View style={styles.shippingInfo}>
              <Text style={[styles.sectionLabel, { fontFamily: fontFamilyRegular }]}>
                Shipping Info
              </Text>
              <Text style={[styles.shippingId, { fontFamily: fontFamilySemiBold }]}>
                {tripDetails.tripId}
              </Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
              <Text
                style={[
                  styles.statusText,
                  { color: getStatusTextColor(), fontFamily: fontFamilySemiBold },
                ]}
              >
                {tripDetails.status}
              </Text>
              <Ionicons name="chevron-down" size={16} color={getStatusTextColor()} />
            </View>
          </View>
        </View>

        {/* Origin and Destination */}
        <View style={styles.card}>
          <View style={styles.locationSection}>
            {/* Origin */}
            <View style={styles.locationItem}>
              <View style={[styles.locationIcon, styles.originIcon]}>
                <Ionicons name="business" size={20} color="#FFFFFF" />
              </View>
              <View style={styles.locationContent}>
                <Text style={[styles.locationTitle, { fontFamily: fontFamilySemiBold }]}>
                  {tripDetails.pickupLocation}
                </Text>
                <Text style={[styles.locationSubtitle, { fontFamily: fontFamilyRegular }]}>
                  {tripDetails.pickupAddress}
                </Text>
              </View>
            </View>

            {/* Connecting Line */}
            <View style={styles.connectingLine}>
              <View style={styles.dashedLine} />
            </View>

            {/* Destination */}
            <View style={styles.locationItem}>
              <View style={[styles.locationIcon, styles.destinationIcon]}>
                <Ionicons name="location" size={20} color="#FFFFFF" />
              </View>
              <View style={styles.locationContent}>
                <Text style={[styles.locationTitle, { fontFamily: fontFamilySemiBold }]}>
                  {tripDetails.dropLocation}
                </Text>
                <Text style={[styles.locationSubtitle, { fontFamily: fontFamilyRegular }]}>
                  {tripDetails.dropAddress}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Tracking Status */}
        <View style={styles.card}>
          <View style={styles.trackingHeader}>
            <Text style={[styles.sectionTitle, { fontFamily: fontFamilySemiBold }]}>
              Tracking Status
            </Text>
            <TouchableOpacity>
              <Text style={[styles.seeMoreText, { fontFamily: fontFamilyRegular }]}>
                See More
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.trackingProgress}>
            {/* Progress Line */}
            <View style={styles.progressLineContainer}>
              <View
                style={[
                  styles.progressLineFill,
                  {
                    width: `${(tripDetails.trackingStatus.steps.filter((s) => s.completed).length / tripDetails.trackingStatus.steps.length) * 100}%`,
                  },
                ]}
              />
              {/* Truck Icon on Progress */}
              <View
                style={[
                  styles.progressTruckIcon,
                  {
                    left: `${(tripDetails.trackingStatus.steps.filter((s) => s.completed).length / tripDetails.trackingStatus.steps.length) * 100}%`,
                  },
                ]}
              >
                {Platform.OS === 'web' ? (
                  <ExpoImage source={smallTruckSvg} style={styles.progressTruckImage} contentFit="contain" />
                ) : (
                  smallTruckXml ? (
                    <SvgXml xml={smallTruckXml} width={24} height={24} />
                  ) : null
                )}
              </View>
            </View>

            {/* Steps */}
            {tripDetails.trackingStatus.steps.map((step, index) => (
              <View key={index} style={styles.trackingStep}>
                <View
                  style={[
                    styles.stepDot,
                    step.completed && styles.stepDotCompleted,
                  ]}
                />
                <View style={styles.stepContent}>
                  <Text style={[styles.stepLabel, { fontFamily: fontFamilySemiBold }]}>
                    {step.label}
                  </Text>
                  <Text style={[styles.stepDescription, { fontFamily: fontFamilyRegular }]}>
                    {step.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Truck Details */}
        <View style={styles.card}>
          <Text style={[styles.sectionLabel, { fontFamily: fontFamilyRegular }]}>Truck</Text>
          <View style={styles.truckDetailsRow}>
            <View style={styles.truckImageContainer}>
              {Platform.OS === 'web' ? (
                <ExpoImage source={truckSvg} style={styles.truckImage} contentFit="contain" />
              ) : (
                truckImageXml ? (
                  <SvgXml xml={truckImageXml} width={60} height={40} />
                ) : (
                  <View style={styles.truckImagePlaceholder}>
                    <Ionicons name="car" size={32} color="#C8202F" />
                  </View>
                )
              )}
            </View>
            <View style={styles.truckInfo}>
              <Text style={[styles.truckName, { fontFamily: fontFamilySemiBold }]}>
                {tripDetails.vehicleType}
              </Text>
              <View style={styles.licensePlateContainer}>
                <View style={styles.countryBadge}>
                  <Text style={[styles.countryCode, { fontFamily: fontFamilySemiBold }]}>TZA</Text>
                </View>
                <View style={styles.plateBadge}>
                  <Text style={[styles.plateText, { fontFamily: fontFamilySemiBold }]}>
                    {tripDetails.licensePlate}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          style={styles.viewQuotationButton}
          onPress={handleViewQuotation}
          activeOpacity={0.8}
        >
          <Text style={[styles.viewQuotationText, { fontFamily: fontFamilySemiBold }]}>
            View Quotation
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    color: '#000000',
    textAlign: 'center',
    marginLeft: -28, // Offset for back button
  },
  headerSpacer: {
    width: 32,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  mapContainer: {
    height: 300,
    backgroundColor: '#E5E5E5',
    position: 'relative',
    marginBottom: 16,
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5E5E5',
  },
  mapPlaceholderText: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 4,
  },
  mapPlaceholderSubtext: {
    fontSize: 12,
    color: '#999999',
  },
  mapTruckIcon: {
    position: 'absolute',
    top: '50%',
    left: '60%',
    transform: [{ translateX: -16 }, { translateY: -16 }],
  },
  mapTruckImage: {
    width: 32,
    height: 32,
  },
  mapExpandButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    ...(Platform.OS === 'web' ? {
      boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
    } : {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
    }),
  },
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    ...(Platform.OS === 'web' ? {
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
    } : {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    }),
  },
  driverSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  driverInfo: {
    flex: 1,
  },
  sectionLabel: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 8,
  },
  driverProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  driverAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  driverName: {
    fontSize: 16,
    color: '#000000',
  },
  callButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#C8202F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shippingInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  shippingInfo: {
    flex: 1,
  },
  shippingId: {
    fontSize: 16,
    color: '#000000',
    marginTop: 4,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: Platform.OS === 'web' ? '600' : 'normal',
  },
  locationSection: {
    gap: 16,
  },
  locationItem: {
    flexDirection: 'row',
    gap: 12,
  },
  locationIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  originIcon: {
    backgroundColor: '#C8202F',
  },
  destinationIcon: {
    backgroundColor: '#00695C',
  },
  locationContent: {
    flex: 1,
  },
  locationTitle: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 4,
  },
  locationSubtitle: {
    fontSize: 12,
    color: '#666666',
  },
  connectingLine: {
    paddingLeft: 16,
    height: 20,
  },
  dashedLine: {
    width: 2,
    flex: 1,
    borderLeftWidth: 2,
    borderLeftColor: '#E5E5E5',
    borderStyle: 'dashed',
  },
  trackingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#000000',
  },
  seeMoreText: {
    fontSize: 14,
    color: '#C8202F',
  },
  trackingProgress: {
    gap: 16,
  },
  progressLineContainer: {
    height: 4,
    backgroundColor: '#E5E5E5',
    borderRadius: 2,
    position: 'relative',
    marginBottom: 8,
  },
  progressLineFill: {
    height: 4,
    backgroundColor: '#089561',
    borderRadius: 2,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  progressTruckIcon: {
    position: 'absolute',
    top: -10,
    transform: [{ translateX: -12 }],
  },
  progressTruckImage: {
    width: 24,
    height: 24,
  },
  trackingStep: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  stepDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#E5E5E5',
    marginTop: 2,
  },
  stepDotCompleted: {
    backgroundColor: '#089561',
  },
  stepContent: {
    flex: 1,
  },
  stepLabel: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 2,
  },
  stepDescription: {
    fontSize: 12,
    color: '#666666',
  },
  truckDetailsRow: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  truckImageContainer: {
    width: 80,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  truckImage: {
    width: 80,
    height: 60,
  },
  truckImagePlaceholder: {
    width: 80,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  truckInfo: {
    flex: 1,
  },
  truckName: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 8,
  },
  licensePlateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 24,
    borderRadius: 2,
    overflow: 'hidden',
  },
  countryBadge: {
    backgroundColor: '#134CCF',
    paddingHorizontal: 6,
    paddingVertical: 4,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countryCode: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: Platform.OS === 'web' ? '700' : 'bold',
    lineHeight: 12,
  },
  plateBadge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderColor: '#134CCF',
  },
  plateText: {
    fontSize: 12,
    color: '#000000',
    fontWeight: Platform.OS === 'web' ? '600' : 'normal',
    lineHeight: 14,
    letterSpacing: 0.5,
  },
  bottomSpacing: {
    height: 20,
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  viewQuotationButton: {
    backgroundColor: '#FFF5F5',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#C8202F',
  },
  viewQuotationText: {
    fontSize: 16,
    color: '#C8202F',
    fontWeight: Platform.OS === 'web' ? '600' : 'normal',
  },
});

