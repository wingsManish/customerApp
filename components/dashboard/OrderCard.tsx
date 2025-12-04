import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface OrderCardProps {
  orderId: string;
  pickupLocation: string;
  dropLocation: string;
  time: string;
  status: 'new' | 'pickup' | 'delivery' | 'completed';
  onPress?: () => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({
  orderId,
  pickupLocation,
  dropLocation,
  time,
  status,
  onPress,
}) => {
  const router = useRouter();

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

  const statusColors = {
    new: '#FFA500',
    pickup: '#4CAF50',
    delivery: '#2196F3',
    completed: '#9E9E9E',
  };

  const statusLabels = {
    new: 'New Order',
    pickup: 'Pickup',
    delivery: 'Delivery',
    completed: 'Completed',
  };

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push(`/order-details/${orderId}`);
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress} activeOpacity={0.7}>
      <View style={styles.header}>
        <Text style={[styles.orderId, { fontFamily: fontFamilySemiBold }]}>
          Order #{orderId}
        </Text>
        <View style={[styles.statusBadge, { backgroundColor: statusColors[status] }]}>
          <Text style={[styles.statusText, { fontFamily: fontFamilyRegular }]}>
            {statusLabels[status]}
          </Text>
        </View>
      </View>

      <View style={styles.locationContainer}>
        <View style={styles.locationRow}>
          <Ionicons name="location" size={16} color="#C8202F" />
          <Text style={[styles.location, { fontFamily: fontFamilyRegular }]} numberOfLines={1}>
            {pickupLocation}
          </Text>
        </View>
        <View style={styles.locationRow}>
          <Ionicons name="location" size={16} color="#4CAF50" />
          <Text style={[styles.location, { fontFamily: fontFamilyRegular }]} numberOfLines={1}>
            {dropLocation}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.timeRow}>
          <Ionicons name="time-outline" size={14} color="#666666" />
          <Text style={[styles.time, { fontFamily: fontFamilyRegular }]}>{time}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#999999" />
      </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderId: {
    fontSize: 16,
    fontWeight: Platform.OS === 'web' ? '600' : 'normal',
    color: '#000000',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: Platform.OS === 'web' ? '500' : 'normal',
  },
  locationContainer: {
    gap: 8,
    marginBottom: 12,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  location: {
    fontSize: 14,
    color: '#666666',
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  time: {
    fontSize: 12,
    color: '#666666',
  },
});

