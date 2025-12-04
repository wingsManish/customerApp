import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, Platform } from 'react-native';
import Flag from 'react-native-country-flag';

// Common countries with their codes
const COUNTRIES = [
  { code: 'TZ', name: 'Tanzania', callingCode: '255' },
  { code: 'KE', name: 'Kenya', callingCode: '254' },
  { code: 'UG', name: 'Uganda', callingCode: '256' },
  { code: 'RW', name: 'Rwanda', callingCode: '250' },
  { code: 'ZA', name: 'South Africa', callingCode: '27' },
  { code: 'GH', name: 'Ghana', callingCode: '233' },
  { code: 'NG', name: 'Nigeria', callingCode: '234' },
  { code: 'EG', name: 'Egypt', callingCode: '20' },
  { code: 'IN', name: 'India', callingCode: '91' },
  { code: 'US', name: 'United States', callingCode: '1' },
  { code: 'GB', name: 'United Kingdom', callingCode: '44' },
  { code: 'CA', name: 'Canada', callingCode: '1' },
  { code: 'AU', name: 'Australia', callingCode: '61' },
  { code: 'DE', name: 'Germany', callingCode: '49' },
  { code: 'FR', name: 'France', callingCode: '33' },
  { code: 'IT', name: 'Italy', callingCode: '39' },
  { code: 'ES', name: 'Spain', callingCode: '34' },
  { code: 'BR', name: 'Brazil', callingCode: '55' },
  { code: 'MX', name: 'Mexico', callingCode: '52' },
  { code: 'CN', name: 'China', callingCode: '86' },
  { code: 'JP', name: 'Japan', callingCode: '81' },
  { code: 'KR', name: 'South Korea', callingCode: '82' },
  { code: 'AE', name: 'United Arab Emirates', callingCode: '971' },
  { code: 'SA', name: 'Saudi Arabia', callingCode: '966' },
];

export interface Country {
  code: string;
  name: string;
  callingCode: string;
}

interface CountryCodePickerProps {
  selectedCountry: Country;
  onSelect: (country: Country) => void;
  fontFamily?: string;
}

export const CountryCodePicker: React.FC<CountryCodePickerProps> = ({
  selectedCountry,
  onSelect,
  fontFamily,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (country: Country) => {
    onSelect(country);
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.flagContainer}>
          <Flag isoCode={selectedCountry.code} size={20} />
        </View>
        <Text style={[styles.callingCode, fontFamily && { fontFamily }]}>
          +{selectedCountry.callingCode}
        </Text>
        <Text style={styles.chevron}>▼</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, fontFamily && { fontFamily }]}>
                Select Country
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={COUNTRIES}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.countryItem,
                    selectedCountry.code === item.code && styles.selectedCountry,
                  ]}
                  onPress={() => handleSelect(item)}
                >
                  <View style={styles.countryFlagContainer}>
                    <Flag isoCode={item.code} size={24} />
                  </View>
                  <Text style={[styles.countryName, fontFamily && { fontFamily }]}>
                    {item.name}
                  </Text>
                  <Text style={[styles.countryCode, fontFamily && { fontFamily }]}>
                    +{item.callingCode}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  flagContainer: {
    marginRight: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  callingCode: {
    fontSize: 16,
    color: '#000000',
    marginRight: 4,
  },
  chevron: {
    fontSize: 10,
    color: '#666666',
    marginLeft: 2,
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
    maxHeight: '80%',
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: Platform.OS === 'web' ? '600' : 'normal',
    color: '#000000',
  },
  closeButton: {
    padding: 4,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#666666',
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  selectedCountry: {
    backgroundColor: '#F0F0F0',
  },
  countryFlagContainer: {
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countryName: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
  },
  countryCode: {
    fontSize: 16,
    color: '#666666',
    marginLeft: 8,
  },
});

