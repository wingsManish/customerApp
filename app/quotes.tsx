import React, { useState, useCallback, useMemo } from 'react';
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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '@/components/dashboard/Header';
import { QuoteCard } from '@/components/dashboard/QuoteCard';
import { EmptyStateCard } from '@/components/dashboard/EmptyStateCard';
import { BottomTabNavigator } from '@/components/dashboard/BottomTabNavigator';

// Empty state SVG for quotes
const quotesEmptySvg = `<svg width="72" height="70" viewBox="0 0 72 70" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_356_1763)">
<path d="M45.709 15.7427H26.3081C25.866 15.7433 25.4421 15.9184 25.1295 16.2298C24.8169 16.5412 24.641 16.9633 24.6405 17.4037V60.3499L24.4182 60.4175L19.6588 61.8692C19.4333 61.9377 19.1896 61.9142 18.9814 61.804C18.7732 61.6937 18.6174 61.5057 18.5482 61.2812L4.39135 15.2234C4.32245 14.9988 4.34593 14.756 4.45663 14.5486C4.56733 14.3412 4.75618 14.186 4.98169 14.1172L12.3158 11.8805L33.5778 5.39843L40.9118 3.1617C41.0234 3.12748 41.1407 3.11553 41.257 3.12651C41.3733 3.1375 41.4862 3.17121 41.5894 3.22572C41.6925 3.28023 41.7839 3.35447 41.8582 3.44418C41.9325 3.5339 41.9883 3.63733 42.0225 3.74856L45.6412 15.5213L45.709 15.7427Z" fill="#EFEFEF"/>
<path d="M49.9424 15.5211L45.581 1.33233C45.5085 1.09591 45.3899 0.876059 45.232 0.685325C45.074 0.494592 44.88 0.336718 44.6608 0.220725C44.4416 0.104732 44.2016 0.0328911 43.9545 0.00931149C43.7075 -0.0142681 43.4581 0.0108752 43.2208 0.0833021L32.9095 3.2269L11.6487 9.71008L1.33735 12.8548C0.858342 13.0013 0.45726 13.3311 0.222143 13.7718C-0.0129731 14.2126 -0.0629151 14.7282 0.0832816 15.2056L14.9894 63.6971C15.1082 64.0825 15.3478 64.4198 15.6732 64.6595C15.9985 64.8992 16.3924 65.0288 16.7971 65.0292C16.9845 65.0293 17.1707 65.0013 17.3496 64.9462L24.4181 62.7914L24.6404 62.7227V62.4913L24.4181 62.5588L17.2841 64.7347C16.8613 64.863 16.4046 64.8191 16.0142 64.6126C15.6239 64.4061 15.3317 64.0537 15.2018 63.6329L0.29678 15.1402C0.232421 14.9317 0.20999 14.7126 0.230771 14.4955C0.251552 14.2783 0.315136 14.0674 0.417884 13.8747C0.520633 13.6821 0.660529 13.5115 0.829557 13.3728C0.998585 13.234 1.19343 13.1299 1.40292 13.0663L11.7143 9.92158L32.9751 3.4395L43.2865 0.294797C43.4454 0.246496 43.6106 0.221869 43.7767 0.221715C44.1332 0.222512 44.4802 0.337001 44.7667 0.548413C45.0531 0.759824 45.2641 1.05705 45.3687 1.39655L49.71 15.5211L49.779 15.7426H50.0102L49.9424 15.5211Z" fill="#3F3D56"/>
</g>
</svg>`;

type QuoteStatus = 'Pending' | 'Approved' | 'Rejected';

interface Quote {
  quoteId: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  pickupLocation: string;
  dropLocation: string;
  cargoType?: string;
  bodyType?: string;
  weight?: string;
}

// Mock quotes data (will be replaced with API call later)
const mockQuotes: Quote[] = [
  {
    quoteId: 'JKL4255M842',
    status: 'Pending',
    pickupLocation: 'Dar es Salaam',
    dropLocation: 'Arusha',
    cargoType: 'Coal',
    bodyType: 'Open body',
    weight: '100 Tons',
  },
  {
    quoteId: 'JKL4255M843',
    status: 'Pending',
    pickupLocation: 'Mombasa',
    dropLocation: 'Nairobi',
    cargoType: 'Grain',
    bodyType: 'Closed body',
    weight: '80 Tons',
  },
  {
    quoteId: 'JKL4255M844',
    status: 'Approved',
    pickupLocation: 'Kampala',
    dropLocation: 'Kigali',
    cargoType: 'Cement',
    bodyType: 'Open body',
    weight: '120 Tons',
  },
  {
    quoteId: 'JKL4255M845',
    status: 'Approved',
    pickupLocation: 'Nairobi',
    dropLocation: 'Mombasa',
    cargoType: 'Steel',
    bodyType: 'Closed body',
    weight: '90 Tons',
  },
  {
    quoteId: 'JKL4255M846',
    status: 'Rejected',
    pickupLocation: 'Arusha',
    dropLocation: 'Dar es Salaam',
    cargoType: 'Furniture',
    bodyType: 'Open body',
    weight: '50 Tons',
  },
  {
    quoteId: 'JKL4255M847',
    status: 'Pending',
    pickupLocation: 'Dodoma',
    dropLocation: 'Tanga',
    cargoType: 'Machinery',
    bodyType: 'Closed body',
    weight: '75 Tons',
  },
];

