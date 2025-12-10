import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SvgXml } from 'react-native-svg';
import { useRouter } from 'expo-router';
import { getSession } from '@/services/sessionService';

const companySvg = `<svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M1 0C0.867392 0 0.740215 0.0526784 0.646447 0.146447C0.552678 0.240215 0.5 0.367392 0.5 0.5C0.5 0.632608 0.552678 0.759785 0.646447 0.853553C0.740215 0.947322 0.867392 1 1 1V12H0.5C0.367392 12 0.240215 12.0527 0.146447 12.1464C0.0526784 12.2402 0 12.3674 0 12.5C0 12.6326 0.0526784 12.7598 0.146447 12.8536C0.240215 12.9473 0.367392 13 0.5 13H9V1C9.13261 1 9.25979 0.947322 9.35355 0.853553C9.44732 0.759785 9.5 0.632608 9.5 0.5C9.5 0.367392 9.44732 0.240215 9.35355 0.146447C9.25979 0.0526784 9.13261 0 9 0H1ZM3.5 11.5V10C3.5 9.86739 3.55268 9.74021 3.64645 9.64645C3.74021 9.55268 3.86739 9.5 4 9.5H6C6.13261 9.5 6.25979 9.55268 6.35355 9.64645C6.44732 9.74021 6.5 9.86739 6.5 10V11.5C6.5 11.6326 6.44732 11.7598 6.35355 11.8536C6.25979 11.9473 6.13261 12 6 12H4C3.86739 12 3.74021 11.9473 3.64645 11.8536C3.55268 11.7598 3.5 11.6326 3.5 11.5ZM3 3C3 2.86739 3.05268 2.74021 3.14645 2.64645C3.24021 2.55268 3.36739 2.5 3.5 2.5H4C4.13261 2.5 4.25979 2.55268 4.35355 2.64645C4.44732 2.74021 4.5 2.86739 4.5 3C4.5 3.13261 4.44732 3.25979 4.35355 3.35355C4.25979 3.44732 4.13261 3.5 4 3.5H3.5C3.36739 3.5 3.24021 3.44732 3.14645 3.35355C3.05268 3.25979 3 3.13261 3 3ZM3.5 4.5C3.36739 4.5 3.24021 4.55268 3.14645 4.64645C3.05268 4.74022 3 4.86739 3 5C3 5.13261 3.05268 5.25979 3.14645 5.35355C3.24021 5.44732 3.36739 5.5 3.5 5.5H4C4.13261 5.5 4.25979 5.44732 4.35355 5.35355C4.44732 5.25979 4.5 5.13261 4.5 5C4.5 4.86739 4.44732 4.74022 4.35355 4.64645C4.25979 4.55268 4.13261 4.5 4 4.5H3.5ZM3 7C3 6.86739 3.05268 6.74022 3.14645 6.64645C3.24021 6.55268 3.36739 6.5 3.5 6.5H4C4.13261 6.5 4.25979 6.55268 4.35355 6.64645C4.44732 6.74022 4.5 6.86739 4.5 7C4.5 7.13261 4.44732 7.25979 4.35355 7.35355C4.25979 7.44732 4.13261 7.5 4 7.5H3.5C3.36739 7.5 3.24021 7.44732 3.14645 7.35355C3.05268 7.25979 3 7.13261 3 7ZM6 2.5C5.86739 2.5 5.74022 2.55268 5.64645 2.64645C5.55268 2.74021 5.5 2.86739 5.5 3C5.5 3.13261 5.55268 3.25979 5.64645 3.35355C5.74022 3.44732 5.86739 3.5 6 3.5H6.5C6.63261 3.5 6.75979 3.44732 6.85355 3.35355C6.94732 3.25979 7 3.13261 7 3C7 2.86739 6.94732 2.74021 6.85355 2.64645C6.75979 2.55268 6.63261 2.5 6.5 2.5H6ZM5.5 5C5.5 4.86739 5.55268 4.74022 5.64645 4.64645C5.74022 4.55268 5.86739 4.5 6 4.5H6.5C6.63261 4.5 6.75979 4.55268 6.85355 4.64645C6.94732 4.74022 7 4.86739 7 5C7 5.13261 6.94732 5.25979 6.85355 5.35355C6.75979 5.44732 6.63261 5.5 6.5 5.5H6C5.86739 5.5 5.74022 5.44732 5.64645 5.35355C5.55268 5.25979 5.5 5.13261 5.5 5ZM6 6.5C5.86739 6.5 5.74022 6.55268 5.64645 6.64645C5.55268 6.74022 5.5 6.86739 5.5 7C5.5 7.13261 5.55268 7.25979 5.64645 7.35355C5.74022 7.44732 5.86739 7.5 6 7.5H6.5C6.63261 7.5 6.75979 7.44732 6.85355 7.35355C6.94732 7.25979 7 7.13261 7 7C7 6.86739 6.94732 6.74022 6.85355 6.64645C6.75979 6.55268 6.63261 6.5 6.5 6.5H6ZM10 3V13H13.5C13.6326 13 13.7598 12.9473 13.8536 12.8536C13.9473 12.7598 14 12.6326 14 12.5C14 12.3674 13.9473 12.2402 13.8536 12.1464C13.7598 12.0527 13.6326 12 13.5 12H13V4C13.1326 4 13.2598 3.94732 13.3536 3.85355C13.4473 3.75979 13.5 3.63261 13.5 3.5C13.5 3.36739 13.4473 3.24021 13.3536 3.14645C13.2598 3.05268 13.1326 3 13 3H10ZM11 6C11 5.86739 11.0527 5.74022 11.1464 5.64645C11.2402 5.55268 11.3674 5.5 11.5 5.5H11.5053C11.6379 5.5 11.7651 5.55268 11.8589 5.64645C11.9527 5.74022 12.0053 5.86739 12.0053 6V6.00533C12.0053 6.13794 11.9527 6.26512 11.8589 6.35889C11.7651 6.45266 11.6379 6.50533 11.5053 6.50533H11.5C11.3674 6.50533 11.2402 6.45266 11.1464 6.35889C11.0527 6.26512 11 6.13794 11 6.00533V6ZM11.5 7.5C11.3674 7.5 11.2402 7.55268 11.1464 7.64645C11.0527 7.74022 11 7.86739 11 8V8.00533C11 8.28133 11.224 8.50533 11.5 8.50533H11.5053C11.6379 8.50533 11.7651 8.45265 11.8589 8.35889C11.9527 8.26512 12.0053 8.13794 12.0053 8.00533V8C12.0053 7.86739 11.9527 7.74022 11.8589 7.64645C11.7651 7.55268 11.6379 7.5 11.5053 7.5H11.5ZM11 10C11 9.86739 11.0527 9.74021 11.1464 9.64645C11.2402 9.55268 11.3674 9.5 11.5 9.5H11.5053C11.6379 9.5 11.7651 9.55268 11.8589 9.64645C11.9527 9.74021 12.0053 9.86739 12.0053 10V10.0053C12.0053 10.1379 11.9527 10.2651 11.8589 10.3589C11.7651 10.4527 11.6379 10.5053 11.5053 10.5053H11.5C11.3674 10.5053 11.2402 10.4527 11.1464 10.3589C11.0527 10.2651 11 10.1379 11 10.0053V10Z" fill="#C8202F"/>
</svg>`;

