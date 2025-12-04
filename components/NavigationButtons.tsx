import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Button } from 'react-native-paper';

interface NavigationButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
  previousLabel?: string;
  nextLabel?: string;
  isLoading?: boolean;
  nextDisabled?: boolean;
  previousDisabled?: boolean;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onPrevious,
  onNext,
  previousLabel = 'Previous',
  nextLabel = 'Next',
  isLoading = false,
  nextDisabled = false,
  previousDisabled = false,
}) => {
  const fontFamily = Platform.select({
    ios: 'Figtree-SemiBold',
    android: 'Figtree-SemiBold',
    web: 'Figtree',
    default: 'Figtree',
  });

  return (
    <View style={styles.container}>
      <Button
        mode="outlined"
        onPress={onPrevious}
        style={[styles.button, styles.previousButton]}
        buttonColor="#FFFFFF"
        textColor="#000000"
        contentStyle={styles.buttonContent}
        labelStyle={[styles.buttonLabel, { fontFamily }]}
        disabled={isLoading || previousDisabled}
      >
        {previousLabel}
      </Button>
      <Button
        mode="contained"
        onPress={onNext}
        style={[styles.button, styles.nextButton]}
        buttonColor="#C8202F"
        textColor="#FFFFFF"
        contentStyle={styles.buttonContent}
        labelStyle={[styles.buttonLabel, { fontFamily }]}
        loading={isLoading}
        disabled={isLoading || nextDisabled}
      >
        {nextLabel}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 24,
    width: '100%',
    paddingBottom: 16,
  },
  button: {
    flex: 1,
    borderRadius: 12,
    elevation: 0,
    shadowOpacity: 0,
  },
  buttonContent: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  previousButton: {
    borderColor: '#E5E5E5',
    borderWidth: 1.5,
  },
  nextButton: {
    // Next button styles
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: Platform.OS === 'web' ? '600' : 'normal',
    letterSpacing: 0.5,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});

