import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { loadSvgFromAsset } from '@/utils/svgLoader';

const smallTruckSvg = require('@/assets/screen-asset/small-truck.svg');
const truckSvg = require('@/assets/screen-asset/truck.svg');
const horizontalArrowSvg = require('@/assets/screen-asset/horizontal-arrow.svg');
const distanceSvg = require('@/assets/screen-asset/distance.svg');
const clockSvg = require('@/assets/screen-asset/clock.svg');
const weightSvg = require('@/assets/screen-asset/weight.svg');
const dispatchedSvg = require('@/assets/screen-asset/Dispatched.svg');

interface TripCardProps {
  tripId: string;
  status: 'Active' | 'Pending' | 'Completed';
  pickupLocation: string;
  dropLocation: string;
  progressStatus?: string;
  vehicleType?: string;
  licensePlate?: string;
  driverName?: string;
  distance?: string;
  date?: string;
  weight?: string;
  onPress?: () => void;
  variant?: 'default' | 'trips'; // 'trips' variant for trips screen styling
}

export const TripCard: React.FC<TripCardProps> = ({
  tripId,
  status,
  pickupLocation,
  dropLocation,
  progressStatus = 'Dispatched',
  vehicleType,
  licensePlate,
  driverName,
  distance,
  date,
  weight,
  onPress,
  variant = 'default',
}) => {
  const [truckXml, setTruckXml] = useState<string>('');
  const [truckImageXml, setTruckImageXml] = useState<string>('');
  const [arrowXml, setArrowXml] = useState<string>('');
  const [distanceXml, setDistanceXml] = useState<string>('');
  const [clockXml, setClockXml] = useState<string>('');
  const [weightXml, setWeightXml] = useState<string>('');
  const [dispatchedXml, setDispatchedXml] = useState<string>('');

  useEffect(() => {
    const loadSvgs = async () => {
      const icons = [
        { source: smallTruckSvg, setter: setTruckXml },
        { source: truckSvg, setter: setTruckImageXml },
        { source: horizontalArrowSvg, setter: setArrowXml },
        { source: distanceSvg, setter: setDistanceXml },
        { source: clockSvg, setter: setClockXml },
        { source: weightSvg, setter: setWeightXml },
        { source: dispatchedSvg, setter: setDispatchedXml },
      ];

      for (const { source, setter } of icons) {
        if (Platform.OS === 'web') {
          // For web, we'll use Image component
          continue;
        }
        const svg = await loadSvgFromAsset(source);
        if (svg) {
          setter(svg);
        }
      }
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
    switch (status) {
      case 'Active':
        return '#E8F5E9';
      case 'Pending':
        return '#FFF9BA'; // Light yellow/cream from SVG
      case 'Completed':
        return '#E8F5E9'; // Same green as Active
      default:
        return '#F5F5F5';
    }
  };

  const getStatusTextColor = () => {
    switch (status) {
      case 'Active':
        return '#4CAF50';
      case 'Pending':
        return '#BBAB03'; // Darker yellow/brown from SVG
      case 'Completed':
        return '#4CAF50'; // Same green as Active
      default:
        return '#666666';
    }
  };

  const isTripsVariant = variant === 'trips';

  return (
    <TouchableOpacity 
      style={[
        styles.card, 
        isTripsVariant && styles.cardTrips
      ]} 
      onPress={onPress} 
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Text style={[styles.tripId, { fontFamily: fontFamilySemiBold }]}>#{tripId}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
          <Text style={[styles.statusText, { color: getStatusTextColor(), fontFamily: fontFamilySemiBold }]}>
            {status}
          </Text>
        </View>
      </View>

      <View style={styles.routeContainer}>
        <View style={styles.locationGroup}>
          <Text style={[styles.locationLabel, { fontFamily: fontFamilyRegular }]}>Pickup</Text>
          <Text style={[styles.locationText, { fontFamily: fontFamilySemiBold }]} numberOfLines={1}>
            {pickupLocation}
          </Text>
        </View>
        {Platform.OS === 'web' ? (
          <Image source={horizontalArrowSvg} style={styles.arrowIcon} contentFit="contain" />
        ) : (
          arrowXml ? <SvgXml xml={arrowXml} width={14} height={9} /> : null
        )}
        <View style={[styles.locationGroup, styles.locationGroupRight]}>
          <Text style={[styles.locationLabel, { fontFamily: fontFamilyRegular, textAlign: 'right' }]}>Drop</Text>
          <Text style={[styles.locationText, { fontFamily: fontFamilySemiBold, textAlign: 'right' }]} numberOfLines={1}>
            {dropLocation}
          </Text>
        </View>
      </View>

      {progressStatus && (
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[
              styles.progressLine,
              (status === 'Completed' || progressStatus === 'Delivered') && styles.progressLineCompleted
            ]} />
            <View style={styles.progressDot} />
            <View style={[
              styles.progressBadgeContainer,
              (status === 'Completed' || progressStatus === 'Delivered') && styles.progressBadgeContainerCompleted
            ]}>
              <View style={styles.progressBadge}>
                <Text style={[styles.progressBadgeText, { fontFamily: fontFamilySemiBold }]}>
                  {progressStatus}
                </Text>
              </View>
              <View style={styles.arrowDown} />
              <View style={styles.dispatchedIconContainer}>
                {Platform.OS === 'web' ? (
                  <Image source={dispatchedSvg} style={styles.dispatchedIcon} contentFit="contain" />
                ) : (
                  dispatchedXml ? <SvgXml xml={dispatchedXml} width={40} height={20} /> : null
                )}
              </View>
            </View>
            {!(status === 'Completed' || progressStatus === 'Delivered') && (
              <View style={[styles.progressDot, styles.progressDotEnd]} />
            )}
          </View>
        </View>
      )}

      <View style={styles.infoRow}>
        {licensePlate && (
          <View style={styles.vehicleInfo}>
            <View style={[
              styles.truckImage,
              isTripsVariant && styles.truckImageTrips
            ]}>
              {Platform.OS === 'web' ? (
                <Image 
                  source={truckSvg} 
                  style={[
                    styles.truckSvg,
                    isTripsVariant && styles.truckSvgTrips
                  ]} 
                  contentFit="cover" 
                />
              ) : (
                truckImageXml ? (
                  <SvgXml 
                    xml={truckImageXml} 
                    width={isTripsVariant ? 32 : 40} 
                    height={isTripsVariant ? 32 : 40} 
                  />
                ) : null
              )}
            </View>
            <View style={styles.licensePlate}>
              <View style={styles.countryBadge}>
                <Text style={[styles.countryCode, { fontFamily: fontFamilySemiBold }]}>TZA</Text>
              </View>
              <View style={styles.plateBadge}>
                <Text style={[styles.plateText, { fontFamily: fontFamilySemiBold }]}>{licensePlate}</Text>
              </View>
            </View>
          </View>
        )}
        {driverName && (
          <View style={styles.driverInfo}>
            <View style={styles.driverAvatar}>
              <Ionicons name="person" size={20} color="#C8202F" />
            </View>
            <View style={styles.driverTextContainer}>
              <Text style={[
                styles.driverLabel, 
                { fontFamily: fontFamilyRegular },
                isTripsVariant && styles.driverLabelTrips
              ]}>Driver</Text>
              <Text style={[styles.driverName, { fontFamily: fontFamilySemiBold }]}>
                {driverName.replace('Driver ', '')}
              </Text>
            </View>
          </View>
        )}
      </View>
      <View style={[
        styles.divider,
        isTripsVariant && styles.dividerTrips
      ]} />

      {isTripsVariant ? (
        // Trips variant: Conditional display based on status
        // Pending: Only datetime and km
        // Active/Completed: km, date, and tons (all three)
        status === 'Pending' ? (
          // Pending trips: Only datetime and km
          (date || distance) && (
            <View style={styles.detailsRow}>
              {date && (
                <View style={[styles.detailItem, styles.detailItemLeft]}>
                  {Platform.OS === 'web' ? (
                    <Image source={clockSvg} style={styles.detailIcon} contentFit="contain" />
                  ) : (
                    clockXml ? <SvgXml xml={clockXml} width={16} height={16} /> : null
                  )}
                  <Text style={[
                    styles.detailText, 
                    { fontFamily: fontFamilyRegular },
                    styles.detailTextTrips
                  ]}>{date}</Text>
                </View>
              )}
              {distance && (
                <View style={[styles.detailItem, styles.detailItemRight]}>
                  {Platform.OS === 'web' ? (
                    <Image source={distanceSvg} style={styles.detailIcon} contentFit="contain" />
                  ) : (
                    distanceXml ? <SvgXml xml={distanceXml} width={16} height={16} /> : null
                  )}
                  <Text style={[
                    styles.detailText, 
                    { fontFamily: fontFamilyRegular },
                    styles.detailTextTrips
                  ]}>{distance}</Text>
                </View>
              )}
            </View>
          )
        ) : (
          // Active/Completed trips: Show all three - km, date, and tons
          (distance || date || weight) && (
            <View style={styles.detailsRow}>
              {distance && (
                <View style={[styles.detailItem, styles.detailItemLeft]}>
                  {Platform.OS === 'web' ? (
                    <Image source={distanceSvg} style={styles.detailIcon} contentFit="contain" />
                  ) : (
                    distanceXml ? <SvgXml xml={distanceXml} width={16} height={16} /> : null
                  )}
                  <Text style={[
                    styles.detailText, 
                    { fontFamily: fontFamilyRegular },
                    styles.detailTextTrips
                  ]}>{distance}</Text>
                </View>
              )}
              {date && (
                <View style={[styles.detailItem, styles.detailItemCenter]}>
                  {Platform.OS === 'web' ? (
                    <Image source={clockSvg} style={styles.detailIcon} contentFit="contain" />
                  ) : (
                    clockXml ? <SvgXml xml={clockXml} width={16} height={16} /> : null
                  )}
                  <Text style={[
                    styles.detailText, 
                    { fontFamily: fontFamilyRegular },
                    styles.detailTextTrips
                  ]}>{date}</Text>
                </View>
              )}
              {weight && (
                <View style={[styles.detailItem, styles.detailItemRight]}>
                  {Platform.OS === 'web' ? (
                    <Image source={weightSvg} style={styles.detailIcon} contentFit="contain" />
                  ) : (
                    weightXml ? <SvgXml xml={weightXml} width={16} height={16} /> : null
                  )}
                  <Text style={[
                    styles.detailText, 
                    { fontFamily: fontFamilyRegular },
                    styles.detailTextTrips
                  ]}>{weight}</Text>
                </View>
              )}
            </View>
          )
        )
      ) : (
        // Default variant: Show all details with icons
        (distance || date || weight) && (
          <View style={styles.detailsRow}>
            {distance && (
              <View style={[styles.detailItem, styles.detailItemLeft]}>
                {Platform.OS === 'web' ? (
                  <Image source={distanceSvg} style={styles.detailIcon} contentFit="contain" />
                ) : (
                  distanceXml ? <SvgXml xml={distanceXml} width={16} height={16} /> : null
                )}
                <Text style={[
                  styles.detailText, 
                  { fontFamily: fontFamilyRegular }
                ]}>{distance}</Text>
              </View>
            )}
            {date && (
              <View style={[styles.detailItem, styles.detailItemCenter]}>
                {Platform.OS === 'web' ? (
                  <Image source={clockSvg} style={styles.detailIcon} contentFit="contain" />
                ) : (
                  clockXml ? <SvgXml xml={clockXml} width={16} height={16} /> : null
                )}
                <Text style={[
                  styles.detailText, 
                  { fontFamily: fontFamilyRegular }
                ]}>{date}</Text>
              </View>
            )}
            {weight && (
              <View style={[styles.detailItem, styles.detailItemRight]}>
                {Platform.OS === 'web' ? (
                  <Image source={weightSvg} style={styles.detailIcon} contentFit="contain" />
                ) : (
                  weightXml ? <SvgXml xml={weightXml} width={16} height={16} /> : null
                )}
                <Text style={[
                  styles.detailText, 
                  { fontFamily: fontFamilyRegular }
                ]}>{weight}</Text>
              </View>
            )}
          </View>
        )
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
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
  cardTrips: {
    borderRadius: 7.5,
    borderColor: '#EEEEEE',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  tripId: {
    fontSize: 14,
    fontWeight: Platform.OS === 'web' ? '600' : 'normal',
    color: '#C8202F',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
  },
  statusText: {
    fontSize: 11,
    fontWeight: Platform.OS === 'web' ? '600' : 'normal',
    lineHeight: 12,
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 40,
  },
  locationGroup: {
    flex: 1,
  },
  locationGroupRight: {
    alignItems: 'flex-end',
  },
  locationLabel: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 2,
  },
  locationText: {
    fontSize: 14,
    color: '#000000',
  },
  progressContainer: {
    marginBottom: 24,
    marginTop: 12,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E5E5E5',
    borderRadius: 2,
    position: 'relative',
    justifyContent: 'center',
  },
  progressLine: {
    position: 'absolute',
    left: 0,
    width: '33%',
    height: 4,
    backgroundColor: '#C8202F',
    borderRadius: 2,
  },
  progressLineCompleted: {
    width: '100%',
    backgroundColor: '#C8202F', // Keep red color as per design
  },
  progressDot: {
    position: 'absolute',
    left: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#C8202F',
    top: -2,
  },
  progressDotEnd: {
    left: 'auto',
    right: 0,
    backgroundColor: '#00695C',
  },
  progressBadgeContainer: {
    position: 'absolute',
    left: '25%',
    top: -48,
    alignItems: 'center',
    width: 80,
  },
  progressBadgeContainerCompleted: {
    left: 'auto',
    right: -20, // Move back 10px from endpoint, keeping truck icon slightly before the end
    alignItems: 'center',
    zIndex: 10, // Ensure truck container appears on top
  },
  progressBadge: {
    backgroundColor: '#000000',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 2,
    minWidth: 69,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBadgeText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: Platform.OS === 'web' ? '600' : 'normal',
    letterSpacing: 0.3,
  },
  arrowDown: {
    width: 0,
    height: 0,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 4,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#000000',
    marginBottom: 1,
  },
  dispatchedIconContainer: {
    width: 40,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 14,
    zIndex: 10, // Ensure truck SVG appears on top
  },
  dispatchedIcon: {
    width: 40,
    height: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  vehicleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  truckImage: {
    width: 40,
    height: 40,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    overflow: 'hidden',
  },
  truckImageTrips: {
    width: 32,
    height: 32,
    borderRadius: 8,
  },
  truckSvg: {
    width: 40,
    height: 40,
  },
  truckSvgTrips: {
    width: 32,
    height: 32,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 12,
  },
  dividerTrips: {
    backgroundColor: '#EAEAEA',
  },
  arrowIcon: {
    width: 14,
    height: 9,
  },
  detailIcon: {
    width: 16,
    height: 16,
  },
  licensePlate: {
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
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  driverAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  driverTextContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  driverLabel: {
    fontSize: 12,
    color: '#666666',
  },
  driverLabelTrips: {
    color: '#757575',
  },
  driverName: {
    fontSize: 12,
    color: '#000000',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 0,
    paddingHorizontal: 0,
    width: '100%',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  detailItemLeft: {
    justifyContent: 'flex-start',
  },
  detailItemCenter: {
    justifyContent: 'center',
  },
  detailItemRight: {
    justifyContent: 'flex-end',
  },
  detailText: {
    fontSize: 12,
    color: '#666666',
  },
  detailTextTrips: {
    color: '#757575',
  },
  progressTruckIcon: {
    width: 12,
    height: 12,
  },
});

