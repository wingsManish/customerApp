import React, { useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type ChatItem =
  | {
      id: string;
      type: 'message';
      text: string;
      sender: 'agent' | 'user';
    }
  | { id: string; type: 'meta'; text: string };

export default function ChatScreen() {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatItem[]>([
    { id: 'meta-1', type: 'meta', text: 'Wed 8:21 AM' },
    {
      id: '1',
      type: 'message',
      text: 'Hi, I saw your quote for 2000 per ton for the Dar es Salaam to Arusha route. Can we negotiate on this?',
      sender: 'agent',
    },
    {
      id: '2',
      type: 'message',
      text: 'Hello! Thanks for reaching out. Yes, we can discuss. May I know the total tonnage and your expected rate?',
      sender: 'user',
    },
    {
      id: '3',
      type: 'message',
      text: 'The cargo is 12 tons. We were expecting something around 1700 per ton. Is that possible?',
      sender: 'agent',
    },
    {
      id: '4',
      type: 'message',
      text: 'At 1700 per ton, it will be tight due to current fuel and toll costs. I can bring it down to 1850 per ton, considering the full load. Would that work?',
      sender: 'user',
    },
  ]);

  const fontSemi = useMemo(
    () =>
      Platform.select({
        ios: 'Figtree-SemiBold',
        android: 'Figtree-SemiBold',
        web: 'Figtree',
        default: 'Figtree',
      }),
    []
  );
  const fontRegular = useMemo(
    () =>
      Platform.select({
        ios: 'Figtree-Regular',
        android: 'Figtree-Regular',
        web: 'Figtree',
        default: 'Figtree',
      }),
    []
  );

  const handleSend = () => {
    if (!input.trim()) return;
    const next: ChatItem = { id: Date.now().toString(), type: 'message', text: input.trim(), sender: 'user' };
    setMessages((prev) => [...prev, next]);
    setInput('');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style="dark" backgroundColor="#FFFFFF" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backCircle} onPress={() => router.back()} activeOpacity={0.8}>
          <Ionicons name="arrow-back" size={20} color="#222" />
        </TouchableOpacity>
        <Text style={[styles.title, { fontFamily: fontSemi }]}>Chat with Us</Text>
        <View style={{ width: 40 }} /> 
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView
          style={styles.chatArea}
          contentContainerStyle={styles.chatContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {messages.map((item) => {
            if (item.type === 'meta') {
              return (
                <View key={item.id} style={styles.metaWrap}>
                  <Text style={[styles.metaText, { fontFamily: fontSemi }]}>{item.text}</Text>
                </View>
              );
            }

            const isUser = item.sender === 'user';
            return (
              <View key={item.id} style={[styles.bubbleRow, isUser ? styles.bubbleRowEnd : styles.bubbleRowStart]}>
                <View style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleAgent]}>
                  <Text
                    style={[
                      styles.bubbleText,
                      isUser ? styles.bubbleTextUser : styles.bubbleTextAgent,
                      { fontFamily: fontRegular },
                    ]}
                  >
                    {item.text}
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.inputRow}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[styles.input, { fontFamily: fontRegular }]}
                placeholder="Type a message..."
                placeholderTextColor="#9A9A9A"
                value={input}
                onChangeText={setInput}
                onSubmitEditing={handleSend}
                returnKeyType="send"
              />
              <TouchableOpacity activeOpacity={0.8} style={styles.micInline}>
                <Ionicons name="mic-outline" size={18} color="#111" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.sendBtn} activeOpacity={0.85} onPress={handleSend}>
              <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 8,
  },
  backCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F3F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    color: '#111111',
  },
  chatArea: {
    flex: 1,
  },
  chatContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    gap: 12,
  },
  metaWrap: {
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: '#9A9A9A',
    backgroundColor: '#F4F4F4',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
  },
  bubbleRow: {
    flexDirection: 'row',
  },
  bubbleRowEnd: {
    justifyContent: 'flex-end',
  },
  bubbleRowStart: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '82%',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 16,
  },
  bubbleUser: {
    backgroundColor: '#C8202F',
  },
  bubbleAgent: {
    backgroundColor: '#F4F4F4',
  },
  bubbleText: {
    fontSize: 14,
    lineHeight: 20,
  },
  bubbleTextAgent: {
    color: '#111111',
  },
  bubbleTextUser: {
    color: '#FFFFFF',
  },
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 12,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E3E3E3',
    backgroundColor: '#F7F7F7',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 2,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingRight: 8,
    fontSize: 14,
    color: '#111111',
  },
  micInline: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E3E3E3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#C8202F',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
