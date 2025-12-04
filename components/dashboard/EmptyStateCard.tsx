import React from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SvgXml } from 'react-native-svg';

interface EmptyStateCardProps {
  message: string;
  icon?: string;
  svgSource?: string;
}

export const EmptyStateCard: React.FC<EmptyStateCardProps> = ({
  message,
  icon = 'document-text-outline',
  svgSource,
}) => {
  const fontFamilyRegular = Platform.select({
    ios: 'Figtree-Regular',
    android: 'Figtree-Regular',
    web: 'Figtree',
    default: 'Figtree',
  });

  return (
    <View style={styles.container}>
      {svgSource ? (
        <SvgXml xml={svgSource} width={72} height={70} />
      ) : (
        <Ionicons name={icon as any} size={48} color="#CCCCCC" />
      )}
      <Text style={[styles.message, { fontFamily: fontFamilyRegular }]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    minHeight: 150,
  },
  message: {
    fontSize: 14,
    color: '#999999',
    marginTop: 16,
    textAlign: 'center',
  },
});

