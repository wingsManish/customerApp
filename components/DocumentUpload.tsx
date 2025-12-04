import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DocumentFile } from '@/services/sessionService';

interface DocumentUploadProps {
  label: string;
  files: DocumentFile[];
  onUpload: () => void;
  onRemove: (id: string) => void;
  fontFamily?: string;
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({
  label,
  files,
  onUpload,
  onRemove,
  fontFamily,
}) => {
  return (
    <View style={styles.wrapper}>
      <Text style={[styles.label, { fontFamily }]}>{label}</Text>
      
      {files.length === 0 ? (
        <TouchableOpacity style={styles.uploadBox} onPress={onUpload} activeOpacity={0.7}>
          <Ionicons name="cloud-upload-outline" size={32} color="#C8202F" />
          <Text style={[styles.uploadText, { fontFamily }]}>Click here to upload</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.filesContainer}>
          {files.map((file) => (
            <View key={file.id} style={styles.fileCard}>
              <View style={styles.fileIcon}>
                <Ionicons name="document-text" size={24} color="#C8202F" />
              </View>
              <View style={styles.fileInfo}>
                <Text style={[styles.fileName, { fontFamily }]} numberOfLines={1}>
                  {file.name}
                </Text>
                <Text style={[styles.fileMeta, { fontFamily }]}>
                  {file.sizeLabel} · {file.typeLabel}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => onRemove(file.id)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="close-circle" size={24} color="#999999" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: Platform.OS === 'web' ? '500' : 'normal',
    color: '#000000',
    marginBottom: 12,
  },
  uploadBox: {
    width: '100%',
    minHeight: 120,
    backgroundColor: '#FFF5F5',
    borderWidth: 2,
    borderColor: '#C8202F',
    borderStyle: 'dashed',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  uploadText: {
    fontSize: 14,
    color: '#C8202F',
    marginTop: 8,
    fontWeight: Platform.OS === 'web' ? '500' : 'normal',
  },
  filesContainer: {
    gap: 12,
  },
  fileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    ...(Platform.OS === 'web' ? {
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    } : {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    }),
  },
  fileIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#FFF5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  fileInfo: {
    flex: 1,
    marginRight: 8,
  },
  fileName: {
    fontSize: 14,
    fontWeight: Platform.OS === 'web' ? '500' : 'normal',
    color: '#000000',
    marginBottom: 4,
  },
  fileMeta: {
    fontSize: 12,
    color: '#666666',
  },
  removeButton: {
    padding: 4,
  },
});

