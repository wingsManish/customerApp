import React, { useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Switch, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const router = useRouter();
  const [sms, setSms] = useState(true);
  const [whatsapp, setWhatsapp] = useState(false);
  const [push, setPush] = useState(false);

  const fontSemi = useMemo(
    () =>
      Platform.select({
        ios: 'Figtree-SemiBold',
        android: 'Figtree-SemiBold',
        web: 'Figtree',
        default: 'Figtree',
      }),
    []
  );
  const fontRegular = useMemo(
    () =>
      Platform.select({
        ios: 'Figtree-Regular',
        android: 'Figtree-Regular',
        web: 'Figtree',
        default: 'Figtree',
      }),
    []
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style="dark" backgroundColor="#FFFFFF" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backCircle} onPress={() => router.back()} activeOpacity={0.8}>
            <Ionicons name="arrow-back" size={20} color="#222" />
          </TouchableOpacity>
          <Text style={[styles.title, { fontFamily: fontSemi }]}>Settings</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { fontFamily: fontSemi }]}>Notifications</Text>
          <Text style={[styles.sectionDesc, { fontFamily: fontRegular }]}>
            Turn this on for real-time updates on trips, bids, and truck activities.
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={[styles.rowLabel, { fontFamily: fontRegular }]}>SMS</Text>
            <Switch
              value={sms}
              onValueChange={setSms}
              trackColor={{ false: '#E6E6E6', true: '#C8202F' }}
              thumbColor={sms ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={[styles.rowLabel, { fontFamily: fontRegular }]}>Whatsapp</Text>
            <Switch
              value={whatsapp}
              onValueChange={setWhatsapp}
              trackColor={{ false: '#E6E6E6', true: '#C8202F' }}
              thumbColor={whatsapp ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={[styles.rowLabel, { fontFamily: fontRegular }]}>Push Notification</Text>
            <Switch
              value={push}
              onValueChange={setPush}
              trackColor={{ false: '#E6E6E6', true: '#C8202F' }}
              thumbColor={push ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.deleteBtn} activeOpacity={0.9}>
          <Text style={[styles.deleteText, { fontFamily: fontSemi }]}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 8,
  },
  backCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F3F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    color: '#111111',
  },
  section: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#111111',
    marginBottom: 6,
  },
  sectionDesc: {
    fontSize: 13,
    color: '#666666',
    lineHeight: 19,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  rowLabel: {
    fontSize: 14,
    color: '#111111',
  },
  divider: {
    height: 1,
    backgroundColor: '#EFEFEF',
    marginHorizontal: -16,
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  deleteBtn: {
    width: '100%',
    backgroundColor: '#F9E6E8',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
  },
  deleteText: {
    color: '#C8202F',
    fontSize: 15,
  },
});
