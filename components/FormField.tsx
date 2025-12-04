import React from 'react';
import { View, Text, TextInput, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FormFieldProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'decimal-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  secureTextEntry?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  editable?: boolean;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  fontFamily?: string;
  maxLength?: number;
  autoComplete?: string;
  textContentType?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  secureTextEntry = false,
  multiline = false,
  numberOfLines = 1,
  editable = true,
  rightIcon,
  onRightIconPress,
  fontFamily,
  maxLength,
  autoComplete,
  textContentType,
}) => {
  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { fontFamily }, error && styles.labelError]}>
          {label}
        </Text>
      )}
      <View style={[styles.inputContainer, error && styles.inputContainerError]}>
        <TextInput
          style={[
            styles.input,
            multiline && styles.inputMultiline,
            { fontFamily },
            !editable && styles.inputDisabled,
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#999999"
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry}
          multiline={multiline}
          numberOfLines={numberOfLines}
          editable={editable}
          maxLength={maxLength}
          autoComplete={autoComplete as any}
          textContentType={textContentType as any}
        />
        {rightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            style={styles.rightIconContainer}
            disabled={!onRightIconPress}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text style={[styles.errorText, { fontFamily }]}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: Platform.OS === 'web' ? '500' : 'normal',
    color: '#000000',
    marginBottom: 8,
  },
  labelError: {
    color: '#FF3B30',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    minHeight: 56,
    width: '100%',
    ...(Platform.OS === 'web' ? {
      boxShadow: 'none',
    } : {}),
  },
  inputContainerError: {
    borderColor: '#FF3B30',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    paddingVertical: 0,
    paddingHorizontal: 0,
    minHeight: 56,
    ...(Platform.OS === 'ios' ? {
      paddingVertical: 16,
    } : {
      paddingVertical: 12,
    }),
  },
  inputMultiline: {
    paddingTop: 16,
    paddingBottom: 16,
    textAlignVertical: 'top',
    minHeight: 100,
  },
  inputDisabled: {
    backgroundColor: '#F5F5F5',
    color: '#999999',
  },
  rightIconContainer: {
    padding: 4,
    marginLeft: 8,
  },
  errorText: {
    fontSize: 12,
    color: '#FF3B30',
    marginTop: 4,
    marginLeft: 4,
  },
});

