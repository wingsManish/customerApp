import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SvgXml } from 'react-native-svg';
import { Image } from 'expo-image';
import { loadSvgFromAsset } from '@/utils/svgLoader';
import { safeGoBack } from '@/utils/navigation';

const companySvg = require('@/assets/screen-asset/company.svg');
const documentSvg = require('@/assets/screen-asset/container.svg');

interface InfoCardProps {
  iconType: 'company' | 'phone' | 'document' | 'bank' | 'emergency';
  title: string;
  onEdit: () => void;
  children: React.ReactNode;
}

const InfoCard: React.FC<InfoCardProps> = ({ iconType, title, onEdit, children }) => {
  const [companyIconXml, setCompanyIconXml] = useState<string>('');
  const [documentIconXml, setDocumentIconXml] = useState<string>('');

  useEffect(() => {
    const loadSvgs = async () => {
      if (Platform.OS === 'web') {
        return;
      }
      const companySvgContent = await loadSvgFromAsset(companySvg);
      if (companySvgContent) {
        setCompanyIconXml(companySvgContent);
      }
      const documentSvgContent = await loadSvgFromAsset(documentSvg);
      if (documentSvgContent) {
        setDocumentIconXml(documentSvgContent);
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

  const renderIcon = () => {
    switch (iconType) {
      case 'company':
        if (Platform.OS === 'web') {
          return <Image source={companySvg} style={styles.cardIcon} contentFit="contain" />;
        }
        return companyIconXml ? (
          <SvgXml xml={companyIconXml} width={24} height={24} />
        ) : (
          <Ionicons name="business" size={24} color="#C8202F" />
        );
      case 'phone':
        return <Ionicons name="call" size={24} color="#C8202F" />;
      case 'document':
        if (Platform.OS === 'web') {
          return <Image source={documentSvg} style={styles.cardIcon} contentFit="contain" />;
        }
        return documentIconXml ? (
          <SvgXml xml={documentIconXml} width={24} height={24} />
        ) : (
          <Ionicons name="document-text" size={24} color="#C8202F" />
        );
      case 'bank':
        return <Ionicons name="card" size={24} color="#C8202F" />;
      case 'emergency':
        if (Platform.OS === 'web') {
          return <Image source={documentSvg} style={styles.cardIcon} contentFit="contain" />;
        }
        return documentIconXml ? (
          <SvgXml xml={documentIconXml} width={24} height={24} />
        ) : (
          <Ionicons name="document-text" size={24} color="#C8202F" />
        );
      default:
        return <Ionicons name="document" size={24} color="#C8202F" />;
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.cardTitleRow}>
          <View style={styles.cardIconContainer}>{renderIcon()}</View>
          <Text style={[styles.cardTitle, { fontFamily: fontFamilySemiBold }]}>{title}</Text>
        </View>
        <TouchableOpacity onPress={onEdit} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons name="pencil" size={20} color="#C8202F" />
        </TouchableOpacity>
      </View>
      <View style={styles.cardContent}>{children}</View>
    </View>
  );
};

interface InfoRowProps {
  label: string;
  value: string;
  isLast?: boolean;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value, isLast }) => {
  const fontFamilyRegular = Platform.select({
    ios: 'Figtree-Regular',
    android: 'Figtree-Regular',
    web: 'Figtree',
    default: 'Figtree',
  });

  const fontFamilySemiBold = Platform.select({
    ios: 'Figtree-SemiBold',
    android: 'Figtree-SemiBold',
    web: 'Figtree',
    default: 'Figtree',
  });

  return (
    <View style={[styles.infoRow, isLast && styles.infoRowLast]}>
      <Text style={[styles.infoLabel, { fontFamily: fontFamilyRegular }]}>{label}</Text>
      <Text style={[styles.infoValue, { fontFamily: fontFamilySemiBold }]}>{value}</Text>
    </View>
  );
};

export default function CompanyProfileScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ companyId?: string; companyName?: string }>();
  const companyId = params.companyId || '1';
  const companyName = params.companyName || 'NFI';

  const fontFamilySemiBold = Platform.select({
    ios: 'Figtree-SemiBold',
    android: 'Figtree-SemiBold',
    web: 'Figtree',
    default: 'Figtree',
  });

  const handleEdit = (section: string) => {
    console.log('Edit section:', section);
    // Navigate to appropriate edit screen based on section
    switch (section) {
      case 'company':
        router.push('/company-details');
        break;
      case 'contact':
        router.push('/contact-info');
        break;
      case 'documents':
        router.push('/upload-documents');
        break;
      case 'bank':
        router.push('/bank-details');
        break;
      case 'emergency':
        router.push('/emergency-info');
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => safeGoBack('/home')}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <View style={styles.backButtonCircle}>
            <Ionicons name="arrow-back" size={20} color="#000000" />
          </View>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { fontFamily: fontFamilySemiBold }]}>
          {companyName}
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Company Info Card */}
        <InfoCard iconType="company" title="Company Info" onEdit={() => handleEdit('company')}>
          <InfoRow label="Company Name" value="NFI" />
          <InfoRow label="Owner Name" value="Mark Beckham" />
          <InfoRow label="License Number" value="TBZ455S5S6A8A" />
          <InfoRow label="Address" value="Tandika rd, Buza Area" />
          <InfoRow label="City" value="Dar es Salaam" />
          <InfoRow label="State" value="Tanzania" />
          <InfoRow label="Country" value="East Africa" />
          <InfoRow label="Pin" value="524685" isLast />
        </InfoCard>

        {/* Contact Info Card */}
        <InfoCard iconType="phone" title="Contact Info" onEdit={() => handleEdit('contact')}>
          <InfoRow label="Mobile" value="+255 712 345 768" />
          <InfoRow label="Email" value="davidbechkam@gmail.com" />
          <InfoRow label="Mode of Communication" value="Phone" isLast />
        </InfoCard>

        {/* Documents Card */}
        <InfoCard iconType="document" title="Documents" onEdit={() => handleEdit('documents')}>
          <InfoRow label="Registration Certificate" value="Submitted" />
          <InfoRow label="PIN Certificate" value="Submitted" isLast />
        </InfoCard>

        {/* Bank Info Card */}
        <InfoCard iconType="bank" title="Bank Info" onEdit={() => handleEdit('bank')}>
          <InfoRow label="TIN" value="123-456-789" />
          <InfoRow label="Bank Account Number" value="0140200897854" />
          <InfoRow label="Bank Name" value="CRDB Bank" />
          <InfoRow label="Account Type" value="Business Current Account" />
          <InfoRow label="Bank Branch" value="CRDB Arusha Central" />
          <InfoRow label="Swift Code" value="1425633455G" isLast />
        </InfoCard>

        {/* Emergency Info Card */}
        <InfoCard iconType="emergency" title="Emergency Info" onEdit={() => handleEdit('emergency')}>
          <InfoRow label="Alternate Contact Name" value="Tom Overton" />
          <InfoRow label="Alternate Phone Name" value="+255 712 476 438" />
          <InfoRow label="Emergency Address" value="Tandika rd, Buza Area" isLast />
        </InfoCard>
      </ScrollView>
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  backButton: {
    marginRight: 12,
  },
  backButtonCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: Platform.OS === 'web' ? '600' : 'normal',
    color: '#000000',
  },
  headerSpacer: {
    width: 52,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cardIconContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardIcon: {
    width: 24,
    height: 24,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: Platform.OS === 'web' ? '600' : 'normal',
    color: '#000000',
  },
  cardContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  infoRowLast: {
    marginBottom: 0,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666666',
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    color: '#000000',
    flex: 1,
    textAlign: 'right',
    fontWeight: Platform.OS === 'web' ? '600' : 'normal',
  },
});

