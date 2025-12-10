/**
 * TripDetailsScreen
 *
 * Install (Expo):
 *   expo install react-native-maps
 *   npm install @gorhom/bottom-sheet
 *   // Ensure peer deps are set up: react-native-gesture-handler, react-native-reanimated
 *   // If not already, wrap your root with GestureHandlerRootView and (optionally) BottomSheetModalProvider.
 *
 * Usage (Expo Router):
 *   - File is in app/trip-details.tsx
 *   - Navigate via router.push('/trip-details')
 *
 * Adjusting snap points:
 *   - Edit SNAP_POINTS below (percent strings). Index 0 = collapsed, 1 = mid, 2 = expanded.
 *   - Change INITIAL_INDEX to pick the default open height.
 */
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, StatusBar as RNStatusBar } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE, LatLng } from 'react-native-maps';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';

type TimelineStatus = 'completed' | 'current' | 'pending';

type TimelineItem = {
  id: string;
  title: string;
  subtitle: string;
  timestamp: string;
  status: TimelineStatus;
};

const SNAP_POINTS: (string | number)[] = ['35%', '60%', '90%'];
const INITIAL_INDEX = 0;
const timelineData: TimelineItem[] = [
  { id: '1', title: 'Start Trip', subtitle: 'On way to pickup.', timestamp: '18 May 10:13', status: 'completed' },
  { id: '2', title: 'Arrived at Pickup', subtitle: 'Reached at pickup point.', timestamp: '18 May 11:18', status: 'completed' },
  { id: '3', title: 'Cargo loading', subtitle: 'Loading onto vehicle.', timestamp: '18 May 12:30', status: 'current' },
  { id: '4', title: 'Dispatched', subtitle: 'Vehicle departed and en route.', timestamp: '19 May 15:18', status: 'pending' },
  { id: '5', title: 'Delivered', subtitle: 'Delivered at destination.', timestamp: '19 May 16:30', status: 'pending' },
];

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
  const sheetRef = useRef<BottomSheet>(null);
  const lastSheetIndexRef = useRef<number>(INITIAL_INDEX);
  const [sheetIndex, setSheetIndex] = useState<number>(INITIAL_INDEX);
  const [isMapFullScreen, setIsMapFullScreen] = useState(false);

  const snapPoints = useMemo(() => SNAP_POINTS, []);

  const initialRegion = useMemo(
    () => ({
      latitude: routeCoordinates[0].latitude,
      longitude: routeCoordinates[0].longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    }),
    []
  );

  const handleSheetChange = useCallback((index: number) => {
    setSheetIndex(index);
    lastSheetIndexRef.current = index;
  }, []);

  const enterFullScreen = useCallback(() => {
    lastSheetIndexRef.current = sheetIndex;
    sheetRef.current?.close(); // hides sheet
    setIsMapFullScreen(true);
  }, [sheetIndex]);

  const exitFullScreen = useCallback(() => {
    setIsMapFullScreen(false);
    const target = Number.isFinite(lastSheetIndexRef.current) ? lastSheetIndexRef.current : INITIAL_INDEX;
    sheetRef.current?.snapToIndex(target);
  }, []);

  const toggleMapMode = useCallback(() => {
    if (isMapFullScreen) {
      exitFullScreen();
    } else {
      enterFullScreen();
    }
  }, [enterFullScreen, exitFullScreen, isMapFullScreen]);

  const renderTimelineItem = useCallback(
    ({ item, index }: { item: TimelineItem; index: number }) => {
      const isLast = index === timelineData.length - 1;
      const isCompleted = item.status === 'completed' || item.status === 'current';
      const isCurrent = item.status === 'current';

      return (
        <View style={styles.timelineItem}>
          <View style={styles.timelineLeft}>
            <View
              style={[
                styles.timelineDot,
                isCompleted && styles.timelineDotCompleted,
                isCurrent && styles.timelineDotCurrent,
              ]}
            />
            {!isLast && <View style={[styles.timelineLine, isCompleted && styles.timelineLineCompleted]} />}
          </View>
          <View style={styles.timelineContent}>
            <View style={styles.timelineTextBlock}>
              <Text style={styles.timelineTitle}>{item.title}</Text>
              <Text style={styles.timelineSubtitle}>{item.subtitle}</Text>
            </View>
            <Text style={styles.timelineTimestamp}>{item.timestamp}</Text>
          </View>
        </View>
      );
    },
    []
  );

  return (
    <View style={styles.safeArea}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      {Platform.OS === 'android' && <RNStatusBar barStyle="dark-content" translucent backgroundColor="transparent" />}

      {/* Map always pinned behind */}
      <MapView
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
        scrollEnabled
        zoomEnabled
      >
        <Polyline coordinates={routeCoordinates} strokeColor="#C8202F" strokeWidth={4} />
        <Marker coordinate={routeCoordinates[routeCoordinates.length - 1]} title="Vehicle" description="En route" />
      </MapView>

      {/* Header over map */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace('/trips');
            }
          }}
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={22} color="#222222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trip Details</Text>
      </View>

      {/* Full-screen toggle */}
      <TouchableOpacity style={styles.expandButton} activeOpacity={0.8} onPress={toggleMapMode}>
        <Ionicons name={isMapFullScreen ? 'close' : 'expand'} size={20} color="#C8202F" />
      </TouchableOpacity>

      {/* Bottom sheet */}
      {!isMapFullScreen && (
        <BottomSheet
          ref={sheetRef}
          index={INITIAL_INDEX}
          snapPoints={snapPoints}
          onChange={handleSheetChange}
          enableOverDrag
          handleIndicatorStyle={styles.handleIndicator}
          backgroundStyle={styles.sheetBackground}
          style={styles.sheetContainer}
        >
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>Tracking history</Text>
          </View>
          <BottomSheetFlatList<TimelineItem>
            data={timelineData}
            keyExtractor={(item: TimelineItem) => item.id}
            renderItem={renderTimelineItem}
            contentContainerStyle={styles.timelineListContent}
            showsVerticalScrollIndicator={false}
          />
        </BottomSheet>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    position: 'absolute',
    top: Platform.select({ ios: 16, android: 24, default: 16 }),
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    zIndex: 3,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F4F4F4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    color: '#111111',
    fontWeight: Platform.OS === 'web' ? '600' : 'bold',
  },
  expandButton: {
    position: 'absolute',
    top: Platform.select({ ios: 16, android: 24, default: 16 }),
    right: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
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
  sheetContainer: {
    zIndex: 2,
  },
  sheetBackground: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  handleIndicator: {
    backgroundColor: '#D0D0D0',
    width: 48,
    height: 5,
    borderRadius: 3,
    alignSelf: 'center',
    marginTop: 8,
  },
  sheetHeader: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 8,
  },
  sheetTitle: {
    fontSize: 18,
    color: '#000000',
    fontWeight: Platform.OS === 'web' ? '700' : 'bold',
  },
  timelineListContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 14,
  },
  timelineLeft: {
    width: 32,
    alignItems: 'center',
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#C4C4C4',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  timelineDotCompleted: {
    backgroundColor: '#0BB870',
    borderColor: '#B7F1D8',
  },
  timelineDotCurrent: {
    backgroundColor: '#0BB870',
    borderColor: '#0BB870',
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#E0E0E0',
    marginTop: 6,
  },
  timelineLineCompleted: {
    backgroundColor: '#CDEEDC',
  },
  timelineContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  timelineTextBlock: {
    flexShrink: 1,
  },
  timelineTitle: {
    fontSize: 16,
    color: '#111111',
    fontWeight: Platform.OS === 'web' ? '600' : 'bold',
    marginBottom: 4,
  },
  timelineSubtitle: {
    fontSize: 13,
    color: '#6E6E6E',
  },
  timelineTimestamp: {
    fontSize: 12,
    color: '#555555',
    marginLeft: 8,
    flexShrink: 0,
  },
});
