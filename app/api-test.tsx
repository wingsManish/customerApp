import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import { Button, Menu } from 'react-native-paper';
import Constants from 'expo-constants';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

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
  const [loggedInUsername, setLoggedInUsername] = useState<string>('');
  
  // Attachment state
  const [uploadLoading, setUploadLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [attachmentId, setAttachmentId] = useState<number | null>(null);
  const [attachmentFileName, setAttachmentFileName] = useState<string>('');
  const [attachmentResult, setAttachmentResult] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<DocumentPicker.DocumentPickerResult | null>(null);
  const [updateAttachmentId, setUpdateAttachmentId] = useState<string>('');
  
  // Company form state
  const [companyLoading, setCompanyLoading] = useState(false);
  const [companyResult, setCompanyResult] = useState<string>('');
  const [orgTypeMenuVisible, setOrgTypeMenuVisible] = useState(false);
  const [orgType, setOrgType] = useState<number>(3); // Default to CustomerIndividual
  const [modeOfCommMenuVisible, setModeOfCommMenuVisible] = useState(false);
  const [companyFile, setCompanyFile] = useState<DocumentPicker.DocumentPickerResult | null>(null);
  const [companyAttachmentId, setCompanyAttachmentId] = useState<number | null>(null);
  const [companyData, setCompanyData] = useState({
    name: '',
    ownerName: '',
    isAgent: false,
    alsoTruckOwner: true,
    alsoCustomer: true,
    licenseNo: '',
    address1: '',
    city: '',
    state: '',
    country: '',
    pinCode: '',
    phone: '',
    primaryContactDto: {
      title: '',
      firstName: '',
      middleName: '',
      lastName: '',
      mobile: '',
      phone: '',
      emailId: '',
      modeOfCommunication: '',
      userName: '',
      password: '',
      specialRole: '',
      isPrimary: true,
      country: '',
      alsoTruckOwner: true,
      alsoCustomer: true,
    },
    parentCompanyID: 0,
    tinNo: '',
    bankAcNo: '',
    bankName: '',
    accountType: '',
    bankBranch: '',
    ifsc: '',
    micr: '',
    bankOtherDetails: '',
    emergencyName: '',
    emerPhone: '',
    emerAddress: '',
    location: '',
    status: 0,
    comments: '',
  });

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
    setLoggedInUsername('');
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
        setLoggedInUsername(username); // Store logged-in username
        // Auto-populate primary contact username
        setCompanyData({
          ...companyData,
          primaryContactDto: {
            ...companyData.primaryContactDto,
            userName: username,
          },
        });
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

  const handlePickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setSelectedFile(result);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick file');
    }
  };

  const handleUploadAttachment = async () => {
    if (!selectedFile || selectedFile.canceled || !selectedFile.assets?.[0]) {
      Alert.alert('Error', 'Please select a file first');
      return;
    }

    setUploadLoading(true);
    setAttachmentResult('');
    setErrorMessage('');

    try {
      const jwt = userToken || (await apiClient.getUserTokenPublic());
      if (!jwt) {
        setErrorMessage('No JWT token available. Login first.');
        setUploadLoading(false);
        return;
      }

      const file = selectedFile.assets[0];
      const formData = new FormData();
      formData.append('file', {
        uri: file.uri,
        type: file.mimeType || 'application/octet-stream',
        name: file.name || 'file',
      } as any);

      const url = `${apiClient.baseApiURL}/Attachment/upload`;
      console.log('[UPLOAD REQUEST]', { url, method: 'POST', fileName: file.name });

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: '*/*',
          Authorization: jwt.startsWith('Bearer ') ? jwt : `Bearer ${jwt}`,
        },
        body: formData,
      });

      const json = await response.json().catch(() => null);
      setAttachmentResult(JSON.stringify({ status: response.status, data: json }, null, 2));

      if (response.ok && json?.data?.attachmentId) {
        setAttachmentId(json.data.attachmentId);
        setAttachmentFileName(json.data.fileName || file.name);
        setStatusMessage(`File uploaded successfully. Attachment ID: ${json.data.attachmentId}`);
      } else {
        setErrorMessage(json?.message || `Upload failed (${response.status})`);
      }
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setUploadLoading(false);
    }
  };

  const handleUpdateAttachment = async () => {
    if (!selectedFile || selectedFile.canceled || !selectedFile.assets?.[0]) {
      Alert.alert('Error', 'Please select a file first');
      return;
    }

    if (!updateAttachmentId) {
      Alert.alert('Error', 'Please enter attachment ID to update');
      return;
    }

    setUpdateLoading(true);
    setAttachmentResult('');
    setErrorMessage('');

    try {
      const jwt = userToken || (await apiClient.getUserTokenPublic());
      if (!jwt) {
        setErrorMessage('No JWT token available. Login first.');
        setUpdateLoading(false);
        return;
      }

      const file = selectedFile.assets[0];
      const formData = new FormData();
      formData.append('file', {
        uri: file.uri,
        type: file.mimeType || 'application/octet-stream',
        name: file.name || 'file',
      } as any);

      const url = `${apiClient.baseApiURL}/Attachment/update/${updateAttachmentId}`;
      console.log('[UPDATE REQUEST]', { url, method: 'PUT', attachmentId: updateAttachmentId, fileName: file.name });

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          Accept: '*/*',
          Authorization: jwt.startsWith('Bearer ') ? jwt : `Bearer ${jwt}`,
        },
        body: formData,
      });

      const json = await response.json().catch(() => null);
      setAttachmentResult(JSON.stringify({ status: response.status, data: json }, null, 2));

      if (response.ok) {
        setStatusMessage(`Attachment ${updateAttachmentId} updated successfully`);
      } else {
        setErrorMessage(json?.message || `Update failed (${response.status})`);
      }
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleDownloadAttachment = async () => {
    if (!attachmentId) {
      Alert.alert('Error', 'Please upload a file first to get attachment ID');
      return;
    }

    setDownloadLoading(true);
    setAttachmentResult('');
    setErrorMessage('');

    try {
      const jwt = userToken || (await apiClient.getUserTokenPublic());
      if (!jwt) {
        setErrorMessage('No JWT token available. Login first.');
        setDownloadLoading(false);
        return;
      }

      const url = `${apiClient.baseApiURL}/Attachment/download/${attachmentId}`;
      console.log('[DOWNLOAD REQUEST]', { url, method: 'GET', attachmentId });

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: '*/*',
          Authorization: jwt.startsWith('Bearer ') ? jwt : `Bearer ${jwt}`,
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        setStatusMessage(`File downloaded successfully (${blob.size} bytes)`);
        setAttachmentResult(`Download successful. File size: ${blob.size} bytes`);
      } else {
        const json = await response.json().catch(() => null);
        setErrorMessage(json?.message || `Download failed (${response.status})`);
      }
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setDownloadLoading(false);
    }
  };

  const handlePickCompanyFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setCompanyFile(result);
        setCompanyAttachmentId(null); // Reset attachment ID when new file is selected
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick file');
    }
  };

  const handleCreateCompany = async () => {
    setCompanyLoading(true);
    setCompanyResult('');
    setErrorMessage('');
    try {
      const jwt = userToken || (await apiClient.getUserTokenPublic());
      if (!jwt) {
        setErrorMessage('No JWT token available. Login first.');
        setCompanyLoading(false);
        return;
      }

      const finalUsername = companyData.primaryContactDto.userName || loggedInUsername;
      if (!finalUsername) {
        setErrorMessage('Username is mandatory. Please login first.');
        setCompanyLoading(false);
        return;
      }

      // Upload file first if one is selected
      let finalAttachmentId = companyAttachmentId || 0;
      if (companyFile && !companyFile.canceled && companyFile.assets?.[0]) {
        try {
          const file = companyFile.assets[0];
          const formData = new FormData();
          formData.append('file', {
            uri: file.uri,
            type: file.mimeType || 'application/octet-stream',
            name: file.name || 'file',
          } as any);

          const uploadUrl = `${apiClient.baseApiURL}/Attachment/upload`;
          console.log('[COMPANY FILE UPLOAD]', { url: uploadUrl, fileName: file.name });

          const uploadResponse = await fetch(uploadUrl, {
            method: 'POST',
            headers: {
              Accept: '*/*',
              Authorization: jwt.startsWith('Bearer ') ? jwt : `Bearer ${jwt}`,
            },
            body: formData,
          });

          const uploadJson = await uploadResponse.json().catch(() => null);
          if (uploadResponse.ok && uploadJson?.data?.attachmentId) {
            finalAttachmentId = uploadJson.data.attachmentId;
            setCompanyAttachmentId(finalAttachmentId);
            console.log('[COMPANY FILE UPLOAD SUCCESS]', { attachmentId: finalAttachmentId });
          } else {
            setErrorMessage(`File upload failed: ${uploadJson?.message || 'Unknown error'}`);
            setCompanyLoading(false);
            return;
          }
        } catch (uploadError) {
          setErrorMessage(`File upload error: ${getErrorMessage(uploadError)}`);
          setCompanyLoading(false);
          return;
        }
      }

      const payload = {
        name: companyData.name,
        ownerName: companyData.ownerName,
        orgType: orgType,
        isAgent: companyData.isAgent,
        alsoTruckOwner: companyData.alsoTruckOwner,
        alsoCustomer: companyData.alsoCustomer,
        licenseNo: companyData.licenseNo,
        address1: companyData.address1,
        city: companyData.city,
        state: companyData.state,
        country: companyData.country,
        pinCode: companyData.pinCode,
        phone: companyData.phone,
        primaryContactDto: {
          employeeId: 0,
          title: companyData.primaryContactDto.title,
          firstName: companyData.primaryContactDto.firstName,
          middleName: companyData.primaryContactDto.middleName,
          lastName: companyData.primaryContactDto.lastName,
          mobile: companyData.primaryContactDto.mobile,
          phone: companyData.primaryContactDto.phone,
          emailId: companyData.primaryContactDto.emailId,
          modeOfCommunication: companyData.primaryContactDto.modeOfCommunication,
          userName: finalUsername,
          password: companyData.primaryContactDto.password,
          specialRole: companyData.primaryContactDto.specialRole,
          isPrimary: companyData.primaryContactDto.isPrimary,
          orgId: 0,
          status: 0,
          attachmentId: finalAttachmentId,
          country: companyData.primaryContactDto.country,
          alsoTruckOwner: companyData.primaryContactDto.alsoTruckOwner,
          alsoCustomer: companyData.primaryContactDto.alsoCustomer,
        },
        parentCompanyID: companyData.parentCompanyID,
        tinNo: companyData.tinNo,
        bankAcNo: companyData.bankAcNo,
        bankName: companyData.bankName,
        accountType: companyData.accountType,
        bankBranch: companyData.bankBranch,
        ifsc: companyData.ifsc,
        micr: companyData.micr,
        bankOtherDetails: companyData.bankOtherDetails,
        emergencyName: companyData.emergencyName,
        emerPhone: companyData.emerPhone,
        emerAddress: companyData.emerAddress,
        location: companyData.location,
        status: companyData.status,
        comments: companyData.comments,
        orgAttachments: [],
        orgRoles: [],
      };

      const url = `${apiClient.baseApiURL}/Company`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
          Authorization: jwt.startsWith('Bearer ') ? jwt : `Bearer ${jwt}`,
        },
        body: JSON.stringify(payload),
      });

      const json = await response.json().catch(() => null);
      setCompanyResult(JSON.stringify({ status: response.status, data: json }, null, 2));
      
      if (!response.ok) {
        setErrorMessage(json?.message || `Company creation failed (${response.status})`);
      }
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setCompanyLoading(false);
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

        <Text style={styles.label}>Base API URL</Text>
        <Text style={styles.value}>{extra?.baseApiUrl || apiClient.baseApiURL || 'not set'}</Text>

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

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Attachment Test</Text>

        <Button
          mode="outlined"
          onPress={handlePickFile}
          style={styles.button}
        >
          {selectedFile && !selectedFile.canceled && selectedFile.assets?.[0]
            ? `Selected: ${selectedFile.assets[0].name}`
            : 'Select File'}
        </Button>

        <Button
          mode="contained"
          onPress={handleUploadAttachment}
          loading={uploadLoading}
          style={styles.button}
          buttonColor="#10B981"
          textColor="#FFFFFF"
        >
          Upload File
        </Button>

        {attachmentId ? (
          <View style={styles.tokenBox}>
            <Text style={styles.tokenLabel}>Attachment ID</Text>
            <Text selectable style={styles.tokenValue}>
              {attachmentId}
            </Text>
            {attachmentFileName ? (
              <Text style={[styles.tokenLabel, { marginTop: 4 }]}>File: {attachmentFileName}</Text>
            ) : null}
          </View>
        ) : null}

        <Text style={[styles.label, { marginTop: 16 }]}>Update Attachment ID</Text>
        <TextInput
          style={styles.input}
          value={updateAttachmentId}
          onChangeText={setUpdateAttachmentId}
          placeholder="Enter attachment ID to update"
          keyboardType="numeric"
        />

        <Button
          mode="contained"
          onPress={handleUpdateAttachment}
          loading={updateLoading}
          style={styles.button}
          buttonColor="#F59E0B"
          textColor="#FFFFFF"
        >
          Update Attachment
        </Button>

        {attachmentId ? (
          <Button
            mode="contained"
            onPress={handleDownloadAttachment}
            loading={downloadLoading}
            style={styles.button}
            buttonColor="#8B5CF6"
            textColor="#FFFFFF"
          >
            Download Attachment
          </Button>
        ) : null}

        {attachmentResult ? (
          <View style={styles.resultBox}>
            <Text style={styles.resultLabel}>Response</Text>
            <Text selectable style={styles.resultValue}>
              {attachmentResult}
            </Text>
          </View>
        ) : null}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Create Company/Organization</Text>
        
        <Text style={styles.label}>Organization Type *</Text>
        <Menu
          visible={orgTypeMenuVisible}
          onDismiss={() => setOrgTypeMenuVisible(false)}
          anchor={
            <TouchableOpacity
              style={styles.input}
              onPress={() => setOrgTypeMenuVisible(true)}
            >
              <Text>{orgType === 3 ? 'Customer Individual' : 'Customer Company'}</Text>
            </TouchableOpacity>
          }
        >
          <Menu.Item
            onPress={() => {
              setOrgType(3);
              setOrgTypeMenuVisible(false);
            }}
            title="Customer Individual (3)"
          />
          <Menu.Item
            onPress={() => {
              setOrgType(4);
              setOrgTypeMenuVisible(false);
            }}
            title="Customer Company (4)"
          />
        </Menu>

        <Text style={styles.label}>Company Name *</Text>
        <TextInput
          style={styles.input}
          value={companyData.name}
          onChangeText={(text) => setCompanyData({ ...companyData, name: text })}
          placeholder="Enter company name"
        />

        <Text style={styles.label}>Owner Name</Text>
        <TextInput
          style={styles.input}
          value={companyData.ownerName}
          onChangeText={(text) => setCompanyData({ ...companyData, ownerName: text })}
          placeholder="Enter owner name"
        />

        <Text style={styles.label}>License Number</Text>
        <TextInput
          style={styles.input}
          value={companyData.licenseNo}
          onChangeText={(text) => setCompanyData({ ...companyData, licenseNo: text })}
          placeholder="Enter license number"
        />

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value={companyData.address1}
          onChangeText={(text) => setCompanyData({ ...companyData, address1: text })}
          placeholder="Enter address"
        />

        <Text style={styles.label}>City</Text>
        <TextInput
          style={styles.input}
          value={companyData.city}
          onChangeText={(text) => setCompanyData({ ...companyData, city: text })}
          placeholder="Enter city"
        />

        <Text style={styles.label}>State</Text>
        <TextInput
          style={styles.input}
          value={companyData.state}
          onChangeText={(text) => setCompanyData({ ...companyData, state: text })}
          placeholder="Enter state"
        />

        <Text style={styles.label}>Country</Text>
        <TextInput
          style={styles.input}
          value={companyData.country}
          onChangeText={(text) => setCompanyData({ ...companyData, country: text })}
          placeholder="Enter country"
        />

        <Text style={styles.label}>PIN Code</Text>
        <TextInput
          style={styles.input}
          value={companyData.pinCode}
          onChangeText={(text) => setCompanyData({ ...companyData, pinCode: text })}
          placeholder="Enter PIN code"
        />

        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          value={companyData.phone}
          onChangeText={(text) => setCompanyData({ ...companyData, phone: text })}
          placeholder="Enter phone"
          keyboardType="phone-pad"
        />

        <Text style={[styles.label, { marginTop: 16, fontWeight: '600' }]}>Primary Contact</Text>

        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          value={companyData.primaryContactDto.firstName}
          onChangeText={(text) =>
            setCompanyData({
              ...companyData,
              primaryContactDto: { ...companyData.primaryContactDto, firstName: text },
            })
          }
          placeholder="Enter first name"
        />

        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          value={companyData.primaryContactDto.lastName}
          onChangeText={(text) =>
            setCompanyData({
              ...companyData,
              primaryContactDto: { ...companyData.primaryContactDto, lastName: text },
            })
          }
          placeholder="Enter last name"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={companyData.primaryContactDto.emailId}
          onChangeText={(text) =>
            setCompanyData({
              ...companyData,
              primaryContactDto: { ...companyData.primaryContactDto, emailId: text },
            })
          }
          placeholder="Enter email"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Mobile</Text>
        <TextInput
          style={styles.input}
          value={companyData.primaryContactDto.mobile}
          onChangeText={(text) =>
            setCompanyData({
              ...companyData,
              primaryContactDto: { ...companyData.primaryContactDto, mobile: text },
            })
          }
          placeholder="Enter mobile"
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Mode of Communication</Text>
        <Menu
          visible={modeOfCommMenuVisible}
          onDismiss={() => setModeOfCommMenuVisible(false)}
          anchor={
            <TouchableOpacity
              style={styles.input}
              onPress={() => setModeOfCommMenuVisible(true)}
            >
              <Text>
                {companyData.primaryContactDto.modeOfCommunication || 'Select mode of communication'}
              </Text>
            </TouchableOpacity>
          }
        >
          <Menu.Item
            onPress={() => {
              setCompanyData({
                ...companyData,
                primaryContactDto: { ...companyData.primaryContactDto, modeOfCommunication: 'sms' },
              });
              setModeOfCommMenuVisible(false);
            }}
            title="SMS"
          />
          <Menu.Item
            onPress={() => {
              setCompanyData({
                ...companyData,
                primaryContactDto: { ...companyData.primaryContactDto, modeOfCommunication: 'email' },
              });
              setModeOfCommMenuVisible(false);
            }}
            title="Email"
          />
          <Menu.Item
            onPress={() => {
              setCompanyData({
                ...companyData,
                primaryContactDto: { ...companyData.primaryContactDto, modeOfCommunication: 'both' },
              });
              setModeOfCommMenuVisible(false);
            }}
            title="Both"
          />
        </Menu>

        <Text style={styles.label}>User Name * (from login)</Text>
        <TextInput
          style={[styles.input, { backgroundColor: '#F3F4F6' }]}
          value={loggedInUsername || companyData.primaryContactDto.userName}
          editable={false}
          placeholder={loggedInUsername ? loggedInUsername : 'Login first to auto-fill username'}
        />

        <Text style={[styles.label, { marginTop: 16 }]}>Attachment File *</Text>
        <Button
          mode="outlined"
          onPress={handlePickCompanyFile}
          style={styles.button}
        >
          {companyFile && !companyFile.canceled && companyFile.assets?.[0]
            ? `Selected: ${companyFile.assets[0].name}`
            : 'Select File for Upload'}
        </Button>
        {companyAttachmentId ? (
          <View style={[styles.tokenBox, { marginTop: 8 }]}>
            <Text style={styles.tokenLabel}>Attachment ID: {companyAttachmentId}</Text>
            <Text style={[styles.tokenLabel, { marginTop: 4, fontSize: 11 }]}>
              File will be uploaded automatically when creating company
            </Text>
          </View>
        ) : companyFile && !companyFile.canceled ? (
          <Text style={[styles.label, { color: '#059669', marginTop: 4 }]}>
            File selected. Will upload on company creation.
          </Text>
        ) : null}

        <Text style={[styles.label, { marginTop: 16, fontWeight: '600' }]}>Bank Details</Text>

        <Text style={styles.label}>Bank Account Number</Text>
        <TextInput
          style={styles.input}
          value={companyData.bankAcNo}
          onChangeText={(text) => setCompanyData({ ...companyData, bankAcNo: text })}
          placeholder="Enter bank account number"
        />

        <Text style={styles.label}>Bank Name</Text>
        <TextInput
          style={styles.input}
          value={companyData.bankName}
          onChangeText={(text) => setCompanyData({ ...companyData, bankName: text })}
          placeholder="Enter bank name"
        />

        <Text style={styles.label}>Account Type</Text>
        <TextInput
          style={styles.input}
          value={companyData.accountType}
          onChangeText={(text) => setCompanyData({ ...companyData, accountType: text })}
          placeholder="Enter account type"
        />

        <Text style={styles.label}>IFSC</Text>
        <TextInput
          style={styles.input}
          value={companyData.ifsc}
          onChangeText={(text) => setCompanyData({ ...companyData, ifsc: text })}
          placeholder="Enter IFSC code"
        />

        <Text style={[styles.label, { marginTop: 16, fontWeight: '600' }]}>Emergency Contact</Text>

        <Text style={styles.label}>Emergency Name</Text>
        <TextInput
          style={styles.input}
          value={companyData.emergencyName}
          onChangeText={(text) => setCompanyData({ ...companyData, emergencyName: text })}
          placeholder="Enter emergency contact name"
        />

        <Text style={styles.label}>Emergency Phone</Text>
        <TextInput
          style={styles.input}
          value={companyData.emerPhone}
          onChangeText={(text) => setCompanyData({ ...companyData, emerPhone: text })}
          placeholder="Enter emergency phone"
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Emergency Address</Text>
        <TextInput
          style={styles.input}
          value={companyData.emerAddress}
          onChangeText={(text) => setCompanyData({ ...companyData, emerAddress: text })}
          placeholder="Enter emergency address"
        />

        <Button
          mode="contained"
          onPress={handleCreateCompany}
          loading={companyLoading}
          style={styles.button}
          buttonColor="#7C3AED"
          textColor="#FFFFFF"
        >
          Create Company
        </Button>

        {companyResult ? (
          <View style={styles.resultBox}>
            <Text style={styles.resultLabel}>Response</Text>
            <Text selectable style={styles.resultValue}>
              {companyResult}
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
