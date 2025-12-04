import AsyncStorage from '@react-native-async-storage/async-storage';

const SESSION_KEY = 'customer_app_session';

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pin: string;
}

export interface CompanyInfo {
  companyName: string;
  ownerName?: string;
  licenseNumber?: string;
  registrationNumber?: string;
  gstVatNumber?: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pin: string;
}

export interface ContactInfo {
  mobile: string;
  email: string;
  communicationMode: string;
}

export interface BankDetails {
  tinNumber?: string;
  accountNumber: string;
  bankName: string;
  accountType: string;
  bankBranch: string;
  ifsc?: string;
  micr?: string;
}

export interface EmergencyInfo {
  contactName: string;
  contactPhone: string;
  relationship: string;
  address: string;
}

export interface DocumentFile {
  id: string;
  name: string;
  sizeLabel: string;
  typeLabel: string;
}

export interface UserSession {
  phoneNumber: string;
  sessionId?: string;
  authToken?: string;
  userType?: 'individual' | 'company';
  profileCompleted: boolean;
  personalInfoCompleted?: boolean;
  personalInfo?: PersonalInfo;
  companyInfoCompleted?: boolean;
  companyInfo?: CompanyInfo;
  contactInfoCompleted?: boolean;
  contactInfo?: ContactInfo;
  documentsCompleted?: boolean;
  documents?: Record<string, DocumentFile[]>;
  bankDetailsCompleted?: boolean;
  bankDetails?: BankDetails;
  emergencyInfoCompleted?: boolean;
  emergencyInfo?: EmergencyInfo;
  onboardingComplete?: boolean;
  adminApproved?: boolean;
}

export const getSession = async (): Promise<UserSession | null> => {
  try {
    const stored = await AsyncStorage.getItem(SESSION_KEY);
    return stored ? (JSON.parse(stored) as UserSession) : null;
  } catch (error) {
    console.error('Error reading session', error);
    return null;
  }
};

export const saveSession = async (session: UserSession): Promise<void> => {
  try {
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch (error) {
    console.error('Error saving session', error);
  }
};

export const updateSession = async (updates: Partial<UserSession>): Promise<UserSession | null> => {
  const existing = await getSession();
  const nextSession: UserSession = {
    phoneNumber: updates.phoneNumber ?? existing?.phoneNumber ?? '',
    sessionId: updates.sessionId ?? existing?.sessionId,
    authToken: updates.authToken ?? existing?.authToken,
    userType: updates.userType ?? existing?.userType,
    profileCompleted: updates.profileCompleted ?? existing?.profileCompleted ?? false,
    personalInfoCompleted: updates.personalInfoCompleted ?? existing?.personalInfoCompleted ?? false,
    personalInfo: updates.personalInfo ?? existing?.personalInfo,
    companyInfoCompleted: updates.companyInfoCompleted ?? existing?.companyInfoCompleted ?? false,
    companyInfo: updates.companyInfo ?? existing?.companyInfo,
    contactInfoCompleted: updates.contactInfoCompleted ?? existing?.contactInfoCompleted ?? false,
    contactInfo: updates.contactInfo ?? existing?.contactInfo,
    documentsCompleted: updates.documentsCompleted ?? existing?.documentsCompleted ?? false,
    documents: updates.documents ?? existing?.documents ?? {},
    bankDetailsCompleted: updates.bankDetailsCompleted ?? existing?.bankDetailsCompleted ?? false,
    bankDetails: updates.bankDetails ?? existing?.bankDetails,
    emergencyInfoCompleted: updates.emergencyInfoCompleted ?? existing?.emergencyInfoCompleted ?? false,
    emergencyInfo: updates.emergencyInfo ?? existing?.emergencyInfo,
    onboardingComplete: updates.onboardingComplete ?? existing?.onboardingComplete ?? false,
    adminApproved: updates.adminApproved ?? existing?.adminApproved ?? false,
  };

  await saveSession(nextSession);
  return nextSession;
};

/**
 * Check if user has a valid session
 * Valid session means: has phoneNumber, sessionId, and authToken
 */
export const hasValidSession = async (): Promise<boolean> => {
  const session = await getSession();
  return !!(session?.phoneNumber && session?.sessionId && session?.authToken);
};

/**
 * Get the next route based on onboarding progress
 */
export const getNextRoute = (session: UserSession | null): string => {
  if (!session) {
    return '/welcome';
  }

  // If onboarding is complete, go to home
  if (session.onboardingComplete) {
    return '/home';
  }

  // Determine where to continue onboarding
  if (!session.personalInfoCompleted) {
    return '/personal-info';
  }
  if (!session.companyInfoCompleted && session.userType === 'company') {
    return '/company-details';
  }
  if (!session.contactInfoCompleted) {
    return '/contact-info';
  }
  if (!session.bankDetailsCompleted) {
    return '/bank-details';
  }
  if (!session.documentsCompleted) {
    return '/upload-documents';
  }
  if (!session.emergencyInfoCompleted) {
    return '/emergency-info';
  }

  // Default to home
  return '/home';
};

export const clearSession = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(SESSION_KEY);
  } catch (error) {
    console.error('Error clearing session', error);
  }
};

