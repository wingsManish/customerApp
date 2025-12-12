import React, { useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  Modal,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import DateTimePicker, { DateTimePickerAndroid, Event } from '@react-native-community/datetimepicker';

export default function AddQuotePickupDropScreen() {
  const router = useRouter();
  const [pickupDate, setPickupDate] = useState<Date | null>(null);
  const [pickupTime, setPickupTime] = useState<Date | null>(null);
  const [dropDate, setDropDate] = useState<Date | null>(null);
  const [showInlinePicker, setShowInlinePicker] = useState(false);
  const [pickerMode, setPickerMode] = useState<'date' | 'time'>('date');
  const [pickerTarget, setPickerTarget] = useState<'pickupDate' | 'pickupTime' | 'dropDate'>('pickupDate');
  const [tempPickerValue, setTempPickerValue] = useState<Date>(new Date());
  const pickerValue = useMemo(() => {
    if (pickerTarget === 'pickupDate') return pickupDate || new Date();
    if (pickerTarget === 'pickupTime') return pickupTime || new Date();
    return dropDate || new Date();
  }, [pickerTarget, pickupDate, pickupTime, dropDate]);

  const fontSemi = Platform.select({
    ios: 'Figtree-SemiBold',
    android: 'Figtree-SemiBold',
    web: 'Figtree',
    default: 'Figtree',
  });
  const fontRegular = Platform.select({
    ios: 'Figtree-Regular',
    android: 'Figtree-Regular',
    web: 'Figtree',
    default: 'Figtree',
  });

  const openPicker = (target: 'pickupDate' | 'pickupTime' | 'dropDate', mode: 'date' | 'time') => {
    setPickerTarget(target);
    setPickerMode(mode);
    setTempPickerValue(
      target === 'pickupDate'
        ? pickupDate || new Date()
        : target === 'pickupTime'
        ? pickupTime || new Date()
        : dropDate || new Date()
    );

    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        mode,
        value:
          target === 'pickupDate'
            ? pickupDate || new Date()
            : target === 'pickupTime'
            ? pickupTime || new Date()
            : dropDate || new Date(),
        onChange: (_event, selectedDate) => {
          if (!selectedDate) return;
          if (target === 'pickupDate') setPickupDate(selectedDate);
          if (target === 'pickupTime') setPickupTime(selectedDate);
          if (target === 'dropDate') setDropDate(selectedDate);
        },
      });
    } else {
      setShowInlinePicker(true);
    }
  };

  const renderDateRow = (label: string, value: string, onPress: () => void, icon: React.ReactNode) => (
    <TouchableOpacity activeOpacity={0.85} style={styles.inputRow} onPress={onPress}>
      <Text style={[styles.inputPlaceholder, value ? styles.inputValue : undefined, { fontFamily: fontRegular }]}>
        {value || label}
      </Text>
      {icon}
    </TouchableOpacity>
  );

  const formatDate = (d: Date | null) => (d ? d.toLocaleDateString() : '');
  const formatTime = (d: Date | null) =>
    d
      ? d.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })
      : '';

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style="dark" backgroundColor="#FFFFFF" />

      <View style={styles.progressContainer}>
        <View style={styles.progressTrack}>
          <View style={styles.progressFill} />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { fontFamily: fontSemi }]}>Pickup & Drop Details</Text>

        <View style={styles.inputRow}>
          <TextInput
            placeholder="Pickup Location"
            placeholderTextColor="#9A9A9A"
            style={[styles.textInput, { fontFamily: fontRegular }]}
          />
          <Ionicons name="location-outline" size={18} color="#606060" />
        </View>
        <View style={styles.inputRow}>
          <TextInput
            placeholder="Drop Location"
            placeholderTextColor="#9A9A9A"
            style={[styles.textInput, { fontFamily: fontRegular }]}
          />
          <Ionicons name="location-outline" size={18} color="#606060" />
        </View>
        {renderDateRow(
          'Pickup Date',
          formatDate(pickupDate),
          () => openPicker('pickupDate', 'date'),
          <Ionicons name="calendar-outline" size={18} color="#606060" />
        )}
        {renderDateRow(
          'Pickup Time',
          formatTime(pickupTime),
          () => openPicker('pickupTime', 'time'),
          <Ionicons name="time-outline" size={18} color="#606060" />
        )}
        {renderDateRow(
          'Expected Drop Date',
          formatDate(dropDate),
          () => openPicker('dropDate', 'date'),
          <Ionicons name="calendar-outline" size={18} color="#606060" />
        )}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.footerButton, styles.footerButtonSecondary]}
          activeOpacity={0.8}
          onPress={() => router.back()}
        >
          <Text style={[styles.footerButtonTextSecondary, { fontFamily: fontSemi }]}>
            Previous
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.footerButton, styles.footerButtonPrimary]}
          activeOpacity={0.8}
          onPress={() => router.push('/add-quote/success')}
        >
          <Text style={[styles.footerButtonTextPrimary, { fontFamily: fontSemi }]}>Next</Text>
        </TouchableOpacity>
      </View>
      {showInlinePicker ? (
        <Modal transparent animationType="fade" visible onRequestClose={() => setShowInlinePicker(false)}>
          <View style={styles.modalOverlay}>
            <TouchableOpacity style={styles.modalBackdrop} activeOpacity={1} onPress={() => setShowInlinePicker(false)} />
            <View style={styles.modalCard}>
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={() => setShowInlinePicker(false)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                  <Text style={[styles.modalAction, { fontFamily: fontSemi }]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (pickerTarget === 'pickupDate') setPickupDate(tempPickerValue);
                    if (pickerTarget === 'pickupTime') setPickupTime(tempPickerValue);
                    if (pickerTarget === 'dropDate') setDropDate(tempPickerValue);
                    setShowInlinePicker(false);
                  }}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Text style={[styles.modalAction, styles.modalActionPrimary, { fontFamily: fontSemi }]}>Done</Text>
                </TouchableOpacity>
              </View>
              <DateTimePicker
                value={tempPickerValue}
                mode={pickerMode}
                display="spinner"
                onChange={(event: Event, date?: Date) => {
                  if (event.type === 'dismissed') {
                    return;
                  }
                  if (!date) return;
                  setTempPickerValue(date);
                }}
                style={{ backgroundColor: '#fff' }}
                themeVariant="light"
              />
            </View>
          </View>
        </Modal>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  progressContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E0E0E0',
    overflow: 'hidden',
  },
  progressFill: {
    width: '75%',
    height: '100%',
    backgroundColor: '#C8202F',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    color: '#111111',
    marginBottom: 20,
  },
  inputRow: {
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: '#111111',
    paddingRight: 10,
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  footerButton: {
    flex: 1,
    height: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerButtonSecondary: {
    backgroundColor: '#F1F1F1',
  },
  footerButtonPrimary: {
    backgroundColor: '#C8202F',
  },
  footerButtonTextSecondary: {
    fontSize: 16,
    color: '#1A1A1A',
  },
  footerButtonTextPrimary: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingBottom: Platform.OS === 'ios' ? 28 : 12,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 6,
  },
  modalAction: {
    fontSize: 16,
    color: '#555',
  },
  modalActionPrimary: {
    color: '#C8202F',
  },
});
