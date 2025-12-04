import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { loadSvgFromAsset } from '@/utils/svgLoader';

const horizontalArrowSvg = require('@/assets/screen-asset/horizontal-arrow.svg');
const containerSvg = require('@/assets/screen-asset/container.svg');
const weightSvg = require('@/assets/screen-asset/weight.svg');

interface QuoteCardProps {
  quoteId: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  pickupLocation: string;
  dropLocation: string;
  cargoType?: string;
  bodyType?: string;
  weight?: string;
  onPress?: () => void;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({
  quoteId,
  status,
  pickupLocation,
  dropLocation,
  cargoType,
  bodyType,
  weight,
  onPress,
}) => {
  const [arrowXml, setArrowXml] = useState<string>('');
  const [containerXml, setContainerXml] = useState<string>('');
  const [weightXml, setWeightXml] = useState<string>('');

  useEffect(() => {
    const loadSvgs = async () => {
      const icons = [
        { source: horizontalArrowSvg, setter: setArrowXml },
        { source: containerSvg, setter: setContainerXml },
        { source: weightSvg, setter: setWeightXml },
      ];

      for (const { source, setter } of icons) {
        if (Platform.OS === 'web') {
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
      case 'Pending':
        return '#FFF3E0';
      case 'Approved':
        return '#E8F5E9';
      case 'Rejected':
        return '#FFEBEE';
      default:
        return '#F5F5F5';
    }
  };

  const getStatusTextColor = () => {
    switch (status) {
      case 'Pending':
        return '#FF9800';
      case 'Approved':
        return '#4CAF50';
      case 'Rejected':
        return '#F44336';
      default:
        return '#666666';
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <Text style={[styles.quoteId, { fontFamily: fontFamilySemiBold }]}>#{quoteId}</Text>
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

      {(cargoType || bodyType || weight) && (
        <View style={styles.detailsRow}>
          {cargoType && (
            <View style={[styles.detailItem, styles.detailItemLeft]}>
              {Platform.OS === 'web' ? (
                <Image source={containerSvg} style={styles.detailIcon} contentFit="contain" />
              ) : (
                containerXml ? <SvgXml xml={containerXml} width={16} height={16} /> : null
              )}
              <Text style={[styles.detailText, { fontFamily: fontFamilyRegular }]}>{cargoType}</Text>
            </View>
          )}
          {bodyType && (
            <View style={[styles.detailItem, styles.detailItemCenter]}>
              <Ionicons name="car-outline" size={14} color="#666666" />
              <Text style={[styles.detailText, { fontFamily: fontFamilyRegular }]}>{bodyType}</Text>
            </View>
          )}
          {weight && (
            <View style={[styles.detailItem, styles.detailItemRight]}>
              {Platform.OS === 'web' ? (
                <Image source={weightSvg} style={styles.detailIcon} contentFit="contain" />
              ) : (
                weightXml ? <SvgXml xml={weightXml} width={16} height={16} /> : null
              )}
              <Text style={[styles.detailText, { fontFamily: fontFamilyRegular }]}>{weight}</Text>
            </View>
          )}
        </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  quoteId: {
    fontSize: 14,
    fontWeight: Platform.OS === 'web' ? '600' : 'normal',
    color: '#C8202F',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: Platform.OS === 'web' ? '600' : 'normal',
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
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
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
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
  arrowIcon: {
    width: 14,
    height: 9,
  },
  detailIcon: {
    width: 16,
    height: 16,
  },
});

