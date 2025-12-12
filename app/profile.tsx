import React, { useCallback, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Platform,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { BottomTabNavigator } from '@/components/dashboard/BottomTabNavigator';
import * as ImagePicker from 'expo-image-picker';

const mockUser = {
  name: 'David Beckham',
  avatar:
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=320&q=80',
  totalQuotation: 30,
  tripsCompleted: 24,
  version: 'v1.1.2 Live',
};

type Sheet = 'none' | 'photo' | 'help';

export default function ProfileScreen() {
  const router = useRouter();
  const [sheet, setSheet] = useState<Sheet>('none');
  const [avatar, setAvatar] = useState<string | null>(mockUser.avatar);

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

  const MenuRow = ({
    icon,
    label,
    rightText,
    onPress,
  }: {
    icon: React.ReactNode;
    label: string;
    rightText?: string;
    onPress?: () => void;
  }) => (
    <TouchableOpacity style={styles.menuRow} activeOpacity={0.8} onPress={onPress}>
      <View style={styles.menuLeft}>
        {icon}
        <Text style={[styles.menuLabel, { fontFamily: fontRegular }]}>{label}</Text>
      </View>
      {rightText ? (
        <Text style={[styles.menuRightText, { fontFamily: fontRegular }]}>{rightText}</Text>
      ) : (
        <Ionicons name="chevron-forward" size={18} color="#555" />
      )}
    </TouchableOpacity>
  );

  const requestPermission = useCallback(async (type: 'camera' | 'library') => {
    const result =
      type === 'camera'
        ? await ImagePicker.requestCameraPermissionsAsync()
        : await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (result.status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant permission to continue.');
      return false;
    }
    return true;
  }, []);

  const handlePickFromDevice = useCallback(async () => {
    const allowed = await requestPermission('library');
    if (!allowed) return;
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.9,
      allowsEditing: true,
      aspect: [1, 1],
    });
    if (result.canceled) return;
    const uri = result.assets?.[0]?.uri;
    if (uri) {
      setAvatar(uri);
      setSheet('none');
    }
  }, [requestPermission]);

  const handleTakePhoto = useCallback(async () => {
    const allowed = await requestPermission('camera');
    if (!allowed) return;
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.9,
      allowsEditing: true,
      aspect: [1, 1],
    });
    if (result.canceled) return;
    const uri = result.assets?.[0]?.uri;
    if (uri) {
      setAvatar(uri);
      setSheet('none');
    }
  }, [requestPermission]);

  const handleRemovePhoto = useCallback(() => {
    setAvatar(null);
    setSheet('none');
  }, []);

  const renderSheet = () => {
    if (sheet === 'photo') {
      return (
        <Modal transparent visible animationType="slide" onRequestClose={() => setSheet('none')}>
          <View style={styles.sheetOverlay}>
            <TouchableOpacity style={styles.sheetBackdrop} onPress={() => setSheet('none')} />
            <View style={styles.sheetCard}>
              <View style={styles.sheetHandle} />
              <Text style={[styles.sheetTitle, { fontFamily: fontSemi }]}>Profile Pic</Text>
              <Image source={{ uri: avatar ?? mockUser.avatar }} style={styles.sheetAvatar} />
              <MenuRow
                icon={<Ionicons name="images-outline" size={20} color="#111" />}
                label="Select from Device"
                onPress={handlePickFromDevice}
              />
              <MenuRow
                icon={<Ionicons name="camera-outline" size={20} color="#111" />}
                label="Take a Photo"
                onPress={handleTakePhoto}
              />
              <MenuRow
                icon={<Ionicons name="close-circle-outline" size={20} color="#111" />}
                label="Remove Profile Pic"
                onPress={handleRemovePhoto}
              />
              <TouchableOpacity style={styles.sheetButton} activeOpacity={0.9} onPress={() => setSheet('none')}>
                <Text style={[styles.sheetButtonText, { fontFamily: fontSemi }]}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      );
    }
    if (sheet === 'help') {
      return (
        <Modal transparent visible animationType="slide" onRequestClose={() => setSheet('none')}>
          <View style={styles.sheetOverlay}>
            <TouchableOpacity style={styles.sheetBackdrop} onPress={() => setSheet('none')} />
            <View style={styles.sheetCard}>
              <View style={styles.sheetHandle} />
              <Text style={[styles.sheetTitle, { fontFamily: fontSemi }]}>Help & Support</Text>
              <MenuRow
                icon={<Ionicons name="chatbox-ellipses-outline" size={20} color="#111" />}
                label="Chat with Us"
                onPress={() => {
                  setSheet('none');
                  router.push('/profile/chat');
                }}
              />
              <MenuRow icon={<Ionicons name="call-outline" size={20} color="#111" />} label="Call Us" onPress={() => {}} />
              <MenuRow icon={<Ionicons name="mail-outline" size={20} color="#111" />} label="Email Us" onPress={() => {}} />
            </View>
          </View>
        </Modal>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backCircle} activeOpacity={0.8} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={20} color="#222" />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { fontFamily: fontSemi }]}>Profile</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.card}>
          <View style={styles.avatarWrap}>
            <Image source={{ uri: mockUser.avatar }} style={styles.avatar} />
            <TouchableOpacity style={styles.editBadge} onPress={() => setSheet('photo')}>
              <Ionicons name="create-outline" size={14} color="#FFF" />
            </TouchableOpacity>
          </View>
          <Text style={[styles.name, { fontFamily: fontSemi }]}>{mockUser.name}</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { fontFamily: fontSemi }]}>{mockUser.totalQuotation}</Text>
              <Text style={[styles.statLabel, { fontFamily: fontRegular }]}>Total Quotation</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { fontFamily: fontSemi }]}>{mockUser.tripsCompleted}</Text>
              <Text style={[styles.statLabel, { fontFamily: fontRegular }]}>Trips Completed</Text>
            </View>
          </View>
        </View>

        <View style={styles.menuList}>
          <MenuRow
            icon={<Ionicons name="person-circle-outline" size={22} color="#111" />}
            label="Company Info"
            onPress={() => router.push('/profile/company-details')}
          />
          <MenuRow
            icon={<Ionicons name="headset-outline" size={22} color="#111" />}
            label="Help & Support"
            onPress={() => setSheet('help')}
          />
          <MenuRow icon={<Ionicons name="help-circle-outline" size={22} color="#111" />} label="FAQ’s" onPress={() => {}} />
          <MenuRow
            icon={<Ionicons name="document-text-outline" size={22} color="#111" />}
            label="Terms & Conditions"
            onPress={() => router.push('/profile/terms')}
          />
          <MenuRow
            icon={<Ionicons name="settings-outline" size={22} color="#111" />}
            label="Settings"
            onPress={() => router.push('/profile/settings')}
          />
          <MenuRow
            icon={<Ionicons name="information-circle-outline" size={22} color="#111" />}
            label="App Version"
            rightText={mockUser.version}
            onPress={() => {}}
          />
        </View>

        <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.9} onPress={() => {}}>
          <Ionicons name="log-out-outline" size={18} color="#C8202F" style={{ marginRight: 8 }} />
          <Text style={[styles.logoutText, { fontFamily: fontSemi }]}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>

      {renderSheet()}
      <BottomTabNavigator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scroll: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 4,
    marginBottom: 16,
  },
  backCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F3F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    color: '#111111',
  },
  card: {
    backgroundColor: '#111827',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingTop: 28,
    paddingBottom: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarWrap: {
    marginTop: -46,
    marginBottom: 12,
  },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
  },
  editBadge: {
    position: 'absolute',
    right: 2,
    bottom: 2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#C8202F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 12,
    color: '#CBD5E1',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  menuList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    paddingVertical: 4,
    marginBottom: 20,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  menuLabel: {
    fontSize: 14,
    color: '#111111',
  },
  menuRightText: {
    fontSize: 13,
    color: '#666666',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FDE7EA',
    borderRadius: 10,
    paddingVertical: 14,
    marginBottom: 16,
  },
  logoutText: {
    fontSize: 16,
    color: '#C8202F',
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
  sheetAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 18,
  },
  sheetButton: {
    marginTop: 12,
    backgroundColor: '#C8202F',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  sheetButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

