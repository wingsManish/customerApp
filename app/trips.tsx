import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  RefreshControl,
  FlatList,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  TextInput,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '@/components/dashboard/Header';
import { TripCard } from '@/components/dashboard/TripCard';
import { EmptyStateCard } from '@/components/dashboard/EmptyStateCard';
import { BottomTabNavigator } from '@/components/dashboard/BottomTabNavigator';

// Empty state SVG for trips
const tripsEmptySvg = `<svg width="72" height="70" viewBox="0 0 72 70" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_356_1763)">
<path d="M45.709 15.7427H26.3081C25.866 15.7433 25.4421 15.9184 25.1295 16.2298C24.8169 16.5412 24.641 16.9633 24.6405 17.4037V60.3499L24.4182 60.4175L19.6588 61.8692C19.4333 61.9377 19.1896 61.9142 18.9814 61.804C18.7732 61.6937 18.6174 61.5057 18.5482 61.2812L4.39135 15.2234C4.32245 14.9988 4.34593 14.756 4.45663 14.5486C4.56733 14.3412 4.75618 14.186 4.98169 14.1172L12.3158 11.8805L33.5778 5.39843L40.9118 3.1617C41.0234 3.12748 41.1407 3.11553 41.257 3.12651C41.3733 3.1375 41.4862 3.17121 41.5894 3.22572C41.6925 3.28023 41.7839 3.35447 41.8582 3.44418C41.9325 3.5339 41.9883 3.63733 42.0225 3.74856L45.6412 15.5213L45.709 15.7427Z" fill="#EFEFEF"/>
<path d="M49.9424 15.5211L45.581 1.33233C45.5085 1.09591 45.3899 0.876059 45.232 0.685325C45.074 0.494592 44.88 0.336718 44.6608 0.220725C44.4416 0.104732 44.2016 0.0328911 43.9545 0.00931149C43.7075 -0.0142681 43.4581 0.0108752 43.2208 0.0833021L32.9095 3.2269L11.6487 9.71008L1.33735 12.8548C0.858342 13.0013 0.45726 13.3311 0.222143 13.7718C-0.0129731 14.2126 -0.0629151 14.7282 0.0832816 15.2056L14.9894 63.6971C15.1082 64.0825 15.3478 64.4198 15.6732 64.6595C15.9985 64.8992 16.3924 65.0288 16.7971 65.0292C16.9845 65.0293 17.1707 65.0013 17.3496 64.9462L24.4181 62.7914L24.6404 62.7227V62.4913L24.4181 62.5588L17.2841 64.7347C16.8613 64.863 16.4046 64.8191 16.0142 64.6126C15.6239 64.4061 15.3317 64.0537 15.2018 63.6329L0.29678 15.1402C0.232421 14.9317 0.20999 14.7126 0.230771 14.4955C0.251552 14.2783 0.315136 14.0674 0.417884 13.8747C0.520633 13.6821 0.660529 13.5115 0.829557 13.3728C0.998585 13.234 1.19343 13.1299 1.40292 13.0663L11.7143 9.92158L32.9751 3.4395L43.2865 0.294797C43.4454 0.246496 43.6106 0.221869 43.7767 0.221715C44.1332 0.222512 44.4802 0.337001 44.7667 0.548413C45.0531 0.759824 45.2641 1.05705 45.3687 1.39655L49.71 15.5211L49.779 15.7426H50.0102L49.9424 15.5211Z" fill="#3F3D56"/>
</g>
</svg>`;

type TripStatus = 'Active' | 'Pending' | 'Completed';
type DurationFilter = 'Last 30 days' | 'Last Week' | '2024' | '2023' | '2022' | 'Custom' | null;

interface Trip {
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
}

// Mock trips data (will be replaced with API call later)
const mockTrips: Trip[] = [
  {
    tripId: 'JKL4255M842',
    status: 'Active',
    pickupLocation: 'Dar es Salaam',
    dropLocation: 'Arusha',
    progressStatus: 'Dispatched',
    vehicleType: 'Truck',
    licensePlate: 'T842 DKT',
    driverName: 'Driver Arthur Shelby',
    distance: '630km',
    date: '16 March, 2:15 PM',
    weight: '100 Tons',
  },
  {
    tripId: 'JKL4255M843',
    status: 'Active',
    pickupLocation: 'Mombasa',
    dropLocation: 'Nairobi',
    progressStatus: 'In Transit',
    vehicleType: 'Truck',
    licensePlate: 'T843 DKT',
    driverName: 'Driver John Doe',
    distance: '450km',
    date: '17 July, 2:15 PM',
    weight: '80 Tons',
  },
  {
    tripId: 'JKL4255M844',
    status: 'Pending',
    pickupLocation: 'Kampala',
    dropLocation: 'Kigali',
    progressStatus: 'Dispatched',
    vehicleType: 'Truck',
    licensePlate: 'T844 DKT',
    driverName: 'Driver Jane Smith',
    distance: '520km',
    date: '18 April, 3:30 PM',
    weight: '120 Tons',
  },
  {
    tripId: 'JKL4255M845',
    status: 'Completed',
    pickupLocation: 'Nairobi',
    dropLocation: 'Mombasa',
    progressStatus: 'Delivered',
    vehicleType: 'Truck',
    licensePlate: 'T845 DKT',
    driverName: 'Driver Mike Johnson',
    distance: '450km',
    date: '15 May, 10:45 AM',
    weight: '90 Tons',
  },
  {
    tripId: 'JKL4255M846',
    status: 'Completed',
    pickupLocation: 'Arusha',
    dropLocation: 'Dar es Salaam',
    progressStatus: 'Delivered',
    vehicleType: 'Truck',
    licensePlate: 'T846 DKT',
    driverName: 'Driver Sarah Williams',
    distance: '630km',
    date: '14 June, 4:20 PM',
    weight: '110 Tons',
  },
  {
    tripId: 'JKL4255M847',
    status: 'Pending',
    pickupLocation: 'Dodoma',
    dropLocation: 'Tanga',
    progressStatus: 'Scheduled',
    vehicleType: 'Truck',
    licensePlate: 'T847 DKT',
    driverName: 'Driver David Brown',
    distance: '380km',
    date: '19 July, 1:00 PM',
    weight: '75 Tons',
  },
];

