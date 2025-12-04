import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';
import { DocumentUpload } from '@/components/DocumentUpload';
import { NavigationButtons } from '@/components/NavigationButtons';
import { getSession, updateSession, DocumentFile } from '@/services/sessionService';
import { safeGoBack } from '@/utils/navigation';

type DocumentKey = 'registration' | 'tin';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export default function UploadDocumentsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [documents, setDocuments] = useState<Record<DocumentKey, DocumentFile[]>>({
    registration: [],
    tin: [],
  });
  const [isLoading, setIsLoading] = useState(false);

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

  // Load documents from session
  useEffect(() => {
    const loadSession = async () => {
      const session = await getSession();
      if (session?.documents) {
        setDocuments({
          registration: session.documents.registration || [],
          tin: session.documents.tin || [],
        });
      }
    };
    loadSession();
  }, []);

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleUpload = async (key: DocumentKey) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'],
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (result.canceled || !result.assets?.length) {
        return;
      }

      const asset = result.assets[0];

      // Validate file size
      if (asset.size && asset.size > MAX_FILE_SIZE) {
        Alert.alert('File Too Large', `File size must be less than ${formatBytes(MAX_FILE_SIZE)}`);
        return;
      }

      const name = asset.name || 'Document';
      const sizeLabel = asset.size ? formatBytes(asset.size) : 'Unknown size';
      const mimeType = asset.mimeType || 'application/pdf';
      const typeLabel = mimeType.includes('pdf') ? 'PDF' : mimeType.split('/')[1]?.toUpperCase() || 'FILE';

      const newFile: DocumentFile = {
        id: `${key}-${Date.now()}`,
        name,
        sizeLabel,
        typeLabel,
      };

      setDocuments((prev) => ({
        ...prev,
        [key]: [newFile], // Replace existing file
      }));
    } catch (error) {
      console.error('Document picker error:', error);
      Alert.alert('Error', 'Failed to pick document. Please try again.');
    }
  };

  const handleRemove = (key: DocumentKey, id: string) => {
    Alert.alert(
      'Remove Document',
      'Are you sure you want to remove this document?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setDocuments((prev) => ({
              ...prev,
              [key]: prev[key].filter((file) => file.id !== id),
            }));
          },
        },
      ]
    );
  };

  const validateForm = (): boolean => {
    if (documents.registration.length === 0) {
      Alert.alert('Required', 'Please upload Registration Certificate');
      return false;
    }
    if (documents.tin.length === 0) {
      Alert.alert('Required', 'Please upload TIN Certificate');
      return false;
    }
    return true;
  };

  const handlePrevious = () => {
    safeGoBack('/bank-details');
  };

  const handleNext = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await updateSession({
        documents: {
          registration: documents.registration,
          tin: documents.tin,
        },
        documentsCompleted: true,
      });

      router.push('/emergency-info');
    } catch (error) {
      console.error('Error saving documents:', error);
      Alert.alert('Error', 'Failed to save documents. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? insets.top : 0}
      >
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: Math.max(insets.bottom, 32) },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          bounces={false}
        >
          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '75%' }]} />
            </View>
          </View>

          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={handlePrevious}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="arrow-back" size={24} color="#000000" />
          </TouchableOpacity>

          <View style={styles.content}>
            <Text style={[styles.title, { fontFamily: fontFamilySemiBold }]}>
              Upload Documents
            </Text>

            <Text style={[styles.subtitle, { fontFamily: fontFamilyRegular }]}>
              Please upload the required documents to complete your registration
            </Text>

            {/* Document Upload Sections */}
            <DocumentUpload
              label="Registration Certificate"
              files={documents.registration}
              onUpload={() => handleUpload('registration')}
              onRemove={(id) => handleRemove('registration', id)}
              fontFamily={fontFamilyRegular}
            />

            <DocumentUpload
              label="TIN Certificate"
              files={documents.tin}
              onUpload={() => handleUpload('tin')}
              onRemove={(id) => handleRemove('tin', id)}
              fontFamily={fontFamilyRegular}
            />

            {/* Navigation Buttons */}
            <NavigationButtons
              onPrevious={handlePrevious}
              onNext={handleNext}
              isLoading={isLoading}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  progressContainer: {
    paddingTop: 16,
    paddingBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E5E5E5',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#C8202F',
    borderRadius: 2,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  content: {
    flex: 1,
    paddingTop: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: Platform.OS === 'web' ? '600' : 'normal',
    color: '#000000',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666666',
    marginBottom: 32,
    textAlign: 'center',
  },
});

