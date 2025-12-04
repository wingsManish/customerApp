import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Platform,
  StatusBar,
  RefreshControl,
  Text,
  FlatList,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/dashboard/Header';
import { OverviewCard } from '@/components/dashboard/OverviewCard';
import { SectionHeader } from '@/components/dashboard/SectionHeader';
import { EmptyStateCard } from '@/components/dashboard/EmptyStateCard';
import { TripCard } from '@/components/dashboard/TripCard';
import { QuoteCard } from '@/components/dashboard/QuoteCard';
import { BottomTabNavigator } from '@/components/dashboard/BottomTabNavigator';
import { useRouter } from 'expo-router';

const clipboardSvg = `<svg width="72" height="70" viewBox="0 0 72 70" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_356_1763)">
<path d="M45.709 15.7427H26.3081C25.866 15.7433 25.4421 15.9184 25.1295 16.2298C24.8169 16.5412 24.641 16.9633 24.6405 17.4037V60.3499L24.4182 60.4175L19.6588 61.8692C19.4333 61.9377 19.1896 61.9142 18.9814 61.804C18.7732 61.6937 18.6174 61.5057 18.5482 61.2812L4.39135 15.2234C4.32245 14.9988 4.34593 14.756 4.45663 14.5486C4.56733 14.3412 4.75618 14.186 4.98169 14.1172L12.3158 11.8805L33.5778 5.39843L40.9118 3.1617C41.0234 3.12748 41.1407 3.11553 41.257 3.12651C41.3733 3.1375 41.4862 3.17121 41.5894 3.22572C41.6925 3.28023 41.7839 3.35447 41.8582 3.44418C41.9325 3.5339 41.9883 3.63733 42.0225 3.74856L45.6412 15.5213L45.709 15.7427Z" fill="#EFEFEF"/>
<path d="M49.9424 15.5211L45.581 1.33233C45.5085 1.09591 45.3899 0.876059 45.232 0.685325C45.074 0.494592 44.88 0.336718 44.6608 0.220725C44.4416 0.104732 44.2016 0.0328911 43.9545 0.00931149C43.7075 -0.0142681 43.4581 0.0108752 43.2208 0.0833021L32.9095 3.2269L11.6487 9.71008L1.33735 12.8548C0.858342 13.0013 0.45726 13.3311 0.222143 13.7718C-0.0129731 14.2126 -0.0629151 14.7282 0.0832816 15.2056L14.9894 63.6971C15.1082 64.0825 15.3478 64.4198 15.6732 64.6595C15.9985 64.8992 16.3924 65.0288 16.7971 65.0292C16.9845 65.0293 17.1707 65.0013 17.3496 64.9462L24.4181 62.7914L24.6404 62.7227V62.4913L24.4181 62.5588L17.2841 64.7347C16.8613 64.863 16.4046 64.8191 16.0142 64.6126C15.6239 64.4061 15.3317 64.0537 15.2018 63.6329L0.29678 15.1402C0.232421 14.9317 0.20999 14.7126 0.230771 14.4955C0.251552 14.2783 0.315136 14.0674 0.417884 13.8747C0.520633 13.6821 0.660529 13.5115 0.829557 13.3728C0.998585 13.234 1.19343 13.1299 1.40292 13.0663L11.7143 9.92158L32.9751 3.4395L43.2865 0.294797C43.4454 0.246496 43.6106 0.221869 43.7767 0.221715C44.1332 0.222512 44.4802 0.337001 44.7667 0.548413C45.0531 0.759824 45.2641 1.05705 45.3687 1.39655L49.71 15.5211L49.779 15.7426H50.0102L49.9424 15.5211Z" fill="#3F3D56"/>
<path d="M13.6392 14.1535C13.4249 14.1533 13.2164 14.0848 13.0441 13.9579C12.8718 13.831 12.7448 13.6525 12.6819 13.4485L11.2499 8.78994C11.2114 8.6648 11.1981 8.53334 11.2106 8.40306C11.2232 8.27279 11.2613 8.14625 11.323 8.03067C11.3846 7.91509 11.4685 7.81274 11.5699 7.72946C11.6713 7.64619 11.7881 7.58361 11.9138 7.54532L31.4735 1.58103C31.7272 1.50391 32.0013 1.53021 32.2356 1.65416C32.4699 1.77811 32.6453 1.98958 32.7232 2.24216L34.1551 6.90079C34.2325 7.15351 34.2061 7.42649 34.0816 7.65983C33.9572 7.89317 33.7449 8.06782 33.4913 8.14546L13.9315 14.1097C13.8368 14.1387 13.7383 14.1534 13.6392 14.1535Z" fill="#C8202F"/>
<path d="M21.1405 4.97775C22.3685 4.97775 23.3639 3.98625 23.3639 2.76317C23.3639 1.54009 22.3685 0.548584 21.1405 0.548584C19.9125 0.548584 18.917 1.54009 18.917 2.76317C18.917 3.98625 19.9125 4.97775 21.1405 4.97775Z" fill="#C8202F"/>
<path d="M21.1404 4.16552C21.918 4.16552 22.5484 3.53767 22.5484 2.76318C22.5484 1.98869 21.918 1.36084 21.1404 1.36084C20.3628 1.36084 19.7324 1.98869 19.7324 2.76318C19.7324 3.53767 20.3628 4.16552 21.1404 4.16552Z" fill="white"/>
<path d="M66.9973 64.4635H29.4206C29.17 64.4632 28.9298 64.3639 28.7527 64.1875C28.5755 64.0111 28.4759 63.7718 28.4756 63.5223V18.677C28.4759 18.4275 28.5755 18.1883 28.7527 18.0118C28.9298 17.8354 29.17 17.7361 29.4206 17.7358H66.9973C67.2478 17.7361 67.488 17.8354 67.6651 18.0118C67.8423 18.1883 67.9419 18.4275 67.9422 18.677V63.5223C67.9419 63.7718 67.8423 64.011 67.6651 64.1875C67.488 64.3639 67.2478 64.4632 66.9973 64.4635Z" fill="#EFEFEF"/>
<path d="M49.71 15.5212H26.3079C25.8069 15.5219 25.3266 15.7205 24.9723 16.0734C24.618 16.4262 24.4187 16.9046 24.418 17.4036V62.5589L24.6403 62.4914V17.4036C24.6409 16.9633 24.8167 16.5411 25.1293 16.2298C25.442 15.9184 25.8658 15.7432 26.3079 15.7427H49.7789L49.71 15.5212ZM70.1103 15.5212H26.3079C25.8069 15.5219 25.3266 15.7205 24.9723 16.0734C24.618 16.4262 24.4187 16.9046 24.418 17.4036V68.1175C24.4187 68.6166 24.618 69.0949 24.9723 69.4478C25.3266 69.8007 25.8069 69.9992 26.3079 69.9999H70.1103C70.6113 69.9992 71.0916 69.8007 71.4459 69.4478C71.8002 69.0949 71.9995 68.6166 72.0003 68.1175V17.4036C71.9995 16.9046 71.8002 16.4262 71.4459 16.0734C71.0916 15.7205 70.6113 15.5219 70.1103 15.5212ZM71.7779 68.1175C71.7774 68.5579 71.6015 68.98 71.2889 69.2914C70.9763 69.6028 70.5524 69.7779 70.1103 69.7785H26.3079C25.8658 69.7779 25.442 69.6028 25.1293 69.2914C24.8167 68.98 24.6409 68.5579 24.6403 68.1175V17.4036C24.6409 16.9633 24.8167 16.5411 25.1293 16.2298C25.442 15.9184 25.8658 15.7432 26.3079 15.7427H70.1103C70.5524 15.7432 70.9763 15.9184 71.2889 16.2298C71.6015 16.5411 71.7774 16.9633 71.7779 17.4036V68.1175Z" fill="#3F3D56"/>
<path d="M58.4369 20.3933H37.981C37.7158 20.393 37.4614 20.2879 37.2739 20.1011C37.0863 19.9142 36.9808 19.6609 36.9805 19.3967V14.5246C36.9808 14.2604 37.0863 14.0071 37.2739 13.8203C37.4614 13.6335 37.7158 13.5284 37.981 13.5281H58.4369C58.7022 13.5284 58.9565 13.6335 59.1441 13.8203C59.3317 14.0071 59.4372 14.2604 59.4375 14.5246V19.3967C59.4372 19.6609 59.3317 19.9142 59.1441 20.1011C58.9565 20.2879 58.7022 20.393 58.4369 20.3933Z" fill="#C8202F"/>
<path d="M48.2088 13.8603C49.4368 13.8603 50.4323 12.8688 50.4323 11.6457C50.4323 10.4227 49.4368 9.43115 48.2088 9.43115C46.9808 9.43115 45.9854 10.4227 45.9854 11.6457C45.9854 12.8688 46.9808 13.8603 48.2088 13.8603Z" fill="#C8202F"/>
<path d="M48.2088 12.9946C48.9568 12.9946 49.5631 12.3907 49.5631 11.6458C49.5631 10.9008 48.9568 10.2969 48.2088 10.2969C47.4608 10.2969 46.8545 10.9008 46.8545 11.6458C46.8545 12.3907 47.4608 12.9946 48.2088 12.9946Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_356_1763">
<rect width="72" height="70" fill="white"/>
</clipPath>
</defs>
</svg>`;

