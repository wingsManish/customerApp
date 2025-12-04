import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SvgXml } from 'react-native-svg';
import { loadSvgFromAsset } from '@/utils/svgLoader';

const companySvg = require('@/assets/screen-asset/company.svg');

interface Company {
  id: string;
  name: string;
  address: string;
  isSelected: boolean;
}

export default function SelectCompanyScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompanyId, setSelectedCompanyId] = useState('1');
  const [menuVisible, setMenuVisible] = useState<string | null>(null);
  const [companySvgXml, setCompanySvgXml] = useState<string>('');

  const [companies] = useState<Company[]>([
    {
      id: '1',
      name: 'NFI',
      address: 'Tandika Rd, Buza Area, Temeke, P.O. Box 42 Salaam',
      isSelected: true,
    },
    {
      id: '2',
      name: 'Warner Bros Logistics',
      address: 'Umati Building, Samora Avenue & Zanaki Street, Dar es Salaam',
      isSelected: false,
    },
  ]);

  React.useEffect(() => {
    const loadSvg = async () => {
      if (Platform.OS === 'web') {
        return;
      }
      const svg = await loadSvgFromAsset(companySvg);
      if (svg) {
        setCompanySvgXml(svg);
      }
    };
    loadSvg();
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

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectCompany = (company: Company) => {
    setSelectedCompanyId(company.id);
    router.push({
      pathname: '/company-profile',
      params: {
        companyId: company.id,
        companyName: company.name,
      },
    });
  };

  const handleEdit = (companyId: string) => {
    setMenuVisible(null);
    // Navigate to edit screen
    console.log('Edit company:', companyId);
  };

  const handleDelete = (companyId: string) => {
    setMenuVisible(null);
    // Handle delete
    console.log('Delete company:', companyId);
  };

  const renderCompanyIcon = () => {
    if (Platform.OS === 'web') {
      return <Ionicons name="business" size={24} color="#C8202F" />;
    }
    return companySvgXml ? (
      <SvgXml xml={companySvgXml} width={24} height={24} />
    ) : (
      <Ionicons name="business" size={24} color="#C8202F" />
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <View style={styles.backButtonCircle}>
            <Ionicons name="arrow-back" size={20} color="#000000" />
          </View>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { fontFamily: fontFamilySemiBold }]}>
          Select your Company
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999999" style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { fontFamily: fontFamilyRegular }]}
            placeholder="Search your Company"
            placeholderTextColor="#999999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Add New Company */}
        <TouchableOpacity
          style={styles.addCompanyButton}
          onPress={() => router.push('/company-details')}
          activeOpacity={0.7}
        >
          <Ionicons name="add-circle" size={20} color="#C8202F" />
          <Text style={[styles.addCompanyText, { fontFamily: fontFamilySemiBold }]}>
            Add New Company
          </Text>
          <Ionicons name="chevron-forward" size={20} color="#999999" />
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Saved Companies Section */}
        <Text style={[styles.sectionTitle, { fontFamily: fontFamilyRegular }]}>
          SAVED COMPANIES
        </Text>

        {/* Company List */}
        {filteredCompanies.length > 0 ? (
          filteredCompanies.map((company) => (
            <TouchableOpacity
              key={company.id}
              style={styles.companyCard}
              onPress={() => handleSelectCompany(company)}
              activeOpacity={0.7}
            >
              <View style={styles.companyInfo}>
                <View style={styles.companyIconContainer}>
                  {renderCompanyIcon()}
                </View>
                <View style={styles.companyDetails}>
                  <View style={styles.companyNameRow}>
                    <Text style={[styles.companyName, { fontFamily: fontFamilySemiBold }]}>
                      {company.name}
                    </Text>
                    {company.id === selectedCompanyId && (
                      <View style={styles.selectedBadge}>
                        <Text style={[styles.selectedBadgeText, { fontFamily: fontFamilySemiBold }]}>
                          Currently Selected
                        </Text>
                      </View>
                    )}
                  </View>
                  <Text style={[styles.companyAddress, { fontFamily: fontFamilyRegular }]}>
                    {company.address}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.menuButton}
                onPress={(e) => {
                  e.stopPropagation();
                  setMenuVisible(menuVisible === company.id ? null : company.id);
                }}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="ellipsis-vertical" size={20} color="#666666" />
              </TouchableOpacity>

              {/* Context Menu */}
              {menuVisible === company.id && (
                <View style={styles.contextMenu}>
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => handleEdit(company.id)}
                  >
                    <Text style={[styles.menuItemText, { fontFamily: fontFamilyRegular }]}>
                      Edit
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.menuDivider} />
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => handleDelete(company.id)}
                  >
                    <Text style={[styles.menuItemText, { fontFamily: fontFamilyRegular }]}>
                      Delete
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyStateText, { fontFamily: fontFamilyRegular }]}>
              No companies found
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Overlay to close menu when tapping outside */}
      {menuVisible && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setMenuVisible(null)}
        />
      )}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    padding: 0,
  },
  addCompanyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 12,
  },
  addCompanyText: {
    flex: 1,
    fontSize: 16,
    color: '#C8202F',
    fontWeight: Platform.OS === 'web' ? '500' : 'normal',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 12,
    color: '#999999',
    letterSpacing: 1,
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  companyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
    position: 'relative',
  },
  companyInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  companyIconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  companyDetails: {
    flex: 1,
  },
  companyNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
    flexWrap: 'wrap',
  },
  companyName: {
    fontSize: 16,
    fontWeight: Platform.OS === 'web' ? '600' : 'normal',
    color: '#000000',
  },
  selectedBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  selectedBadgeText: {
    fontSize: 10,
    color: '#4CAF50',
    fontWeight: Platform.OS === 'web' ? '600' : 'normal',
  },
  companyAddress: {
    fontSize: 12,
    color: '#666666',
    lineHeight: 16,
  },
  menuButton: {
    padding: 8,
  },
  contextMenu: {
    position: 'absolute',
    right: 0,
    top: 40,
    backgroundColor: '#333333',
    borderRadius: 8,
    paddingVertical: 4,
    minWidth: 100,
    zIndex: 1000,
    ...(Platform.OS === 'web' ? {
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    } : {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    }),
  },
  menuItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  menuItemText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#555555',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 999,
  },
  emptyState: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 14,
    color: '#999999',
  },
});

