import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Platform,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SvgXml } from 'react-native-svg';
import { Image as ExpoImage } from 'expo-image';
import { loadSvgFromAsset } from '@/utils/svgLoader';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const HEADER_HEIGHT = 66; // Header height (approx) excluding safe-area
const BOTTOM_SHEET_MIN_HEIGHT = 200;
const ESTIMATED_CONTENT_HEIGHT = 600; // Drag handle (24) + title (50) + ~5 items

// SVG imports
const greenDotSvg = require('@/assets/screen-asset/green-dot.svg');
const dashedLineSvg = require('@/assets/screen-asset/dashed-line.svg');
const smallTruckSvg = require('@/assets/screen-asset/small-truck.svg');
const fullScreenSvg = require('@/assets/screen-asset/full-screen.svg');

interface TrackingStep {
  label: string;
  description: string;
  timestamp: string;
  completed: boolean;
}

// Mock tracking history data
const mockTrackingHistory: TrackingStep[] = [
  {
    label: 'Start Trip',
    description: 'On way to pickup.',
    timestamp: '18 May 10:13',
    completed: true,
  },
  {
    label: 'Arrived at Pickup',
    description: 'Reached at pickup point.',
    timestamp: '18 May 11:18',
    completed: true,
  },
  {
    label: 'Cargo loading',
    description: 'Loading onto vehicle.',
    timestamp: '18 May 12:30',
    completed: false,
  },
  {
    label: 'Dispatched',
    description: 'Vehicle departed and en route.',
    timestamp: '19 May 15:18',
    completed: false,
  },
  {
    label: 'Delivered',
    description: 'Delivered at destination.',
    timestamp: '19 May 16:30',
    completed: false,
  },
];

