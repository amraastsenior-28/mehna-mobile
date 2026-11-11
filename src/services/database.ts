import type { YouthUserProfile, YouthAppTheme } from '../components/youth/types';
import type { Language } from '../components/Navbar';

export interface ApplicationRecord {
  id: string;
  userId: string;
  opportunityId: string;
  appliedAt: string;
  status: 'received' | 'reviewing' | 'contract_setup';
}

export interface ParentalConsentRecord {
  id: string;
  candidateId: string;
  parentPhone: string;
  parentRelation: string;
  status: 'verified' | 'pending';
  verifiedAt: string;
}

export interface AppPreferences {
  theme: YouthAppTheme;
  language: Language;
}

const DB_KEYS = {
  CURRENT_USER: 'mehna_current_user_session',
  USERS: 'mehna_registered_users',
  APPLICATIONS: 'mehna_applications',
  PARENTAL_CONSENTS: 'mehna_parental_consents',
  PREFERENCES: 'mehna_app_preferences',
} as const;

/**
 * MEHNA Local Structured Database Service
 * Provides offline-first, persistent database operations using IndexedDB / LocalStorage:
 * - User Registration & Authentication storage
 * - Active Session state persistence across app reloads & re-opens
 * - Application history & tracking store
 * - Parental consent verification records for trainees under 18
 * - User theme & localization preferences
 */
class YouthDatabaseService {
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  // --- Session Management ---

  /**
   * Retrieves the currently active user session from the database.
   * Returns null if no active authenticated user exists (e.g. first launch or after sign out).
   */
  async getCurrentSession(): Promise<YouthUserProfile | null> {
    if (!this.isBrowser()) return null;
    try {
      const data = localStorage.getItem(DB_KEYS.CURRENT_USER);
      if (!data) return null;
      return JSON.parse(data) as YouthUserProfile;
    } catch (e) {
      console.error('Failed to read session from database:', e);
      return null;
    }
  }

  /**
   * Persists an active user session into the database.
   */
  async setSession(user: YouthUserProfile): Promise<void> {
    if (!this.isBrowser()) return;
    try {
      localStorage.setItem(DB_KEYS.CURRENT_USER, JSON.stringify(user));
      await this.saveUser(user);
    } catch (e) {
      console.error('Failed to save session to database:', e);
    }
  }

  /**
   * Clears the current active user session (Sign Out).
   */
  async clearSession(): Promise<void> {
    if (!this.isBrowser()) return;
    try {
      localStorage.removeItem(DB_KEYS.CURRENT_USER);
    } catch (e) {
      console.error('Failed to clear session from database:', e);
    }
  }

  // --- Users Store ---

  /**
   * Saves or updates a user in the persistent users collection.
   */
  async saveUser(user: YouthUserProfile): Promise<void> {
    if (!this.isBrowser()) return;
    try {
      const users = await this.getAllUsers();
      const existingIdx = users.findIndex((u) => u.phone === user.phone);
      if (existingIdx >= 0) {
        users[existingIdx] = { ...users[existingIdx], ...user };
      } else {
        users.push(user);
      }
      localStorage.setItem(DB_KEYS.USERS, JSON.stringify(users));
    } catch (e) {
      console.error('Failed to save user in database:', e);
    }
  }

  /**
   * Retrieves all registered users from the database.
   */
  async getAllUsers(): Promise<YouthUserProfile[]> {
    if (!this.isBrowser()) return [];
    try {
      const data = localStorage.getItem(DB_KEYS.USERS);
      return data ? (JSON.parse(data) as YouthUserProfile[]) : [];
    } catch (e) {
      console.error('Failed to retrieve users from database:', e);
      return [];
    }
  }

  /**
   * Finds a registered user by phone number.
   */
  async findUserByPhone(phone: string): Promise<YouthUserProfile | null> {
    const users = await this.getAllUsers();
    return users.find((u) => u.phone.replace(/\D/g, '') === phone.replace(/\D/g, '')) || null;
  }

  // --- Applications Store ---

  /**
   * Saves an application to an opportunity in the persistent database.
   */
  async recordApplication(userId: string, opportunityId: string): Promise<void> {
    if (!this.isBrowser()) return;
    try {
      const applications = await this.getAllApplications();
      const newRecord: ApplicationRecord = {
        id: `app_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        userId,
        opportunityId,
        appliedAt: new Date().toISOString(),
        status: 'received',
      };
      applications.push(newRecord);
      localStorage.setItem(DB_KEYS.APPLICATIONS, JSON.stringify(applications));
    } catch (e) {
      console.error('Failed to record application in database:', e);
    }
  }

  /**
   * Retrieves list of opportunity IDs that the candidate has applied to.
   */
  async getUserAppliedOpportunityIds(userId: string): Promise<string[]> {
    const apps = await this.getAllApplications();
    return apps.filter((a) => a.userId === userId).map((a) => a.opportunityId);
  }

  async getAllApplications(): Promise<ApplicationRecord[]> {
    if (!this.isBrowser()) return [];
    try {
      const data = localStorage.getItem(DB_KEYS.APPLICATIONS);
      return data ? (JSON.parse(data) as ApplicationRecord[]) : [];
    } catch (e) {
      console.error('Failed to load applications from database:', e);
      return [];
    }
  }

  // --- Parental Consent Audit Store ---

  /**
   * Records verified parental consent for a candidate under 18.
   */
  async recordParentalConsent(
    candidateId: string,
    parentPhone: string,
    parentRelation: string
  ): Promise<void> {
    if (!this.isBrowser()) return;
    try {
      const consents = await this.getAllParentalConsents();
      const newConsent: ParentalConsentRecord = {
        id: `consent_${Date.now()}`,
        candidateId,
        parentPhone,
        parentRelation,
        status: 'verified',
        verifiedAt: new Date().toISOString(),
      };
      consents.push(newConsent);
      localStorage.setItem(DB_KEYS.PARENTAL_CONSENTS, JSON.stringify(consents));
    } catch (e) {
      console.error('Failed to record parental consent in database:', e);
    }
  }

  async getAllParentalConsents(): Promise<ParentalConsentRecord[]> {
    if (!this.isBrowser()) return [];
    try {
      const data = localStorage.getItem(DB_KEYS.PARENTAL_CONSENTS);
      return data ? (JSON.parse(data) as ParentalConsentRecord[]) : [];
    } catch (e) {
      console.error('Failed to load parental consents from database:', e);
      return [];
    }
  }

  // --- Preferences Store ---

  async getPreferences(): Promise<AppPreferences> {
    if (!this.isBrowser()) return { theme: 'light', language: 'ar' };
    try {
      const data = localStorage.getItem(DB_KEYS.PREFERENCES);
      if (data) return JSON.parse(data) as AppPreferences;
    } catch (e) {
      console.error('Failed to get preferences from database:', e);
    }
    return { theme: 'light', language: 'ar' };
  }

  async savePreferences(prefs: Partial<AppPreferences>): Promise<void> {
    if (!this.isBrowser()) return;
    try {
      const current = await this.getPreferences();
      const updated = { ...current, ...prefs };
      localStorage.setItem(DB_KEYS.PREFERENCES, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save preferences to database:', e);
    }
  }
}

export const youthDB = new YouthDatabaseService();
