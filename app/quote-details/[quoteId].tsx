import React, { useEffect, useMemo, useState, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Platform, Alert, Modal, Pressable } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Image as ExpoImage } from 'expo-image';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LocationTimeline } from '@/components/dashboard/LocationTimeline';
import { TripCard } from '@/components/dashboard/TripCard';
import { loadSvgFromAsset } from '@/utils/svgLoader';
const cargoInfoSvg = require('@/assets/screen-asset/cargo-info.svg');
const pickupDropSvg = require('@/assets/screen-asset/pickup-drop.svg');
const editButtonSvg = require('@/assets/screen-asset/edit-button.svg');
const chatBoxSvg = require('@/assets/screen-asset/chat-box.svg');
const callButtonSvg = require('@/assets/screen-asset/call-button.svg');

// Mock data for quote details (includes an accepted quote)
const mockQuotes = [
  {
    id: 'Q345380',
    status: 'Pending',
    tripStatus: 'Pending',
    trip: null,
    pickup: {
      title: 'Dar es Salaam',
      address: 'Warehouse pickup • Okopowa 11/72, 01-042 Warszawa',
    },
    drop: {
      title: 'Nairobi',
      address: 'Warehouse pickup • Okopowa 11/72, 01-042 Warszawa',
    },
    eta: '343 Km - 3 hour 1 min ETA',
    cargo: {
      type: 'David Beckham',
      product: 'Cement',
      weight: '20 Tons',
    },
    schedule: {
      pickupDate: '17 July 2025',
      pickupTime: '10:00 AM',
      dropDate: '21 July 2025',
    },
  },
  {
    id: 'Q567890',
    status: 'Accepted',
    tripStatus: 'Active',
    trip: {
      tripId: 'Q567890',
      status: 'Active' as const,
      pickupLocation: 'Mwanza',
      dropLocation: 'Arusha',
      progressStatus: 'Dispatched',
      vehicleType: 'Truck',
      licensePlate: 'T842 DKT',
      driverName: 'Arthur Shelby',
      distance: '630km',
      date: 'March 16, 2024',
      weight: '100 Tons',
    },
    pickup: {
      title: 'Mwanza',
      address: 'Warehouse pickup • P.O Box 2433, Mwanza 15667',
    },
    drop: {
      title: 'Arusha',
      address: 'Warehouse pickup • P.O Box 2433, Arusha 18922',
    },
    eta: '720 Km - 9 hour 30 min ETA',
    cargo: {
      type: 'John Doe',
      product: 'Steel Rods',
      weight: '45 Tons',
    },
    schedule: {
      pickupDate: '09 Dec 2025',
      pickupTime: '09:00 AM',
      dropDate: '10 Dec 2025',
    },
  },
  {
    id: 'JKL4255M849', // matches accepted quote shown on quotes list
    status: 'Accepted',
    tripStatus: 'Active',
    trip: {
      tripId: 'JKL4255M849',
      status: 'Active' as const,
      pickupLocation: 'Dodoma',
      dropLocation: 'Morogoro',
      progressStatus: 'Dispatched',
      vehicleType: 'Truck',
      licensePlate: 'T842 DKT',
      driverName: 'Arthur Shelby',
      distance: '630km',
      date: 'March 16, 2024',
      weight: '100 Tons',
    },
    pickup: {
      title: 'Dodoma',
      address: 'Warehouse pickup • P.O Box 2433, Dodoma 11000',
    },
    drop: {
      title: 'Morogoro',
      address: 'Warehouse pickup • P.O Box 2433, Morogoro 16000',
    },
    eta: '270 Km - 4 hour 10 min ETA',
    cargo: {
      type: 'Jane Smith',
      product: 'Timber',
      weight: '60 Tons',
    },
    schedule: {
      pickupDate: '09 Dec 2025',
      pickupTime: '11:00 AM',
      dropDate: '10 Dec 2025',
    },
  },
];

const mockBids = [
  {
    id: 'BID-001',
    vendor: 'Toughzap',
    price: 'Tsh 2,200',
    verified: true,
    color: '#E53935',
  },
  {
    id: 'BID-002',
    vendor: 'FastMove',
    price: 'Tsh 1,950',
    verified: false,
    color: '#1976D2',
  },
];