export default function TripsScreen() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<TripStatus>('Pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [trips, setTrips] = useState<Trip[]>(mockTrips);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState<DurationFilter>(null);

  // Filter and search trips
  const filteredTrips = React.useMemo(() => {
    let filtered = trips.filter((trip) => trip.status === selectedFilter);

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (trip) =>
          trip.tripId.toLowerCase().includes(query) ||
          trip.pickupLocation.toLowerCase().includes(query) ||
          trip.dropLocation.toLowerCase().includes(query) ||
          trip.driverName?.toLowerCase().includes(query) ||
          trip.licensePlate?.toLowerCase().includes(query)
      );
    }

    // Apply duration filter
    if (selectedDuration) {
      const now = new Date();
      let filterDate: Date | null = null;

      switch (selectedDuration) {
        case 'Last 30 days':
          filterDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        case 'Last Week':
          filterDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case '2024':
          filterDate = new Date('2024-01-01');
          break;
        case '2023':
          filterDate = new Date('2023-01-01');
          break;
        case '2022':
          filterDate = new Date('2022-01-01');
          break;
        case 'Custom':
          // Custom date range - for now, just return all (can be implemented later)
          break;
      }

      if (filterDate && selectedDuration !== 'Custom') {
        filtered = filtered.filter((trip) => {
          // Parse date from trip.date (format: "17 July, 2:15 PM")
          // For mock data, we'll just return all trips
          // In real implementation, parse the date and compare
          return true; // Placeholder - will need proper date parsing
        });
      }
    }

    return filtered;
  }, [trips, selectedFilter, searchQuery, selectedDuration]);

  // Get counts for each status
  const statusCounts = React.useMemo(() => {
    return {
      Active: trips.filter((t) => t.status === 'Active').length,
      Pending: trips.filter((t) => t.status === 'Pending').length,
      Completed: trips.filter((t) => t.status === 'Completed').length,
    };
  }, [trips]);

  // Load trips (will be replaced with API call)
  const loadTrips = useCallback(async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // In the future, this will be:
      // const response = await tripService.getTrips();
      // setTrips(response.data);
      
      // For now, use mock data
      setTrips(mockTrips);
    } catch (error) {
      console.error('Error loading trips:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Pull to refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadTrips();
    setRefreshing(false);
  }, [loadTrips]);

  // Load trips on mount
  React.useEffect(() => {
    loadTrips();
  }, [loadTrips]);

  // Font families
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

  // Segment control component
  const SegmentControl = () => {

    const statuses: TripStatus[] = ['Pending', 'Active', 'Completed'];

    return (
      <View style={styles.segmentContainer}>
        {statuses.map((status, index) => {
          const isSelected = selectedFilter === status;
          return (
            <TouchableOpacity
              key={status}
              style={[
                styles.segmentTab,
                isSelected && styles.segmentTabActive,
                index === 0 && styles.segmentTabFirst,
                index === statuses.length - 1 && styles.segmentTabLast,
              ]}
              onPress={() => setSelectedFilter(status)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.segmentTabText,
                  { fontFamily: fontFamilySemiBold },
                  isSelected && styles.segmentTabTextActive,
                ]}
              >
                {status}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  // Render trip card
  const renderTripCard = ({ item }: { item: Trip }) => (
    <TripCard
      tripId={item.tripId}
      status={item.status}
      pickupLocation={item.pickupLocation}
      dropLocation={item.dropLocation}
      progressStatus={item.progressStatus}
      vehicleType={item.vehicleType}
      licensePlate={item.licensePlate}
      driverName={item.driverName}
      distance={item.distance}
      date={item.date}
      weight={item.weight}
      variant="trips"
      onPress={() => {
        router.push(`/trips/${item.tripId}`);
      }}
    />
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      <Header location="Magodo, Ikeja" />

      <View style={styles.content}>
        {/* Filter Section */}
        <View style={styles.filterContainer}>
          <SegmentControl />
        </View>

        {/* Search Section */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            {/* <Ionicons name="search-outline" size={20} color="#666666" style={styles.searchIcon} /> */}
            <TextInput
              style={[styles.searchInput, { fontFamily: fontFamilyRegular }]}
              placeholder="Search Trips"
              placeholderTextColor="#6A6A6A"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity
                onPress={() => setSearchQuery('')}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="close-circle" size={20} color="#999999" />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity 
            style={styles.filterIconButton} 
            activeOpacity={0.7}
            onPress={() => setShowFilterModal(true)}
          >
            <Ionicons name="filter-outline" size={20} color="#666666" />
            {selectedDuration && (
              <View style={styles.filterBadge}>
                <Text style={styles.filterBadgeText}>1</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Trips List */}
        {loading && !refreshing ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#C8202F" />
          </View>
        ) : filteredTrips.length > 0 ? (
          <FlatList
            data={filteredTrips}
            renderItem={renderTripCard}
            keyExtractor={(item) => item.tripId}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <EmptyStateCard
              message={
                searchQuery.trim()
                  ? `No trips found matching "${searchQuery}"`
                  : `No ${selectedFilter.toLowerCase()} trips found`
              }
              svgSource={tripsEmptySvg}
            />
          </View>
        )}
      </View>

      <BottomTabNavigator />

      {/* Filter Modal */}
      <Modal
        visible={showFilterModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowFilterModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowFilterModal(false)}
        >
          <TouchableOpacity
            style={styles.modalContent}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            {/* Grab Handle */}
            <View style={styles.modalGrabHandle} />

            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { fontFamily: fontFamilySemiBold }]}>Filters</Text>
              <TouchableOpacity
                onPress={() => {
                  setSelectedDuration(null);
                  setShowFilterModal(false);
                }}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Text style={[styles.clearFilterText, { fontFamily: fontFamilyRegular }]}>
                  Clear Filter
                </Text>
              </TouchableOpacity>
            </View>

            {/* Duration Section */}
            <View style={styles.durationSection}>
              <Text style={[styles.durationLabel, { fontFamily: fontFamilySemiBold }]}>
                Duration
              </Text>
              <View style={styles.durationButtonsContainer}>
                {['Last 30 days', 'Last Week', '2024', '2023', '2022', 'Custom'].map(
                  (duration) => (
                    <TouchableOpacity
                      key={duration}
                      style={[
                        styles.durationButton,
                        selectedDuration === duration && styles.durationButtonSelected,
                      ]}
                      onPress={() => setSelectedDuration(duration as DurationFilter)}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          styles.durationButtonText,
                          { fontFamily: fontFamilyRegular },
                          selectedDuration === duration && styles.durationButtonTextSelected,
                        ]}
                      >
                        {duration}
                      </Text>
                    </TouchableOpacity>
                  )
                )}
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowFilterModal(false)}
                activeOpacity={0.7}
              >
                <Text style={[styles.cancelButtonText, { fontFamily: fontFamilySemiBold }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.applyButton}
                onPress={() => {
                  setShowFilterModal(false);
                }}
                activeOpacity={0.7}
              >
                <Text style={[styles.applyButtonText, { fontFamily: fontFamilySemiBold }]}>
                  Apply
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
  },
  filterContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  segmentContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 22.5,
    padding: 6,
    gap: 0,
  },
  segmentTab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent', // No background for unselected tabs
  },
  segmentTabActive: {
    backgroundColor: '#FFFFFF', // White background for selected tab
  },
  segmentTabFirst: {
    // No special styling needed
  },
  segmentTabLast: {
    // No special styling needed
  },
  segmentTabText: {
    fontSize: 14,
    fontWeight: Platform.OS === 'web' ? '600' : 'normal',
    color: '#606060', // Grey for unselected tabs
  },
  segmentTabTextActive: {
    color: '#C8202F', // Red for selected tab
  },
  searchContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 7.5,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  searchIcon: {
    marginRight: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#6A6A6A',
    padding: 0,
  },
  filterIconButton: {
    width: 42,
    height: 42,
    borderRadius: 7.5,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    backgroundColor: '#D8D8D8',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  filterBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#C8202F',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  filterBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: Platform.OS === 'web' ? '700' : 'bold',
    lineHeight: 12,
  },
  listContent: {
    padding: 20,
    paddingBottom: 100, // Space for bottom tab navigator
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    maxHeight: '80%',
  },
  modalGrabHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#D8D8D8',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 18,
    color: '#000000',
  },
  clearFilterText: {
    fontSize: 14,
    color: '#C8202F',
  },
  durationSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  durationLabel: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 12,
  },
  durationButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  durationButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    backgroundColor: '#FFFFFF',
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  durationButtonSelected: {
    borderColor: '#C8202F',
    backgroundColor: '#FFF5F5',
  },
  durationButtonText: {
    fontSize: 14,
    color: '#666666',
  },
  durationButtonTextSelected: {
    color: '#C8202F',
  },
  modalActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#C8202F',
  },
  applyButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#C8202F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});
