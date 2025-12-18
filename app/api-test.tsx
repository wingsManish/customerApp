import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from 'react-native-paper';
import Constants from 'expo-constants';

import { apiClient, getErrorMessage } from '@/services/apiClient';

const extra = Constants.expoConfig?.extra || {};

export default function ApiTestScreen() {
  const [appToken, setAppToken] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [username, setUsername] = useState('manish981');
  const [password, setPassword] = useState('manish982');
  const [loginResult, setLoginResult] = useState<string>('');
  const [refreshLoading, setRefreshLoading] = useState(false);
  const [refreshResult, setRefreshResult] = useState<string>('');
  const [userToken, setUserToken] = useState<string>('');
  const [refreshToken, setRefreshToken] = useState<string>('');

  const handleGenerateAppToken = async () => {
    setIsLoading(true);
    setErrorMessage('');
    setStatusMessage('');

    try {
      const token = await apiClient.generateAppToken();
      if (token) {
        setAppToken(token);
        setStatusMessage('App token generated and saved.');
      } else {
        setErrorMessage('No token returned from the server.');
      }
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearTokens = async () => {
    await apiClient.removeAllTokens();
    setAppToken('');
    setUserToken('');
    setRefreshToken('');
    setStatusMessage('Stored tokens cleared.');
    setErrorMessage('');
  };

  const handleTestLogin = async () => {
    setLoginLoading(true);
    setLoginResult('');
    setErrorMessage('');
    try {
      const token = (await apiClient.generateAppToken()) || appToken;
      if (!token) {
        setErrorMessage('No app token available for login.');
        return;
      }

      const url = `${extra?.authApiUrl || extra?.apiUrl}/Auth/login`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username, password }),
      });

      const json = await response.json().catch(() => null);
      if (response.ok && json?.data?.jwtToken) {
        setLoginResult(JSON.stringify(json, null, 2));
        const jwt = json.data.jwtToken || '';
        const rft = json.data.refreshToken || '';
        setUserToken(jwt);
        setRefreshToken(rft);
        if (jwt) {
          await apiClient.saveUserToken(jwt);
        }
        if (rft) {
          await apiClient.saveRefreshToken(rft);
        }
      } else {
        setErrorMessage(
          json?.message || `Login failed (${response.status})`
        );
      }
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setLoginLoading(false);
    }
  };

  const handleRefreshAppToken = async () => {
    setRefreshLoading(true);
    setRefreshResult('');
    setErrorMessage('');
    try {
      const rt =
        refreshToken ||
        (await apiClient.getRefreshTokenPublic());
      if (!rt) {
        setErrorMessage('No refresh token available. Login first.');
        return;
      }
      const res = await apiClient.refreshAppToken(rt);
      setRefreshResult(JSON.stringify(res, null, 2));
      setUserToken(res.data?.jwtToken || userToken);
      setRefreshToken(res.data?.refreshToken || rt);
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setRefreshLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator
    >
      <Text style={styles.title}>API Test Utility</Text>
      <Text style={styles.subtitle}>
        Use this screen to verify connectivity and tokens before wiring into the
        rest of the app.
      </Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Configuration</Text>
        <Text style={styles.label}>API Enabled</Text>
        <Text style={styles.value}>{extra?.apiEnabled ? 'true' : 'false'}</Text>

        <Text style={styles.label}>API Base URL</Text>
        <Text style={styles.value}>{extra?.apiUrl || 'not set'}</Text>

        <Text style={styles.label}>Auth Base URL</Text>
        <Text style={styles.value}>{extra?.authApiUrl || extra?.apiUrl || 'not set'}</Text>

        <Text style={styles.label}>Client Key</Text>
        <Text style={styles.value}>{extra?.clientKey || 'customer'}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>App Token</Text>
        <Button
          mode="contained"
          onPress={handleGenerateAppToken}
          loading={isLoading}
          style={styles.button}
          buttonColor="#C8202F"
          textColor="#FFFFFF"
        >
          Generate App Token
        </Button>

        <Button
          mode="outlined"
          onPress={handleClearTokens}
          disabled={isLoading}
          style={styles.button}
        >
          Clear Stored Tokens
        </Button>

        {statusMessage ? <Text style={styles.success}>{statusMessage}</Text> : null}
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

        {appToken ? (
          <View style={styles.tokenBox}>
            <Text style={styles.tokenLabel}>App Token</Text>
            <Text selectable style={styles.tokenValue}>
              {appToken}
            </Text>
          </View>
        ) : null}

        {userToken ? (
          <View style={styles.tokenBox}>
            <Text style={styles.tokenLabel}>User JWT</Text>
            <Text selectable style={styles.tokenValue}>
              {userToken}
            </Text>
          </View>
        ) : null}

        {refreshToken ? (
          <View style={styles.tokenBox}>
            <Text style={styles.tokenLabel}>Refresh Token</Text>
            <Text selectable style={styles.tokenValue}>
              {refreshToken}
            </Text>
          </View>
        ) : null}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Login Test</Text>

        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Button
          mode="contained"
          onPress={handleTestLogin}
          loading={loginLoading}
          style={styles.button}
          buttonColor="#0F766E"
          textColor="#FFFFFF"
        >
          Test Login
        </Button>

        {loginResult ? (
          <View style={styles.resultBox}>
            <Text style={styles.resultLabel}>Response</Text>
            <Text selectable style={styles.resultValue}>
              {loginResult}
            </Text>
          </View>
        ) : null}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Refresh App Token</Text>
        <Button
          mode="contained"
          onPress={handleRefreshAppToken}
          loading={refreshLoading}
          style={styles.button}
          buttonColor="#2563EB"
          textColor="#FFFFFF"
        >
          Refresh Token
        </Button>
        {refreshResult ? (
          <View style={styles.resultBox}>
            <Text style={styles.resultLabel}>Response</Text>
            <Text selectable style={styles.resultValue}>
              {refreshResult}
            </Text>
          </View>
        ) : null}
      </View>


      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    color: '#0F172A',
  },
  label: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 8,
  },
  value: {
    fontSize: 14,
    color: '#0F172A',
  },
  button: {
    marginTop: 8,
    borderRadius: 10,
  },
  success: {
    marginTop: 10,
    color: '#059669',
    fontWeight: '600',
  },
  error: {
    marginTop: 10,
    color: '#DC2626',
    fontWeight: '600',
  },
  tokenBox: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tokenLabel: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 4,
  },
  tokenValue: {
    fontSize: 13,
    color: '#0F172A',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: 14,
  },
  resultBox: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  resultLabel: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 4,
  },
  resultValue: {
    fontSize: 12,
    color: '#0F172A',
  },
});
