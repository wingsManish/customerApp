import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function EditCompanyScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

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
        <Text style={[styles.title, { fontFamily: fontSemi }]}>Edit Company Info</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <TextInput
          placeholder="Name"
          placeholderTextColor="#9A9A9A"
          style={[styles.input, { fontFamily: fontRegular }]}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="Phone Number"
          placeholderTextColor="#9A9A9A"
          style={[styles.input, { fontFamily: fontRegular }]}
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
        <TextInput
          placeholder="Email ID"
          placeholderTextColor="#9A9A9A"
          style={[styles.input, { fontFamily: fontRegular }]}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.updateBtn}
          activeOpacity={0.9}
          onPress={() => router.push('/profile/terms')}
        >
          <Text style={[styles.updateText, { fontFamily: fontSemi }]}>Update</Text>
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
  scroll: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 14,
    color: '#111111',
    marginBottom: 14,
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  updateBtn: {
    backgroundColor: '#C8202F',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  updateText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