interface HeaderProps {
  companyName?: string;
  location?: string;
}

export const Header: React.FC<HeaderProps> = ({ companyName, location }) => {
  const router = useRouter();
  const [displayCompanyName, setDisplayCompanyName] = React.useState(companyName || 'Company');

  React.useEffect(() => {
    const loadUserData = async () => {
      const session = await getSession();
      if (session?.companyInfo?.companyName) {
        setDisplayCompanyName(session.companyInfo.companyName);
      } else if (session?.personalInfo?.firstName) {
        setDisplayCompanyName(`${session.personalInfo.firstName}'s Logistics`);
      }
    };
    loadUserData();
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

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <View style={styles.companyRow}>
          <SvgXml xml={companySvg} width={14} height={13} />
          <TouchableOpacity
            style={styles.companyNameContainer}
            onPress={() => router.push('/select-company')}
            activeOpacity={0.7}
          >
            <Text style={[styles.companyName, { fontFamily: fontFamilySemiBold }]}>
              {displayCompanyName}
            </Text>
            <Ionicons name="chevron-down" size={16} color="#666666" />
          </TouchableOpacity>
        </View>
        {location && (
          <View style={styles.locationContainer}>
            <Text style={[styles.location, { fontFamily: fontFamilyRegular }]}>
              {location}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.rightSection}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => router.push('/notifications')}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="notifications-outline" size={24} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => router.push('/profile')}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <View style={styles.profilePlaceholder}>
            <Ionicons name="person" size={20} color="#C8202F" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  leftSection: {
    flex: 1,
  },
  companyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 2,
  },
  companyNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  companyName: {
    fontSize: 16,
    fontWeight: Platform.OS === 'web' ? '600' : 'normal',
    color: '#000000',
  },
  locationContainer: {
    marginTop: 4,
  },
  location: {
    fontSize: 12,
    color: '#666666',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    padding: 4,
  },
  profileButton: {
    padding: 2,
  },
  profilePlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
});

