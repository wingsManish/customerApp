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
import MapView, { Marker, Polyline, PROVIDER_GOOGLE, LatLng } from 'react-native-maps';
import { loadSvgFromAsset } from '@/utils/svgLoader';

// SVG imports
const truckSvg = require('@/assets/screen-asset/truck.svg');
const callButtonSvg = require('@/assets/screen-asset/callButton.svg');
const dashedLineSvg = require('@/assets/screen-asset/dashed-line.svg');
const trackingTruckSvg = require('@/assets/screen-asset/tracking-truck.svg');
const trackingStatusLineSvg = require('@/assets/screen-asset/tracking-status-line.svg');
const trackingStatusLine2Svg = require('@/assets/screen-asset/tracking-status-line2.svg');
const greenDotSvg = require('@/assets/screen-asset/green-dot.svg');

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
    steps: {
      label: string;
      description: string;
      completed: boolean;
    }[];
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

const routeCoordinates: LatLng[] = [
  { latitude: -6.7924, longitude: 39.2083 },
  { latitude: -6.7900, longitude: 39.2105 },
  { latitude: -6.7881, longitude: 39.2120 },
  { latitude: -6.7855, longitude: 39.2142 },
  { latitude: -6.7830, longitude: 39.2178 },
  { latitude: -6.7812, longitude: 39.2210 },
];