export default function QuoteDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ quoteId?: string }>();
  const quoteId = params.quoteId || mockQuotes[0].id;

  const quote = useMemo(() => {
    return mockQuotes.find(q => q.id === quoteId) || mockQuotes[0];
  }, [quoteId]);
  const [activeTab, setActiveTab] = useState<'info' | 'bids'>('info');
  const [cargoIconXml, setCargoIconXml] = useState<string>('');
  const [pickupIconXml, setPickupIconXml] = useState<string>('');
  const [editIconXml, setEditIconXml] = useState<string>('');
  const [showMenu, setShowMenu] = useState(false);
  const [chatIconXml, setChatIconXml] = useState<string>('');
  const [selectedBidId, setSelectedBidId] = useState<string | null>(null);
  const [pendingAcceptBidId, setPendingAcceptBidId] = useState<string | null>(null);
  const [showAcceptConfirm, setShowAcceptConfirm] = useState(false);
  const [callIconXml, setCallIconXml] = useState<string>('');
  const [acceptedBidId, setAcceptedBidId] = useState<string | null>(null);
  const acceptTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const insets = useSafeAreaInsets();

  const parsePrice = (price: string) => {
    const numeric = Number(price.replace(/[^\d.-]/g, ''));
    return Number.isNaN(numeric) ? 0 : numeric;
  };

  const formatTotal = (price: string, fee: number) => {
    const total = parsePrice(price) + fee;
    return total.toLocaleString('en-US');
  };

  useEffect(() => {
    const loadIcons = async () => {
      if (Platform.OS === 'web') return;
      const [cargoXml, pickupXml, editXml, chatXml, callXml] = await Promise.all([
        loadSvgFromAsset(cargoInfoSvg),
        loadSvgFromAsset(pickupDropSvg),
        loadSvgFromAsset(editButtonSvg),
        loadSvgFromAsset(chatBoxSvg),
        loadSvgFromAsset(callButtonSvg),
      ]);
      if (cargoXml) setCargoIconXml(cargoXml);
      if (pickupXml) setPickupIconXml(pickupXml);
      if (editXml) setEditIconXml(editXml);
      if (chatXml) setChatIconXml(chatXml);
      if (callXml) setCallIconXml(callXml);
    };
    loadIcons();
  }, []);

  useEffect(() => {
    if (acceptTimeoutRef.current) {
      clearTimeout(acceptTimeoutRef.current);
      acceptTimeoutRef.current = null;
    }
    if (acceptedBidId) {
      acceptTimeoutRef.current = setTimeout(() => {
        setAcceptedBidId(null);
      }, 60_000);
    }
    return () => {
      if (acceptTimeoutRef.current) {
        clearTimeout(acceptTimeoutRef.current);
        acceptTimeoutRef.current = null;
      }
    };
  }, [acceptedBidId]);

  // Pre-set accepted state when the quote itself is already accepted
  useEffect(() => {
    if (quote.status === 'Accepted') {
      setAcceptedBidId(mockBids[0].id);
    } else {
      setAcceptedBidId(null);
    }
  }, [quote.status]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace('/quotes');
            }
          }}
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={20} color="#222222" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, styles.fontSemi]}>Quotation Details</Text>
        <TouchableOpacity
          style={styles.moreButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          onPress={() => setShowMenu(prev => !prev)}
        >
          <Ionicons name="ellipsis-vertical" size={18} color="#555" />
        </TouchableOpacity>
      </View>

      {showMenu ? (
        <TouchableOpacity
          style={styles.menuOverlay}
          activeOpacity={1}
          onPress={() => setShowMenu(false)}
        >
          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setShowMenu(false);
                Alert.alert('Share', 'Share action triggered');
              }}
            >
              <Text style={[styles.menuText, styles.fontSemi]}>Share</Text>
            </TouchableOpacity>
            <View style={styles.menuDivider} />
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setShowMenu(false);
                Alert.alert('Help', 'Help action triggered');
              }}
            >
              <Text style={[styles.menuText, styles.fontSemi]}>Help</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ) : null}

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        <View style={styles.card}>
          <View style={styles.rowSpaceBetween}>
            <Text style={[styles.label, styles.fontSemi]}>Quote ID</Text>
            <View
              style={[
                styles.statusPill,
                quote.status === 'Accepted' ? styles.statusPillAccepted : undefined,
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  quote.status === 'Accepted' ? styles.statusTextAccepted : undefined,
                ]}
              >
                {quote.status}
              </Text>
            </View>
          </View>
          <Text style={[styles.quoteId, styles.fontSemi]}>#{quoteId}</Text>
        </View>

        {quote.status === 'Accepted' && quote.trip ? (
          <View style={styles.activeTripWrapper}>
            <TripCard
              tripId={quote.trip.tripId}
              status={quote.trip.status}
              pickupLocation={quote.trip.pickupLocation}
              dropLocation={quote.trip.dropLocation}
              progressStatus={quote.trip.progressStatus}
              vehicleType={quote.trip.vehicleType}
              licensePlate={quote.trip.licensePlate}
              driverName={quote.trip.driverName}
              distance={quote.trip.distance}
              date={quote.trip.date}
              weight={quote.trip.weight}
            />
          </View>
        ) : (
          <View style={styles.card}>
            <View style={styles.rowSpaceBetween}>
              <Text style={[styles.label, styles.fontSemi]}>Trip Status</Text>
              <View
                style={[
                  styles.tripStatusPill,
                  quote.tripStatus === 'Pending'
                    ? styles.tripStatusPending
                    : quote.tripStatus === 'Assigned'
                    ? styles.tripStatusAssigned
                    : undefined,
                ]}
              >
                <Text
                  style={[
                    styles.tripStatusText,
                    quote.tripStatus === 'Pending'
                      ? styles.tripStatusTextPending
                      : quote.tripStatus === 'Assigned'
                      ? styles.tripStatusTextAssigned
                      : undefined,
                  ]}
                >
                  {quote.tripStatus}
                </Text>
              </View>
            </View>
          </View>
        )}

        <LocationTimeline
          pickup={{ title: quote.pickup.title, address: quote.pickup.address, type: 'pickup' }}
          drop={{ title: quote.drop.title, address: quote.drop.address, type: 'drop' }}
          eta={quote.eta}
        />

        <View style={styles.tabSwitch}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'info' ? styles.tabButtonActive : undefined]}
            onPress={() => setActiveTab('info')}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabText, activeTab === 'info' ? styles.tabTextActive : undefined]}>Info</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'bids' ? styles.tabButtonActive : undefined]}
            onPress={() => setActiveTab('bids')}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabText, activeTab === 'bids' ? styles.tabTextActive : undefined]}>Bids</Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'info' ? (
          <>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.cardHeaderLeft}>
                  {Platform.OS === 'web' ? (
                    <ExpoImage source={cargoInfoSvg} style={styles.cardIconWeb} contentFit="contain" />
                  ) : cargoIconXml ? (
                    <SvgXml xml={cargoIconXml} width={32} height={32} />
                  ) : null}
                  <Text style={[styles.cardTitle, styles.fontSemi]}>Cargo Information</Text>
                </View>
                {Platform.OS === 'web' ? (
                  <ExpoImage source={editButtonSvg} style={styles.editIconWeb} contentFit="contain" />
                ) : editIconXml ? (
                  <SvgXml xml={editIconXml} width={16} height={16} />
                ) : null}
              </View>
              <View style={styles.row}>
                <Text style={[styles.rowLabel, styles.fontRegular]}>Cargo Type</Text>
                <Text style={[styles.rowValue, styles.fontSemi]}>{quote.cargo.type}</Text>
              </View>
              <View style={styles.row}>
                <Text style={[styles.rowLabel, styles.fontRegular]}>Product</Text>
                <Text style={[styles.rowValue, styles.fontSemi]}>{quote.cargo.product}</Text>
              </View>
              <View style={styles.row}>
                <Text style={[styles.rowLabel, styles.fontRegular]}>Weight</Text>
                <Text style={[styles.rowValue, styles.fontSemi]}>{quote.cargo.weight}</Text>
              </View>
            </View>

            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.cardHeaderLeft}>
                  {Platform.OS === 'web' ? (
                    <ExpoImage source={pickupDropSvg} style={styles.cardIconWeb} contentFit="contain" />
                  ) : pickupIconXml ? (
                    <SvgXml xml={pickupIconXml} width={32} height={32} />
                  ) : null}
                  <Text style={[styles.cardTitle, styles.fontSemi]}>Pickup & Drop Details</Text>
                </View>
                {Platform.OS === 'web' ? (
                  <ExpoImage source={editButtonSvg} style={styles.editIconWeb} contentFit="contain" />
                ) : editIconXml ? (
                  <SvgXml xml={editIconXml} width={16} height={16} />
                ) : null}
              </View>
              <View style={styles.row}>
                <Text style={[styles.rowLabel, styles.fontRegular]}>Pickup Location</Text>
                <Text style={[styles.rowValue, styles.fontSemi]}>{quote.pickup.title}</Text>
              </View>
              <View style={styles.row}>
                <Text style={[styles.rowLabel, styles.fontRegular]}>Drop Location</Text>
                <Text style={[styles.rowValue, styles.fontSemi]}>{quote.drop.title}</Text>
              </View>
              <View style={styles.row}>
                <Text style={[styles.rowLabel, styles.fontRegular]}>Pickup Date</Text>
                <Text style={[styles.rowValue, styles.fontSemi]}>{quote.schedule.pickupDate}</Text>
              </View>
              <View style={styles.row}>
                <Text style={[styles.rowLabel, styles.fontRegular]}>Pickup Time</Text>
                <Text style={[styles.rowValue, styles.fontSemi]}>{quote.schedule.pickupTime}</Text>
              </View>
              <View style={styles.row}>
                <Text style={[styles.rowLabel, styles.fontRegular]}>Expected Drop Date</Text>
                <Text style={[styles.rowValue, styles.fontSemi]}>{quote.schedule.dropDate}</Text>
              </View>
            </View>
          </>
        ) : acceptedBidId ? (
          <View style={styles.acceptedSection}>
            <Text style={[styles.acceptedTitle, styles.fontSemi]}>Accepted Bid</Text>
            {(() => {
              const bid = mockBids.find(b => b.id === acceptedBidId);
              if (!bid) return null;
              return (
                <>
                  <View style={styles.acceptedCard}>
                    <View style={styles.acceptedHeader}>
                      <View style={[styles.bidAvatarLarge, { backgroundColor: bid.color }]}>
                        <Text style={[styles.bidAvatarTextLarge, styles.fontSemi]}>{bid.vendor.charAt(0)}</Text>
                      </View>
                      <View style={styles.acceptedInfo}>
                        <View style={styles.acceptedTopRow}>
                          <Text style={[styles.bidVendor, styles.fontSemi]}>{bid.vendor}</Text>
                          {bid.verified ? (
                            <View style={styles.badge}>
                              <Ionicons name="shield-checkmark-outline" size={12} color="#1F8F6B" />
                              <Text style={[styles.badgeText, styles.fontSemi]}>Verified</Text>
                            </View>
                          ) : null}
                        </View>
                        <TouchableOpacity
                          style={styles.callCircle}
                          onPress={() => Alert.alert('Call', 'Calling the truck owner')}
                        >
                          {callIconXml ? (
                            <SvgXml xml={callIconXml} width={32} height={32} />
                          ) : (
                            <Ionicons name="call-outline" size={18} color="#C8202F" />
                          )}
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                  <View style={styles.acceptedPrices}>
                    <View style={styles.modalRow}>
                      <Text style={[styles.modalLabel, styles.fontSemi]}>Bid Price</Text>
                      <Text style={[styles.modalValue, styles.fontSemi]}>{bid.price}</Text>
                    </View>
                    <View style={styles.modalRow}>
                      <Text style={[styles.modalLabel, styles.fontSemi]}>Platform Fee</Text>
                      <Text style={[styles.modalValue, styles.fontSemi]}>Tsh 100</Text>
                    </View>
                    <View style={styles.modalDivider} />
                    <View style={styles.modalRow}>
                      <Text style={[styles.modalLabel, styles.fontSemi]}>Total Price</Text>
                      <Text style={[styles.modalTotal, styles.fontSemi]}>Tsh {formatTotal(bid.price, 100)}</Text>
                    </View>
                  </View>
                </>
              );
            })()}
          </View>
        ) : (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={[styles.cardTitle, styles.fontSemi]}>Bids</Text>
            </View>
            {mockBids.map(bid => (
              <TouchableOpacity
                key={bid.id}
                style={styles.bidCard}
                activeOpacity={0.8}
                onPress={() => setSelectedBidId(bid.id)}
              >
                <View style={styles.bidLeft}>
                  <View style={[styles.bidAvatar, { backgroundColor: bid.color }]}>
                    <Text style={[styles.bidAvatarText, styles.fontSemi]}>
                      {bid.vendor.charAt(0)}
                    </Text>
                  </View>
                  <View style={styles.bidInfo}>
                    <Text style={[styles.bidVendor, styles.fontSemi]}>{bid.vendor}</Text>
                    {bid.verified ? (
                      <View style={styles.badge}>
                        <Ionicons name="shield-checkmark-outline" size={12} color="#1F8F6B" />
                        <Text style={[styles.badgeText, styles.fontSemi]}>Verified</Text>
                      </View>
                    ) : null}
                  </View>
                </View>
                <Text style={[styles.bidPrice, styles.fontSemi]}>{bid.price}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={{ height: 32 }} />
      </ScrollView>

      <Modal
        visible={!!selectedBidId}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedBidId(null)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setSelectedBidId(null)}
        >
          <View style={[styles.bidModalCard, { paddingBottom: 12 + insets.bottom }]}>
            {(() => {
              const bid = mockBids.find(b => b.id === selectedBidId);
              if (!bid) return null;
              return (
                <>
          <View style={styles.modalHandle} />
          <View style={styles.modalHeader}>
            <View style={[styles.bidAvatar, { backgroundColor: bid.color }]}>
              <Text style={[styles.bidAvatarText, styles.fontSemi]}>{bid.vendor.charAt(0)}</Text>
            </View>
            <View style={styles.modalVendorBlock}>
              <Text style={[styles.bidVendor, styles.fontSemi]}>{bid.vendor}</Text>
              {bid.verified ? (
                <View style={styles.badge}>
                  <Ionicons name='shield-checkmark-outline' size={12} color='#1F8F6B' />
                  <Text style={[styles.badgeText, styles.fontSemi]}>Verified</Text>
                </View>
              ) : null}
            </View>
            <TouchableOpacity
              style={styles.chatCircle}
              onPress={() => {
                setSelectedBidId(null);
                Alert.alert('Chat', 'Opening chat');
              }}
            >
              {chatIconXml ? (
                <SvgXml xml={chatIconXml} width={42} height={42} />
              ) : (
                <Ionicons name='chatbubble-ellipses-outline' size={18} color='#C8202F' />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.modalRow}>
            <Text style={[styles.modalLabel, styles.fontSemi]}>Bid Price</Text>
            <Text style={[styles.modalValue, styles.fontSemi]}>{bid.price}</Text>
          </View>
          <View style={styles.modalRow}>
            <Text style={[styles.modalLabel, styles.fontSemi]}>Platform Fee</Text>
            <Text style={[styles.modalValue, styles.fontSemi]}>Tsh 100</Text>
          </View>
          <View style={styles.modalDivider} />
          <View style={styles.modalRow}>
            <Text style={[styles.modalLabel, styles.fontSemi]}>Total Price</Text>
            <Text style={[styles.modalTotal, styles.fontSemi]}>Tsh {formatTotal(bid.price, 100)}</Text>
          </View>

          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalButtonSecondary]}
              onPress={() => {
                setSelectedBidId(null);
                Alert.alert('Reject', 'Bid rejected');
              }}
            >
              <Text style={[styles.modalButtonSecondaryText, styles.fontSemi]}>Reject</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalButtonPrimary]}
              onPress={() => {
                setPendingAcceptBidId(selectedBidId);
                setSelectedBidId(null);
                setShowAcceptConfirm(true);
              }}
            >
              <Text style={[styles.modalButtonPrimaryText, styles.fontSemi]}>Accept</Text>
            </TouchableOpacity>
          </View>
                </>
              );
            })()}
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal
        visible={showAcceptConfirm}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAcceptConfirm(false)}
      >
        <View style={styles.centerOverlay}>
          <Pressable style={styles.centerBackdrop} onPress={() => setShowAcceptConfirm(false)} />
          <View style={[styles.confirmCard, { paddingBottom: 16 + insets.bottom }]}>
            <View style={styles.modalHandle} />
            <Text style={[styles.confirmTitle, styles.fontSemi]}>Accept this offer?</Text>
            <Text style={[styles.confirmBody, styles.fontRegular]}>
              By accepting, you agree to the quoted price and terms. The truck owner will be notified immediately.
            </Text>
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonSecondary]}
                onPress={() => setShowAcceptConfirm(false)}
              >
                <Text style={[styles.modalButtonSecondaryText, styles.fontSemi]}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonPrimary]}
                onPress={() => {
                  setShowAcceptConfirm(false);
                  if (pendingAcceptBidId) {
                    setAcceptedBidId(pendingAcceptBidId);
                  }
                  setPendingAcceptBidId(null);
                }}
              >
                <Text style={[styles.modalButtonPrimaryText, styles.fontSemi]}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    color: '#111111',
  },
  moreButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    ...(Platform.OS === 'web'
      ? { boxShadow: '0px 2px 6px rgba(0,0,0,0.08)' }
      : {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 6,
          elevation: 4,
        }),
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: '#444',
  },
  statusPill: {
    backgroundColor: '#FFEFD3',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  statusPillAccepted: {
    backgroundColor: '#C8F4E3',
  },
  statusText: {
    color: '#D19000',
    fontSize: 12,
  },
  statusTextAccepted: {
    color: '#1F8F6B',
  },
  activeTripWrapper: {
    marginBottom: 16,
  },
  tripStatusPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: '#F0F0F0',
  },
  tripStatusPending: {
    backgroundColor: '#FFF5C2',
  },
  tripStatusAssigned: {
    backgroundColor: '#DCEBFF',
  },
  tripStatusText: {
    fontSize: 12,
    color: '#444',
  },
  tripStatusTextPending: {
    color: '#A67C00',
  },
  tripStatusTextAssigned: {
    color: '#1B4C9E',
  },
  quoteId: {
    fontSize: 12,
    lineHeight: 12,
    letterSpacing: 0,
    color: '#111',
    fontWeight: '600',  },
  timelineCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    ...(Platform.OS === 'web'
      ? { boxShadow: '0px 2px 6px rgba(0,0,0,0.08)' }
      : {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 6,
          elevation: 4,
        }),
  },
  timelineRow: {
    position: 'absolute',
    top: 16,
    left: 10,
    bottom: 16,
    width: 14,
    alignItems: 'center',
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  timelineDotRed: {
    backgroundColor: '#C8202F',
  },
  timelineDotTeal: {
    backgroundColor: '#1A6B6B',
    position: 'absolute',
    bottom: 0,
  },
  timelineLine: {
    position: 'absolute',
    top: 16,
    bottom: 16,
    width: 2,
    borderLeftWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#C5C5C5',
  },
  timelineContent: {
    paddingLeft: 32,
    gap: 12,
  },
  pointBlock: {
    gap: 4,
  },
  pointTitle: {
    fontSize: 16,
    color: '#111',
  },
  pointSubtitle: {
    fontSize: 13,
    color: '#666',
  },
  etaPill: {
    alignSelf: 'flex-start',
    backgroundColor: '#FDE6E6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
  },
  etaText: {
    color: '#C8202F',
    fontSize: 13,
  },
  tabSwitch: {
    flexDirection: 'row',
    backgroundColor: '#F3F3F3',
    borderRadius: 16,
    padding: 4,
    marginBottom: 16,
    marginTop: 12,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButtonActive: {
    backgroundColor: '#FFFFFF',
  },
  tabText: {
    fontSize: 15,
    color: '#7A7A7A',
  },
  tabTextActive: {
    color: '#C8202F',
  },
  emptyState: {
    alignItems: 'center',
    gap: 6,
    paddingVertical: 12,
  },
  emptyText: {
    fontSize: 14,
    color: '#222',
  },
  emptySubtext: {
    fontSize: 12,
    color: '#777',
  },
  bidCard: {
    width: 343,
    height: 68,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  bidLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  bidVendor: {
    fontSize: 15,
    color: '#111',
  },
  bidPrice: {
    fontSize: 16,
    color: '#C8202F',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    paddingHorizontal: 0,
    paddingBottom: 0,
  },
  bidModalCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 20,
    paddingTop: 20,
    ...(Platform.OS === 'web'
      ? { boxShadow: '0px 8px 20px rgba(0,0,0,0.12)' }
      : {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.12,
          shadowRadius: 16,
          elevation: 8,
        }),
  },
  modalHandle: {
    width: 48,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D9D9D9',
    alignSelf: 'center',
    marginBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  modalVendorBlock: {
    flex: 1,
    marginLeft: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  chatCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFEFF0',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  modalLabel: {
    fontSize: 16,
    color: '#555555',
  },
  modalValue: {
    fontSize: 16,
    color: '#111111',
  },
  modalTotal: {
    fontSize: 16,
    color: '#C8202F',
    fontWeight: '700',
  },
  modalDivider: {
    height: 1,
    backgroundColor: '#E6E6E6',
    marginVertical: 12,
  },
  modalFooter: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonSecondary: {
    backgroundColor: '#FEF2F2',
  },
  modalButtonPrimary: {
    backgroundColor: '#C8202F',
  },
  modalButtonSecondaryText: {
    fontSize: 16,
    color: '#C8202F',
  },
  modalButtonPrimaryText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  centerOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    paddingHorizontal: 0,
    paddingBottom: 0,
  },
  centerBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  confirmCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingHorizontal: 20,
    paddingTop: 20,
    ...(Platform.OS === 'web'
      ? { boxShadow: '0px 8px 20px rgba(0,0,0,0.12)' }
      : {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.12,
          shadowRadius: 16,
          elevation: 8,
        }),
  },
  confirmTitle: {
    fontSize: 18,
    color: '#111111',
    marginBottom: 12,
  },
  confirmBody: {
    fontSize: 15,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 22,
  },
  acceptedSection: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  acceptedTitle: {
    fontSize: 16,
    color: '#111111',
    marginBottom: 8,
  },
  acceptedCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E6E6E6',
  },
  acceptedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  acceptedInfo: {
    flex: 1,
    marginLeft: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  acceptedTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bidAvatarLarge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bidAvatarTextLarge: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  callCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFF2F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptedPrices: {
    marginTop: 16,
  },
  bidAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bidAvatarText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  bidInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#D1FBE8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 12,
    color: '#0F8B6A',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardTitle: {
    fontSize: 16,
    color: '#111',
  },
  cardIconWeb: {
    width: 18,
    height: 18,
  },
  editIconWeb: {
    width: 24,
    height: 24,
  },
  menuOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 20,
  },
  menuContainer: {
    position: 'absolute',
    top: 105, // position just below the three-dot button
    right: 16,
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    paddingVertical: 8,
    width: 140,
    ...(Platform.OS === 'web'
      ? { boxShadow: '0px 4px 12px rgba(0,0,0,0.15)' }
      : {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 12,
          elevation: 6,
        }),
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  menuText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#4A4A4A',
    marginHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  rowLabel: {
    fontSize: 14,
    color: '#666',
  },
  rowValue: {
    fontSize: 14,
    color: '#111',
  },
  fontSemi: {
    fontFamily: Platform.select({
      ios: 'Figtree-SemiBold',
      android: 'Figtree-SemiBold',
      web: 'Figtree',
      default: 'Figtree',
    }),
  },
  fontRegular: {
    fontFamily: Platform.select({
      ios: 'Figtree-Regular',
      android: 'Figtree-Regular',
      web: 'Figtree',
      default: 'Figtree',
    }),
  },
});