export default function QuotesScreen() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<QuoteStatus>('Pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quotes, setQuotes] = useState<Quote[]>(mockQuotes);

  // Filter and search quotes
  const filteredQuotes = useMemo(() => {
    let filtered = quotes.filter((quote) => quote.status === selectedFilter);

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (quote) =>
          quote.quoteId.toLowerCase().includes(query) ||
          quote.pickupLocation.toLowerCase().includes(query) ||
          quote.dropLocation.toLowerCase().includes(query) ||
          quote.cargoType?.toLowerCase().includes(query) ||
          quote.bodyType?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [quotes, selectedFilter, searchQuery]);

  // Get counts for each status
  const statusCounts = useMemo(() => {
    return {
      Pending: quotes.filter((q) => q.status === 'Pending').length,
      Approved: quotes.filter((q) => q.status === 'Approved').length,
      Rejected: quotes.filter((q) => q.status === 'Rejected').length,
    };
  }, [quotes]);

  // Load quotes (will be replaced with API call)
  const loadQuotes = useCallback(async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // In the future, this will be:
      // const response = await quoteService.getQuotes();
      // setQuotes(response.data);
      
      // For now, use mock data
      setQuotes(mockQuotes);
    } catch (error) {
      console.error('Error loading quotes:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Pull to refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadQuotes();
    setRefreshing(false);
  }, [loadQuotes]);

  // Load quotes on mount
  React.useEffect(() => {
    loadQuotes();
  }, [loadQuotes]);

  // Segment control component
  const SegmentControl = () => {
    const fontFamilySemiBold = Platform.select({
      ios: 'Figtree-SemiBold',
      android: 'Figtree-SemiBold',
      web: 'Figtree',
      default: 'Figtree',
    });

    const statuses: QuoteStatus[] = ['Pending', 'Approved', 'Rejected'];

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

  // Render quote card
  const renderQuoteCard = ({ item }: { item: Quote }) => (
    <QuoteCard
      quoteId={item.quoteId}
      status={item.status}
      pickupLocation={item.pickupLocation}
      dropLocation={item.dropLocation}
      cargoType={item.cargoType}
      bodyType={item.bodyType}
      weight={item.weight}
      onPress={() => {
        // Navigate to quote details (will create this screen later)
        console.log('Navigate to quote details:', item.quoteId);
        // router.push(`/quotes/${item.quoteId}`);
      }}
    />
  );

  const fontFamilyRegular = Platform.select({
    ios: 'Figtree-Regular',
    android: 'Figtree-Regular',
    web: 'Figtree',
    default: 'Figtree',
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Header location="Magodo, Ikeja" />

      <View style={styles.content}>
        {/* Filter Section */}
        <View style={styles.filterContainer}>
          <SegmentControl />
        </View>

        {/* Search Section */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Ionicons name="search-outline" size={20} color="#666666" style={styles.searchIcon} />
            <TextInput
              style={[styles.searchInput, { fontFamily: fontFamilyRegular }]}
              placeholder="Search Quotes"
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
          <TouchableOpacity style={styles.filterIconButton} activeOpacity={0.7}>
            <Ionicons name="filter-outline" size={20} color="#666666" />
          </TouchableOpacity>
        </View>

        {/* Quotes List */}
        {loading && !refreshing ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#C8202F" />
          </View>
        ) : filteredQuotes.length > 0 ? (
          <FlatList
            data={filteredQuotes}
            renderItem={renderQuoteCard}
            keyExtractor={(item) => item.quoteId}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <EmptyStateCard
              message={
                searchQuery.trim()
                  ? `No quotes found matching "${searchQuery}"`
                  : `No ${selectedFilter.toLowerCase()} quotes found`
              }
              svgSource={quotesEmptySvg}
            />
          </View>
        )}
      </View>

      <BottomTabNavigator />
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
});