export default function TrackingHistoryScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ tripId?: string }>();
  const tripId = params.tripId || 'JKL6481M6326';
  
  const [trackingHistory] = useState<TrackingStep[]>(mockTrackingHistory);
  const [greenDotXml, setGreenDotXml] = useState<string>('');
  const [dashedLineXml, setDashedLineXml] = useState<string>('');
  const [smallTruckXml, setSmallTruckXml] = useState<string>('');
  const [fullScreenXml, setFullScreenXml] = useState<string>('');

  const translateY = useRef(new Animated.Value(0)).current;
  const currentTranslateRef = useRef(0);
  const lastSnap = useRef(0); // 0 = collapsed; negative = expanded

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only respond to vertical gestures
        return Math.abs(gestureState.dy) > Math.abs(gestureState.dx) && Math.abs(gestureState.dy) > 5;
      },
      onPanResponderTerminationRequest: () => false, // Don't allow parent to take over
      onPanResponderGrant: () => {
        // no-op; we keep a single animated value
      },
      onPanResponderMove: (_, gestureState) => {
        const maxTranslate = minTranslate;
        const clamped = Math.max(maxTranslate, Math.min(0, lastSnap.current + gestureState.dy));
        translateY.setValue(clamped);
        currentTranslateRef.current = clamped;
      },
      onPanResponderRelease: (_, gestureState) => {
        const maxTranslate = minTranslate;
        const currentValue = currentTranslateRef.current;
        const midPoint = maxTranslate / 2;

        let targetValue = 0;
        if (gestureState.dy < -50 || (currentValue < midPoint && gestureState.vy < -0.5)) {
          targetValue = maxTranslate; // expand
        } else if (gestureState.dy > 50 || (currentValue > midPoint && gestureState.vy > 0.5)) {
          targetValue = 0; // collapse
        } else {
          targetValue = currentValue < midPoint ? maxTranslate : 0; // snap nearest
        }

        lastSnap.current = targetValue;
        currentTranslateRef.current = targetValue;
        Animated.spring(translateY, {
          toValue: targetValue,
          useNativeDriver: false,
          tension: 45,
          friction: 10,
        }).start();
      },
    })
  ).current;

  React.useEffect(() => {
    const loadSvgs = async () => {
      if (Platform.OS === 'web') {
        return;
      }
      const greenDot = await loadSvgFromAsset(greenDotSvg);
      const dashedLine = await loadSvgFromAsset(dashedLineSvg);
      const smallTruck = await loadSvgFromAsset(smallTruckSvg);
      const fullScreen = await loadSvgFromAsset(fullScreenSvg);
      if (greenDot) setGreenDotXml(greenDot);
      if (dashedLine) setDashedLineXml(dashedLine);
      if (smallTruck) setSmallTruckXml(smallTruck);
      if (fullScreen) setFullScreenXml(fullScreen);
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

  // Compute sheet heights relative to safe area to avoid overshooting header/nav
  const maxSheetHeight = Math.min(
    Math.max(ESTIMATED_CONTENT_HEIGHT, SCREEN_HEIGHT * 0.45),
    SCREEN_HEIGHT - (insets.top + HEADER_HEIGHT) - 32
  );
  const minSheetHeight = BOTTOM_SHEET_MIN_HEIGHT;
  // Ensure top never goes above a minimal padding (safe top + header)
  const minTop = insets.top + HEADER_HEIGHT + 16;
  const translateLimitByTop = minTop - (SCREEN_HEIGHT - maxSheetHeight); // negative or zero
  const translateLimitByHeight = -(maxSheetHeight - minSheetHeight);
  const minTranslate = Math.max(translateLimitByTop, translateLimitByHeight); // less negative wins

  const clampedTranslate = translateY.interpolate({
    inputRange: [minTranslate, 0],
    outputRange: [minTranslate, 0],
    extrapolate: 'clamp',
  });

  const bottomSheetStyle = {
    height: maxSheetHeight,
    transform: [{ translateY: clampedTranslate }],
  };

  // Position full-screen button just above the drag handle
  // Bottom sheet top = height - translateY (since translateY moves it up when negative)
  // Button bottom = height - translateY + gap
  const sheetHeight = translateY.interpolate({
    inputRange: [minTranslate, 0],
    outputRange: [maxSheetHeight, minSheetHeight],
    extrapolate: 'clamp',
  });
  const fullScreenButtonStyle = {
    bottom: Animated.add(
      Animated.add(sheetHeight, Animated.multiply(translateY, -1)), // height - translateY
      new Animated.Value(16) // Add 16px gap
    ),
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/trips');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Full Screen Map */}
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
        <Animated.View style={[styles.mapExpandButton, fullScreenButtonStyle]}>
          <TouchableOpacity>
            {Platform.OS === 'web' ? (
              <ExpoImage source={fullScreenSvg} style={styles.fullScreenImage} contentFit="contain" />
            ) : (
              fullScreenXml ? (
                <SvgXml xml={fullScreenXml} width={54} height={54} />
              ) : (
                <Ionicons name="expand" size={20} color="#C8202F" />
              )
            )}
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Header - Overlay on Map - Always on top */}
      <SafeAreaView style={styles.headerContainer} edges={['top']} pointerEvents="box-none">
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
      </SafeAreaView>

      {/* Draggable Bottom Sheet */}
      <SafeAreaView edges={['bottom']} style={styles.bottomSheetSafeArea} pointerEvents="box-none">
        <Animated.View
          style={[styles.bottomSheet, bottomSheetStyle]}
        >
          {/* Drag Handle - Only this area should be draggable */}
          <View 
            style={styles.dragHandle} 
            {...panResponder.panHandlers}
            hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
          >
            <View style={styles.dragHandleBar} />
          </View>

          {/* Timeline Title */}
          <View style={styles.timelineHeader}>
            <Text style={[styles.timelineTitle, { fontFamily: fontFamilySemiBold }]}>
              Tracking history3
            </Text>
          </View>

          {/* Timeline Content */}
          <ScrollView
            style={styles.timelineScrollView}
            contentContainerStyle={styles.timelineContent}
            showsVerticalScrollIndicator={false}
          >
            {trackingHistory.map((step, index) => {
              const isLast = index === trackingHistory.length - 1;
              const isCompleted = step.completed;
              const nextStepCompleted = index < trackingHistory.length - 1 
                ? trackingHistory[index + 1].completed 
                : false;
              // Show solid green line only if both current and next steps are completed
              const showSolidLine = isCompleted && nextStepCompleted;
              
              return (
                <View key={index} style={styles.timelineItem}>
                  {/* Left side - Dot and Line */}
                  <View style={styles.timelineLeft}>
                    {/* Dot */}
                    <View style={styles.timelineDotContainer}>
                      {isCompleted ? (
                        Platform.OS === 'web' ? (
                          <ExpoImage source={greenDotSvg} style={styles.greenDotImage} contentFit="contain" />
                        ) : (
                          greenDotXml ? (
                            <SvgXml xml={greenDotXml} width={11} height={11} />
                          ) : (
                            <View style={[styles.timelineDot, styles.timelineDotCompleted]} />
                          )
                        )
                      ) : (
                        <View style={[styles.timelineDot, styles.timelineDotUpcoming]} />
                      )}
                    </View>
                    
                    {/* Vertical Line */}
                    {!isLast && (
                      <View style={styles.timelineLineContainer}>
                        {showSolidLine ? (
                          <View style={styles.timelineLineCompleted} />
                        ) : (
                          Platform.OS === 'web' ? (
                            <ExpoImage 
                              source={dashedLineSvg} 
                              style={styles.dashedLineImage} 
                              contentFit="contain"
                            />
                          ) : (
                            dashedLineXml ? (
                              <SvgXml xml={dashedLineXml} width={1} height={80} />
                            ) : (
                              <View style={styles.dashedLineFallback} />
                            )
                          )
                        )}
                      </View>
                    )}
                  </View>

                  {/* Right side - Content */}
                  <View style={styles.timelineContentItem}>
                    <View style={styles.timelineHeaderRow}>
                      <Text style={[styles.timelineLabel, { fontFamily: fontFamilySemiBold }]}>
                        {step.label}
                      </Text>
                      <Text style={[styles.timelineTimestamp, { fontFamily: fontFamilyRegular }]}>
                        {step.timestamp}
                      </Text>
                    </View>
                    <Text style={[styles.timelineDescription, { fontFamily: fontFamilyRegular }]}>
                      {step.description}
                    </Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    zIndex: 20, // Higher than bottom sheet to always stay on top
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
  mapContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#E5E5E5',
    zIndex: 1,
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
    right: 16,
    width: 54,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 15,
  },
  fullScreenImage: {
    width: 54,
    height: 54,
  },
  bottomSheetSafeArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 0, // No bottom radius to make it look part of screen
    borderBottomRightRadius: 0,
    zIndex: 10, // Lower than header
    maxHeight: Math.min(
      Math.max(600, SCREEN_HEIGHT * 0.45),
      SCREEN_HEIGHT - HEADER_HEIGHT - 80
    ), // Limit expansion to prevent excessive blank space
    ...(Platform.OS === 'web' ? {
      boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)',
    } : {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 10,
    }),
  },
  dragHandle: {
    paddingTop: 12,
    paddingBottom: 8,
    alignItems: 'center',
  },
  dragHandleBar: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D0D0D0',
  },
  timelineHeader: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  timelineTitle: {
    fontSize: 18,
    color: '#000000',
    fontWeight: Platform.OS === 'web' ? '600' : 'normal',
  },
  timelineScrollView: {
    flex: 1,
  },
  timelineContent: {
    paddingHorizontal: 20,
    paddingBottom: 16, // Minimal margin - SafeAreaView handles navigation bar spacing
    flexGrow: 1, // Allow content to grow naturally without forcing extra space
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 0,
  },
  timelineLeft: {
    width: 20,
    alignItems: 'center',
    marginRight: 16,
  },
  timelineDotContainer: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  timelineDot: {
    width: 11,
    height: 11,
    borderRadius: 5.5,
  },
  timelineDotCompleted: {
    backgroundColor: '#00C26D',
    borderWidth: 2,
    borderColor: '#C9F8E3',
  },
  timelineDotUpcoming: {
    backgroundColor: '#A7A7A7',
    borderWidth: 2,
    borderColor: '#E1E1E1',
  },
  timelineLineContainer: {
    width: 1,
    height: 80,
    alignItems: 'center',
    marginTop: 4,
  },
  timelineLineCompleted: {
    width: 1,
    height: 80,
    backgroundColor: '#00C26D',
  },
  dashedLineImage: {
    width: 1,
    height: 80,
  },
  dashedLineFallback: {
    width: 1,
    height: 80,
    backgroundColor: '#CDCDCD',
    opacity: 0.5,
  },
  timelineContentItem: {
    flex: 1,
    paddingTop: 0,
    paddingBottom: 16, // Reduced padding between items
  },
  timelineHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  timelineLabel: {
    fontSize: 14,
    color: '#000000',
    fontWeight: Platform.OS === 'web' ? '600' : 'normal',
    flex: 1,
  },
  timelineTimestamp: {
    fontSize: 12,
    color: '#757575',
    marginLeft: 12,
  },
  timelineDescription: {
    fontSize: 12,
    color: '#757575',
    lineHeight: 16,
  },
  greenDotImage: {
    width: 11,
    height: 11,
  },
});
