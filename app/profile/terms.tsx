import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  Modal,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type Sheet = 'none' | 'help';

const sections = [
  {
    title: 'Last Revised',
    body: 'December 16, 2013',
  },
  {
    title: 'Your Agreement',
    body:
      'By using this site, you agree to be bound by these Terms and Conditions. If you do not agree, please discontinue use.',
  },
  {
    title: 'Changes to Terms',
    body:
      'We may change, modify, or alter these Terms at any time. Please review them periodically, as continued use constitutes acceptance.',
  },
  {
    title: 'Privacy',
    body: 'Please review our Privacy Policy to understand how we handle your information.',
  },
  {
    title: 'Linked Sites',
    body:
      'This site may contain links to independent third-party websites. We are not responsible for their content or practices.',
  },
  {
    title: 'Disclaimer',
    body:
      'The site is provided on an “as is” basis. We disclaim all warranties of any kind and are not liable for inaccuracies or errors.',
  },
];

export default function TermsScreen() {
  const router = useRouter();
  const [sheet, setSheet] = useState<Sheet>('none');

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

  const openHelp = () => setSheet('help');
  const closeHelp = () => setSheet('none');

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style="dark" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backCircle} onPress={() => router.back()} activeOpacity={0.8}>
          <Ionicons name="arrow-back" size={20} color="#222" />
        </TouchableOpacity>
        <Text style={[styles.title, { fontFamily: fontSemi }]}>Terms &amp; Conditions</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.metaCard}>
          <View style={styles.metaRow}>
            <Ionicons name="time-outline" size={18} color="#C8202F" />
            <Text style={[styles.metaText, { fontFamily: fontRegular }]}>Please review carefully</Text>
          </View>
          <Text style={[styles.metaSub, { fontFamily: fontRegular }]}>
            These terms outline the rules and guidelines for using our services.
          </Text>
        </View>

        {sections.map((item) => (
          <View key={item.title} style={styles.section}>
            <Text style={[styles.sectionTitle, { fontFamily: fontSemi }]}>{item.title}</Text>
            <Text style={[styles.sectionBody, { fontFamily: fontRegular }]}>{item.body}</Text>
          </View>
        ))}

        <TouchableOpacity style={styles.helpRow} activeOpacity={0.9} onPress={openHelp}>
          <View style={styles.helpLeft}>
            <Ionicons name="headset-outline" size={18} color="#C8202F" />
            <Text style={[styles.helpTitle, { fontFamily: fontSemi }]}>Need help?</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#C8202F" />
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.acceptBtn} activeOpacity={0.9} onPress={openHelp}>
          <Text style={[styles.acceptText, { fontFamily: fontSemi }]}>Agree &amp; Continue</Text>
        </TouchableOpacity>
      </View>

      {sheet === 'help' ? (
        <Modal transparent visible animationType="slide" onRequestClose={closeHelp}>
          <View style={styles.sheetOverlay}>
            <TouchableOpacity style={styles.sheetBackdrop} onPress={closeHelp} />
            <View style={styles.sheetCard}>
              <View style={styles.sheetHandle} />
              <Text style={[styles.sheetTitle, { fontFamily: fontSemi }]}>Help &amp; Support</Text>
              <TouchableOpacity
                style={styles.sheetRow}
                activeOpacity={0.85}
                onPress={() => {
                  closeHelp();
                  router.push('/profile/chat');
                }}
              >
                <Ionicons name="chatbox-ellipses-outline" size={20} color="#111" />
                <Text style={[styles.sheetLabel, { fontFamily: fontRegular }]}>Chat with Us</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sheetRow} activeOpacity={0.85} onPress={closeHelp}>
                <Ionicons name="call-outline" size={20} color="#111" />
                <Text style={[styles.sheetLabel, { fontFamily: fontRegular }]}>Call Us</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sheetRow} activeOpacity={0.85} onPress={closeHelp}>
                <Ionicons name="mail-outline" size={20} color="#111" />
                <Text style={[styles.sheetLabel, { fontFamily: fontRegular }]}>Email Us</Text>
              </TouchableOpacity>
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
    paddingBottom: 120,
  },
  metaCard: {
    backgroundColor: '#F9F2F3',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#F0E2E4',
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  metaText: {
    fontSize: 14,
    color: '#C8202F',
  },
  metaSub: {
    fontSize: 13,
    color: '#444444',
    lineHeight: 20,
  },
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 15,
    color: '#111111',
    marginBottom: 6,
  },
  sectionBody: {
    fontSize: 13,
    color: '#555555',
    lineHeight: 20,
  },
  helpRow: {
    marginTop: 4,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#F0E2E4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  helpLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  helpTitle: {
    fontSize: 14,
    color: '#C8202F',
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderColor: '#F2F2F2',
    backgroundColor: '#FFFFFF',
  },
  acceptBtn: {
    backgroundColor: '#C8202F',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  acceptText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  sheetOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  sheetBackdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  sheetCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },
  sheetHandle: {
    width: 48,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D9D9D9',
    alignSelf: 'center',
    marginBottom: 12,
  },
  sheetTitle: {
    fontSize: 18,
    color: '#111111',
    marginBottom: 16,
  },
  sheetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
  },
  sheetLabel: {
    fontSize: 14,
    color: '#111111',
  },
});
