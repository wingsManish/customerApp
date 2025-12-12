import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const mockCompany = {
  owner: 'David Beckham',
  phone: '+255 546 457 254',
  email: 'davidbeckham@gmail.com',
};

export default function CompanyDetailsScreen() {
  const router = useRouter();

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

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style="dark" backgroundColor="#FFFFFF" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backCircle} onPress={() => router.back()} activeOpacity={0.8}>
          <Ionicons name="arrow-back" size={20} color="#222" />
        </TouchableOpacity>
        <Text style={[styles.title, { fontFamily: fontSemi }]}>Company Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.headerLeft}>
            <Ionicons name="business-outline" size={18} color="#C8202F" />
            <Text style={[styles.cardTitle, { fontFamily: fontSemi }]}>Owner Info</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/profile/edit-company')} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Ionicons name="create-outline" size={18} color="#C8202F" />
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <Text style={[styles.label, { fontFamily: fontRegular }]}>Name</Text>
          <Text style={[styles.value, { fontFamily: fontSemi }]}>{mockCompany.owner}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, { fontFamily: fontRegular }]}>Phone</Text>
          <Text style={[styles.value, { fontFamily: fontSemi }]}>{mockCompany.phone}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, { fontFamily: fontRegular }]}>Email ID</Text>
          <Text style={[styles.value, { fontFamily: fontSemi }]}>{mockCompany.email}</Text>
        </View>
      </View>
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
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    marginHorizontal: 16,
    marginTop: 12,
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardTitle: {
    fontSize: 16,
    color: '#111111',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  label: {
    fontSize: 13,
    color: '#777777',
  },
  value: {
    fontSize: 13,
    color: '#111111',
  },
});