export default function TripDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ tripId?: string }>();
  const tripId = params.tripId || 'JKL6481M6326';
  
  const [tripDetails] = useState<TripDetails>(mockTripDetails);
  const [truckImageXml, setTruckImageXml] = useState<string>('');
  const [callButtonXml, setCallButtonXml] = useState<string>('');
  const [dashedLineXml, setDashedLineXml] = useState<string>('');
  const [trackingTruckXml, setTrackingTruckXml] = useState<string>('');
  const [trackingStatusLineXml, setTrackingStatusLineXml] = useState<string>('');
  const [trackingStatusLine2Xml, setTrackingStatusLine2Xml] = useState<string>('');
  const [greenDotXml, setGreenDotXml] = useState<string>('');
  const [isMapFullScreen, setIsMapFullScreen] = useState(false);

  React.useEffect(() => {
    const loadSvgs = async () => {
      if (Platform.OS === 'web') {
        return;
      }
      const truck = await loadSvgFromAsset(truckSvg);
      const callButton = await loadSvgFromAsset(callButtonSvg);
      const dashedLine = await loadSvgFromAsset(dashedLineSvg);
      const trackingTruck = await loadSvgFromAsset(trackingTruckSvg);
      const trackingStatusLine = await loadSvgFromAsset(trackingStatusLineSvg);
      const trackingStatusLine2 = await loadSvgFromAsset(trackingStatusLine2Svg);
      const greenDot = await loadSvgFromAsset(greenDotSvg);
      if (truck) setTruckImageXml(truck);
      if (callButton) setCallButtonXml(callButton);
      if (dashedLine) setDashedLineXml(dashedLine);
      if (trackingTruck) setTrackingTruckXml(trackingTruck);
      if (trackingStatusLine) setTrackingStatusLineXml(trackingStatusLine);
      if (trackingStatusLine2) setTrackingStatusLine2Xml(trackingStatusLine2);
      if (greenDot) setGreenDotXml(greenDot);
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

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/trips');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleBack}
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={20} color="#222222" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { fontFamily: fontFamilySemiBold }]}>
          Trip Details
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Map View */}
        <View style={styles.mapContainer}>
          <MapView
            style={StyleSheet.absoluteFill}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: routeCoordinates[0].latitude,
              longitude: routeCoordinates[0].longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
            scrollEnabled
            zoomEnabled
          >
            <Polyline coordinates={routeCoordinates} strokeColor="#C8202F" strokeWidth={4} />
            <Marker
              coordinate={routeCoordinates[routeCoordinates.length - 1]}
              title="Vehicle"
              description="En route"
            />
          </MapView>
          <TouchableOpacity style={styles.mapExpandButton} onPress={() => setIsMapFullScreen(true)}>
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
              {Platform.OS === 'web' ? (
                <ExpoImage source={callButtonSvg} style={styles.callButtonImage} contentFit="contain" />
              ) : (
                callButtonXml ? (
                  <SvgXml xml={callButtonXml} width={40} height={40} />
                ) : null
              )}
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
            <View style={styles.statusContainer}>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
                <Text
                  style={[
                    styles.statusText,
                    { color: getStatusTextColor(), fontFamily: fontFamilySemiBold },
                  ]}>
                  {tripDetails.status}
                </Text>
              </View>
              <TouchableOpacity style={styles.statusDropdownButton}>
                <Ionicons name="chevron-down" size={16} color="#000000" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Origin and Destination */}
        <View style={styles.card}>
          <View style={styles.locationSection}>
            {/* Origin */}
            <View style={styles.locationItem}>
              <View style={styles.locationIconWrapper}>
                <View style={[styles.locationIconCircle, styles.locationIconCircleRed]}>
                  <Ionicons name="business" size={20} color="#FFFFFF" />
                </View>
              </View>
              <View style={styles.locationContent}>
                <Text style={[styles.locationTitle, { fontFamily: fontFamilySemiBold }]} numberOfLines={1}>
                  {tripDetails.pickupLocation}
                </Text>
                <Text style={[styles.locationSubtitle, { fontFamily: fontFamilyRegular }]} numberOfLines={2}>
                  {tripDetails.pickupAddress}
                </Text>
              </View>
            </View>

            {/* Connecting Line */}
            <View style={styles.connectingLine}>
              {Platform.OS === 'web' ? (
                <ExpoImage 
                  source={dashedLineSvg} 
                  style={styles.dashedLineImage} 
                  contentFit="contain"
                  contentPosition="left center"
                />
              ) : (
                dashedLineXml ? (
                  <SvgXml xml={dashedLineXml} width={1} height={56} />
                ) : (
                  <View style={styles.dashedLineFallback} />
                )
              )}
            </View>

            {/* Destination */}
            <View style={styles.locationItem}>
              <View style={styles.locationIconWrapper}>
                <View style={[styles.locationIconCircle, styles.locationIconCircleTeal]}>
                  <Ionicons name="location" size={20} color="#FFFFFF" />
                </View>
              </View>
              <View style={styles.locationContent}>
                <Text style={[styles.locationTitle, { fontFamily: fontFamilySemiBold }]} numberOfLines={1}>
                  {tripDetails.dropLocation}
                </Text>
                <Text style={[styles.locationSubtitle, { fontFamily: fontFamilyRegular }]} numberOfLines={2}>
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
            <TouchableOpacity onPress={() => router.push(`/trips/${tripId}/tracking-history`)}>
              <Text style={[styles.seeMoreText, { fontFamily: fontFamilyRegular }]}>
                See More
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.trackingProgress}>
            {/* Progress Line with Steps */}
            <View style={styles.progressLineWrapper}>
              {/* Progress Line Container */}
              <View style={styles.progressLineContainer}>
                {/* Calculate completed segments */}
                {(() => {
                  const completedCount = tripDetails.trackingStatus.steps.filter(s => s.completed).length;
                  const totalSteps = tripDetails.trackingStatus.steps.length;
                  // Position dots at start (0%), middle (50%), end (100%) for 3 steps
                  const stepPositions = totalSteps > 1 
                    ? tripDetails.trackingStatus.steps.map((_, i) => (i / (totalSteps - 1)) * 100)
                    : [0];
                  
                  return (
                    <>
                      {/* Step Dots positioned absolutely */}
                      {tripDetails.trackingStatus.steps.map((step, index) => (
                        <View
                          key={`dot-${index}`}
                          style={[
                            styles.stepDotAbsolute,
                            {
                              left: `${stepPositions[index]}%`,
                              transform: [{ translateX: -5.5 }], // Center the 11px dot
                            },
                          ]}
                        >
                          {step.completed ? (
                            Platform.OS === 'web' ? (
                              <ExpoImage source={greenDotSvg} style={styles.greenDotImage} contentFit="contain" />
                            ) : (
                              greenDotXml ? (
                                <SvgXml xml={greenDotXml} width={11} height={11} />
                              ) : (
                                <View style={[styles.stepCircle, styles.stepCircleCompleted]} />
                              )
                            )
                          ) : (
                            <View style={[styles.stepCircle, styles.stepCircleUpcoming]} />
                          )}
                        </View>
                      ))}
                      
                      {/* Completed Progress Line - connects completed dots (need at least 2 dots to have a line) */}
                      {completedCount >= 2 && (
                        <View
                          style={[
                            styles.progressLineCompleted,
                            {
                              left: `${stepPositions[0]}%`,
                              width: `${stepPositions[completedCount - 1] - stepPositions[0]}%`,
                            },
                          ]}
                        />
                      )}
                      
                      {/* Dashed Progress Line for remaining */}
                      {completedCount < totalSteps && completedCount > 0 && (
                        <View
                          style={[
                            styles.progressLineDashed,
                            {
                              left: `${stepPositions[completedCount - 1]}%`,
                              width: `${stepPositions[totalSteps - 1] - stepPositions[completedCount - 1]}%`,
                            },
                          ]}
                        >
                          {Platform.OS === 'web' ? (
                            <ExpoImage 
                              source={trackingStatusLine2Svg} 
                              style={styles.trackingDashedLineImage} 
                              contentFit="fill"
                            />
                          ) : (
                            trackingStatusLine2Xml ? (
                              <SvgXml xml={trackingStatusLine2Xml} width="100%" height={2} />
                            ) : (
                              <View style={styles.trackingDashedLineFallback} />
                            )
                          )}
                        </View>
                      )}
                      
                      {/* Truck Icon positioned at the end of completed steps */}
                      {completedCount > 0 && completedCount < totalSteps && (
                        <View
                          style={[
                            styles.progressTruckIcon,
                            {
                              left: `${stepPositions[completedCount - 1]}%`,
                              transform: [{ translateX: -20 }],
                            },
                          ]}
                        >
                          {Platform.OS === 'web' ? (
                            <ExpoImage source={trackingTruckSvg} style={styles.progressTruckImage} contentFit="contain" />
                          ) : (
                            trackingTruckXml ? (
                              <SvgXml xml={trackingTruckXml} width={40} height={20} />
                            ) : null
                          )}
                        </View>
                      )}
                    </>
                  );
                })()}
              </View>

              {/* Steps Below Progress Line */}
              <View style={styles.stepsContainer}>
                {tripDetails.trackingStatus.steps.map((step, index) => {
                  const totalSteps = tripDetails.trackingStatus.steps.length;
                  const isLastStep = index === totalSteps - 1;
                  
                  return (
                    <View 
                      key={index} 
                      style={[
                        styles.trackingStep,
                        isLastStep && styles.trackingStepLast
                      ]}
                    >
                      {/* Step Content - dots are positioned absolutely above */}
                      <View style={[
                        styles.stepContent,
                        isLastStep && styles.stepContentLast
                      ]}>
                        <Text style={[
                          styles.stepLabel, 
                          { fontFamily: fontFamilySemiBold },
                          isLastStep && styles.stepLabelLast
                        ]}>
                          {step.label}
                        </Text>
                        <Text style={[
                          styles.stepDescription, 
                          { fontFamily: fontFamilyRegular },
                          isLastStep && styles.stepDescriptionLast
                        ]}>
                          {step.description}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </View>

        {/* Truck Details */}
        <View style={styles.card}>
          <View style={styles.truckDetailsRow}>
            <View style={styles.truckImageContainer}>
              {Platform.OS === 'web' ? (
                <ExpoImage source={truckSvg} style={styles.truckImage} contentFit="cover" />
              ) : (
                truckImageXml ? (
                  <SvgXml xml={truckImageXml} width={60} height={60} />
                ) : (
                  <View style={styles.truckImagePlaceholder}>
                    <Ionicons name="car" size={32} color="#C8202F" />
                  </View>
                )
              )}
            </View>
            <View style={styles.truckInfo}>
              <Text style={[styles.truckLabel, { fontFamily: fontFamilyRegular }]}>Truck</Text>
              <Text style={[styles.truckName, { fontFamily: fontFamilySemiBold }]}>
                {tripDetails.vehicleType}
              </Text>
            </View>
            <View style={styles.licensePlateContainer}>
              <View style={styles.countryBadge}>
                <Text style={[styles.countryCode, { fontFamily: fontFamilySemiBold }]}>TZA</Text>
              </View>
              <View style={styles.plateBadge}>
                <Text style={[styles.plateText, { fontFamily: fontFamilySemiBold }]}>
                  {tripDetails.licensePlate.replace('TZA ', '')}
                </Text>
              </View>
            </View>
          </View>
        </View>

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

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {isMapFullScreen && (
        <View style={styles.fullscreenMapOverlay}>
          <MapView
            style={StyleSheet.absoluteFill}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: routeCoordinates[0].latitude,
              longitude: routeCoordinates[0].longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
            scrollEnabled
            zoomEnabled
          >
            <Polyline coordinates={routeCoordinates} strokeColor="#C8202F" strokeWidth={4} />
            <Marker
              coordinate={routeCoordinates[routeCoordinates.length - 1]}
              title="Vehicle"
              description="En route"
            />
          </MapView>
          <TouchableOpacity
            style={styles.fullscreenCloseButton}
            onPress={() => setIsMapFullScreen(false)}
            activeOpacity={0.8}
          >
            <Ionicons name="close" size={20} color="#C8202F" />
          </TouchableOpacity>
        </View>
      )}
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
    height: 66,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    color: '#222222',
    fontWeight: Platform.OS === 'web' ? '600' : 'normal',
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
  fullscreenMapOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    zIndex: 10,
  },
  fullscreenCloseButton: {
    position: 'absolute',
    top: Platform.select({ ios: 20, android: 28, default: 20 }),
    right: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    ...(Platform.OS === 'web'
      ? { boxShadow: '0px 4px 12px rgba(0,0,0,0.15)' }
      : {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 6,
          elevation: 6,
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
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  callButtonImage: {
    width: 40,
    height: 40,
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
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: Platform.OS === 'web' ? '600' : 'normal',
  },
  statusDropdownButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationSection: {
    flexDirection: 'column',
    width: '100%',
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 0,
  },
  locationIconWrapper: {
    width: 41,
    height: 41,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  locationIconCircle: {
    width: 41,
    height: 41,
    borderRadius: 20.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationIconCircleRed: {
    backgroundColor: '#C8202F',
  },
  locationIconCircleTeal: {
    backgroundColor: '#1A6B6B',
  },
  locationContent: {
    flex: 1,
    flexShrink: 1,
    paddingTop: 2,
  },
  locationTitle: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 4,
    fontWeight: Platform.OS === 'web' ? '600' : 'normal',
  },
  locationSubtitle: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  connectingLine: {
    height: 56,
    alignItems: 'center',
    paddingLeft: 0,
    marginLeft: 20.5,
    justifyContent: 'center',
    width: 1,
  },
  dashedLineImage: {
    width: 1,
    height: 56,
    alignSelf: 'center',
    marginLeft: 0,
    ...(Platform.OS === 'web' && {
      objectPosition: 'center top',
      left: 0,
      position: 'relative',
    }),
  },
  dashedLineFallback: {
    width: 1,
    height: 56,
    backgroundColor: '#D0D0D0',
    opacity: 0.5,
  },
  trackingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#000000',
  },
  seeMoreText: {
    fontSize: 14,
    color: '#C8202F',
  },
  trackingProgress: {
    gap: 0,
  },
  progressLineWrapper: {
    position: 'relative',
    paddingVertical: 20,
    paddingHorizontal: 0,
  },
  progressLineContainer: {
    height: 2,
    backgroundColor: '#CDCDCD',
    borderRadius: 1,
    position: 'relative',
    marginBottom: 32,
    width: '100%',
  },
  stepDotAbsolute: {
    position: 'absolute',
    top: -5.5, // Center the dot on the line (11px dot / 2 = 5.5px)
    zIndex: 5,
  },
  progressLineCompleted: {
    height: 2,
    backgroundColor: '#00C26D',
    borderRadius: 1,
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },
  progressLineDashed: {
    height: 2,
    position: 'absolute',
    top: 0,
    overflow: 'hidden',
    zIndex: 1,
  },
  trackingDashedLineImage: {
    width: '100%',
    height: 2,
  },
  trackingDashedLineFallback: {
    width: '100%',
    height: 2,
    backgroundColor: '#CDCDCD',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#CDCDCD',
  },
  progressTruckIcon: {
    position: 'absolute',
    top: -10,
    zIndex: 10,
  },
  progressTruckImage: {
    width: 40,
    height: 20,
  },
  stepsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 0,
    marginTop: 0,
    position: 'relative',
  },
  trackingStep: {
    alignItems: 'flex-start',
    paddingRight: 8,
    flexShrink: 1,
  },
  trackingStepLast: {
    marginLeft: 'auto',
    paddingRight: 0,
    alignItems: 'flex-end',
  },
  greenDotImage: {
    width: 11,
    height: 11,
  },
  stepCircle: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCircleCompleted: {
    backgroundColor: '#00C26D',
    borderColor: '#C9F8E3',
  },
  stepCircleUpcoming: {
    backgroundColor: '#A7A7A7',
    borderColor: '#E1E1E1',
  },
  stepContent: {
    alignItems: 'flex-start',
    width: '100%',
  },
  stepContentLast: {
    alignItems: 'flex-end',
  },
  stepLabel: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 4,
    textAlign: 'left',
    fontWeight: Platform.OS === 'web' ? '600' : 'normal',
  },
  stepLabelLast: {
    textAlign: 'right',
  },
  stepDescription: {
    fontSize: 12,
    color: '#757575',
    textAlign: 'left',
    lineHeight: 16,
  },
  stepDescriptionLast: {
    textAlign: 'right',
  },
  truckDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  truckImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginRight: 12,
  },
  truckImage: {
    width: 60,
    height: 60,
  },
  truckImagePlaceholder: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  truckInfo: {
    flex: 1,
  },
  truckLabel: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  truckName: {
    fontSize: 16,
    color: '#000000',
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
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
    marginTop: 20,
  },
  viewQuotationButton: {
    backgroundColor: '#FEF2F2',
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