export default function HomeScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const [overviewData, setOverviewData] = useState({
    activeTrips: 1,
    pendingTrips: 2,
    requestedQuotes: 6,
    pendingQuotes: 3,
  });

  const [activeTrips] = useState([
    {
      tripId: 'JKL4255M842',
      status: 'Active' as const,
      pickupLocation: 'Dar es Salaam',
      dropLocation: 'Arusha',
      progressStatus: 'Dispatched',
      vehicleType: 'Truck',
      licensePlate: 'T842 DKT',
      driverName: 'Driver Arthur Shelby',
      distance: '630km',
      date: 'March 16, 2024',
      weight: '100 Tons',
    },
    {
      tripId: 'JKL4255M843',
      status: 'Active' as const,
      pickupLocation: 'Mombasa',
      dropLocation: 'Nairobi',
      progressStatus: 'In Transit',
      vehicleType: 'Truck',
      licensePlate: 'T843 DKT',
      driverName: 'Driver John Doe',
      distance: '450km',
      date: 'March 17, 2024',
      weight: '80 Tons',
    },
    {
      tripId: 'JKL4255M844',
      status: 'Active' as const,
      pickupLocation: 'Kampala',
      dropLocation: 'Kigali',
      progressStatus: 'Dispatched',
      vehicleType: 'Truck',
      licensePlate: 'T844 DKT',
      driverName: 'Driver Jane Smith',
      distance: '520km',
      date: 'March 18, 2024',
      weight: '120 Tons',
    },
  ]);

  const [currentTripIndex, setCurrentTripIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const screenWidth = Dimensions.get('window').width;
  const cardWidth = screenWidth - 40; // Account for horizontal padding (20 * 2)

  const [requestedQuotes] = useState([
    {
      quoteId: 'JKL4255M842',
      status: 'Pending' as const,
      pickupLocation: 'Dar es Salaam',
      dropLocation: 'Arusha',
      cargoType: 'Coal',
      bodyType: 'Open body',
      weight: '100 Tons',
    },
    {
      quoteId: 'JKL4255M843',
      status: 'Pending' as const,
      pickupLocation: 'Mombasa',
      dropLocation: 'Nairobi',
      cargoType: 'Grain',
      bodyType: 'Closed body',
      weight: '80 Tons',
    },
    {
      quoteId: 'JKL4255M844',
      status: 'Approved' as const,
      pickupLocation: 'Kampala',
      dropLocation: 'Kigali',
      cargoType: 'Cement',
      bodyType: 'Open body',
      weight: '120 Tons',
    },
  ]);

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const quotesFlatListRef = useRef<FlatList>(null);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Header location="Magodo, Ikeja" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Today's Overview Section */}
        <View style={styles.section}>
          <View style={styles.overviewHeader}>
            <SectionHeader title="Today's Overview" />
          </View>
          <View style={styles.overviewGrid}>
            <OverviewCard
              value={overviewData.activeTrips}
              label="Active Trips"
              icon="car"
            />
            <OverviewCard
              value={overviewData.pendingTrips}
              label="Pending Trips"
              icon="time"
            />
            <OverviewCard
              value={overviewData.requestedQuotes}
              label="Requested Quotes"
              icon="document-text"
            />
            <OverviewCard
              value={overviewData.pendingQuotes}
              label="Pending Quotes"
              icon="hourglass"
            />
          </View>
        </View>

        {/* Active Trips Section */}
        <View style={styles.section}>
          <SectionHeader
            title="Active trips"
            showViewAll={activeTrips.length > 0}
            onViewAllPress={() => router.push('/trips')}
          />
          {activeTrips.length > 0 ? (
            <>
              <FlatList
                ref={flatListRef}
                data={activeTrips}
                renderItem={({ item: trip }) => (
                  <View style={styles.tripCardContainer}>
                    <TripCard
                      tripId={trip.tripId}
                      status={trip.status}
                      pickupLocation={trip.pickupLocation}
                      dropLocation={trip.dropLocation}
                      progressStatus={trip.progressStatus}
                      vehicleType={trip.vehicleType}
                      licensePlate={trip.licensePlate}
                      driverName={trip.driverName}
                      distance={trip.distance}
                      date={trip.date}
                      weight={trip.weight}
                      onPress={() => router.push(`/trips/${trip.tripId}`)}
                    />
                  </View>
                )}
                keyExtractor={(item, index) => `trip-${index}`}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                snapToInterval={cardWidth}
                decelerationRate="fast"
                onMomentumScrollEnd={(event) => {
                  const index = Math.round(
                    event.nativeEvent.contentOffset.x / cardWidth
                  );
                  setCurrentTripIndex(index);
                }}
                contentContainerStyle={styles.tripCarouselContent}
              />
              {/* Pagination Indicators */}
              <View style={styles.paginationContainer}>
                {activeTrips.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.paginationDot,
                      index === currentTripIndex && styles.paginationDotActive,
                    ]}
                  />
                ))}
              </View>
            </>
          ) : (
            <EmptyStateCard message="No Trips Found" svgSource={clipboardSvg} />
          )}
        </View>

        {/* Requested Quotes Section */}
        <View style={styles.section}>
          <SectionHeader
            title="Requested Quotes"
            showViewAll={requestedQuotes.length > 0}
            onViewAllPress={() => router.push('/quotes')}
          />
          {requestedQuotes.length > 0 ? (
            <>
              <FlatList
                ref={quotesFlatListRef}
                data={requestedQuotes}
                renderItem={({ item: quote }) => (
                  <View style={styles.quoteCardContainer}>
                    <QuoteCard
                      quoteId={quote.quoteId}
                      status={quote.status}
                      pickupLocation={quote.pickupLocation}
                      dropLocation={quote.dropLocation}
                      cargoType={quote.cargoType}
                      bodyType={quote.bodyType}
                      weight={quote.weight}
                      onPress={() => router.push(`/quotes/${quote.quoteId}`)}
                    />
                  </View>
                )}
                keyExtractor={(item, index) => `quote-${index}`}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                snapToInterval={cardWidth}
                decelerationRate="fast"
                onMomentumScrollEnd={(event) => {
                  const index = Math.round(
                    event.nativeEvent.contentOffset.x / cardWidth
                  );
                  setCurrentQuoteIndex(index);
                }}
                contentContainerStyle={styles.quoteCarouselContent}
              />
              {/* Pagination Indicators */}
              <View style={styles.paginationContainer}>
                {requestedQuotes.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.paginationDot,
                      index === currentQuoteIndex && styles.paginationDotActive,
                    ]}
                  />
                ))}
              </View>
            </>
          ) : (
            <EmptyStateCard message="No Quotes Found" svgSource={clipboardSvg} />
          )}
        </View>
      </ScrollView>

      <BottomTabNavigator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  section: {
    marginBottom: 24,
  },
  overviewHeader: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: Platform.OS === 'web' ? '600' : 'normal',
    color: '#000000',
    marginBottom: 16,
    fontFamily: Platform.select({
      ios: 'Figtree-SemiBold',
      android: 'Figtree-SemiBold',
      web: 'Figtree',
      default: 'Figtree',
    }),
  },
  overviewGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  tripCardContainer: {
    width: Dimensions.get('window').width - 40,
  },
  tripCarouselContent: {
    paddingRight: 12,
  },
  quoteCardContainer: {
    width: Dimensions.get('window').width - 40,
  },
  quoteCarouselContent: {
    paddingRight: 12,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E5E5E5',
  },
  paginationDotActive: {
    backgroundColor: '#C8202F',
    width: 8,
    height: 8,
  },
});

