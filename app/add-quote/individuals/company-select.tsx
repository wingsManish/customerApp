import React, { useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type Company = {
  id: string;
  name: string;
  color: string;
};

const companies: Company[] = [
  { id: '1', name: 'TranzLogistics', color: '#E53935' },
  { id: '2', name: 'TrakPath Logistics', color: '#F57C00' },
  { id: '3', name: 'Trident Trucking Co.', color: '#1B8D3B' },
  { id: '4', name: 'Tranzit Haulage', color: '#2D57E7' },
];

export default function IndividualsCompanySelectScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

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

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return companies;
    return companies.filter(c => c.name.toLowerCase().includes(q));
  }, [query]);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
  };

  const renderCompany = ({ item }: { item: Company }) => {
    const isSelected = selectedIds.includes(item.id);
    return (
      <TouchableOpacity
        style={[
          styles.companyRow,
          isSelected ? styles.companyRowSelected : undefined,
        ]}
        activeOpacity={0.85}
        onPress={() => toggleSelect(item.id)}
      >
        <View style={[styles.logoCircle, { backgroundColor: item.color }]}>
          <Text style={[styles.logoInitial, { fontFamily: fontSemi }]}>
            {item.name.charAt(0)}
          </Text>
        </View>
        <Text style={[styles.companyName, { fontFamily: fontRegular }]}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style="dark" backgroundColor="#FFFFFF" />

      <View style={styles.progressContainer}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: '65%' }]} />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { fontFamily: fontSemi }]}>Select Company</Text>

        <View style={styles.searchRow}>
          <Ionicons name="search" size={18} color="#6A6A6A" style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Search Company"
            placeholderTextColor="#9A9A9A"
            style={[styles.searchInput, { fontFamily: fontRegular }]}
            value={query}
            onChangeText={setQuery}
          />
        </View>

        {selectedIds.length > 0 ? (
          <View style={styles.chipsWrap}>
            {selectedIds.map(id => {
              const comp = companies.find(c => c.id === id);
              if (!comp) return null;
              return (
                <View key={id} style={styles.chip}>
                  <View style={[styles.chipLogo, { backgroundColor: comp.color }]}>
                    <Text style={[styles.chipLogoText, { fontFamily: fontSemi }]}>{comp.name.charAt(0)}</Text>
                  </View>
                  <Text style={[styles.chipText, { fontFamily: fontRegular }]}>{comp.name}</Text>
                  <TouchableOpacity onPress={() => toggleSelect(id)} hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}>
                    <Ionicons name="close" size={14} color="#C8202F" />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        ) : null}

        <FlatList
          data={filtered}
          keyExtractor={item => item.id}
          renderItem={renderCompany}
          style={styles.list}
          ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: '#F3F3F3' }} />}
        />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.footerButton, styles.footerButtonSecondary]}
          activeOpacity={0.8}
          onPress={() => router.back()}
        >
          <Text style={[styles.footerButtonTextSecondary, { fontFamily: fontSemi }]}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.footerButton, styles.footerButtonPrimary]}
          activeOpacity={0.8}
          onPress={() => router.push('/add-quote/success')}
        >
          <Text style={[styles.footerButtonTextPrimary, { fontFamily: fontSemi }]}>Next</Text>
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
  searchRow: {
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#111111',
    padding: 0,
  },
  list: {
    flex: 1,
  },
  companyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
  },
  companyRowSelected: {
    backgroundColor: '#FCEEEF',
  },
  logoCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  logoInitial: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  companyName: {
    fontSize: 14,
    color: '#111111',
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#C8202F',
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
  },
  chipLogo: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipLogoText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  chipText: {
    fontSize: 13,
    color: '#111111',
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
});
