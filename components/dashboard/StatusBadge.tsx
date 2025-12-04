import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface StatusBadgeProps {
  label: string;
  count: number;
  icon: string;
  color: string;
  onPress?: () => void;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  label,
  count,
  icon,
  color,
  onPress,
}) => {
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

  const BadgeContent = (
    <View style={[styles.badge, { backgroundColor: color }]}>
      <Ionicons name={icon as any} size={20} color="#FFFFFF" />
      <View style={styles.textContainer}>
        <Text style={[styles.count, { fontFamily: fontFamilySemiBold }]}>{count}</Text>
        <Text style={[styles.label, { fontFamily: fontFamilyRegular }]}>{label}</Text>
      </View>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {BadgeContent}
      </TouchableOpacity>
    );
  }

  return BadgeContent;
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 12,
    minWidth: 120,
  },
  textContainer: {
    flex: 1,
  },
  count: {
    fontSize: 20,
    fontWeight: Platform.OS === 'web' ? '600' : 'normal',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  label: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.9,
  },
});

