import React, { useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet, Platform } from 'react-native';

interface OTPInputProps {
  length?: number;
  value: string[];
  onChange: (value: string[]) => void;
  onComplete?: (value: string) => void;
  error?: boolean;
  disabled?: boolean;
  fontFamily?: string;
}

export const OTPInput: React.FC<OTPInputProps> = ({
  length = 6,
  value,
  onChange,
  onComplete,
  error = false,
  disabled = false,
  fontFamily,
}) => {
  const inputRefs = useRef<TextInput[]>([]);

  useEffect(() => {
    // Auto-submit when all fields are filled
    if (value.every((digit) => digit !== '') && value.length === length && onComplete) {
      const otpValue = value.join('');
      onComplete(otpValue);
    }
  }, [value, length, onComplete]);

  const handleDigitChange = (text: string, index: number) => {
    const sanitized = text.replace(/[^0-9]/g, '');
    const newDigits = [...value];
    
    if (sanitized.length > 1) {
      // Handle paste: fill multiple fields
      const digits = sanitized.slice(0, length - index).split('');
      digits.forEach((digit, i) => {
        if (index + i < length) {
          newDigits[index + i] = digit;
        }
      });
      // Focus the last filled field or next empty field
      const nextIndex = Math.min(index + digits.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
    } else {
      newDigits[index] = sanitized.slice(-1);
      // Auto-focus next field
      if (sanitized && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
    
    onChange(newDigits);
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleFocus = (index: number) => {
    // Select all text when focusing (for easy replacement)
    // Only use setNativeProps on native platforms (not web)
    if (Platform.OS !== 'web') {
      inputRefs.current[index]?.setNativeProps?.({ selection: { start: 0, end: 1 } });
    }
  };

  return (
    <View style={styles.container}>
      {Array.from({ length }).map((_, index) => (
        <TextInput
          key={index}
          ref={(ref) => {
            if (ref) inputRefs.current[index] = ref;
          }}
          style={[
            styles.input,
            error && styles.inputError,
            value[index] && styles.inputFilled,
            { fontFamily },
          ]}
          value={value[index] || ''}
          onChangeText={(text) => handleDigitChange(text, index)}
          onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
          onFocus={() => handleFocus(index)}
          keyboardType="number-pad"
          maxLength={1}
          selectTextOnFocus
          editable={!disabled}
          autoComplete="off"
          textContentType="none"
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginVertical: 24,
  },
  input: {
    flex: 1,
    aspectRatio: 1,
    borderWidth: 1.5,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: Platform.OS === 'web' ? '600' : 'normal',
    color: '#000000',
    minWidth: 50,
    maxWidth: 60,
  },
  inputFilled: {
    borderColor: '#C8202F',
    backgroundColor: '#FFF5F5',
  },
  inputError: {
    borderColor: '#FF3B30',
    backgroundColor: '#FFF5F5',
  },
});

