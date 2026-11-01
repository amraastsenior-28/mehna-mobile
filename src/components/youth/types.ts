export type YouthAppTheme = 'system' | 'light' | 'dark';

export interface YouthUserProfile {
  name: string;
  phone: string;
  dob: string; // YYYY-MM-DD
  email?: string;
  isUnder18: boolean;
  parentConsentGiven: boolean;
  parentPhone?: string;
  parentName?: string;
  trackAr?: string;
  trackEn?: string;
  skills?: string[];
  preferredLocation?: string;
  completionRate?: number;
}

export interface ApplicationRecord {
  id: string;
  opportunityId: string;
  appliedAt: string;
  status: 'received' | 'reviewing' | 'contract_setup';
}

/**
 * Calculates current age from a standard YYYY-MM-DD ISO string
 */
export function calculateUserAge(dobString: string): number {
  if (!dobString) return 19;
  const birth = new Date(dobString);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return isNaN(age) ? 19 : age;
}

/**
 * Checks if candidate is below 18 years of age (Dual VET minor protection policy)
 */
export function checkIsUnder18(dobString: string): boolean {
  return calculateUserAge(dobString) < 18;
}
