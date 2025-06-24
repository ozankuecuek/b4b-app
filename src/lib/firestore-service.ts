import { adminDb } from './firebase-admin';
import { CompanyData, UserData } from './identity-platform';
import { Timestamp } from 'firebase-admin/firestore';

export interface CompanyDocument extends CompanyData {
  tenantId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  userCount: number;
}

export interface UserDocument extends Omit<UserData, 'password'> {
  userId: string;
  tenantId: string;
  role: 'admin' | 'user';
  createdAt: Timestamp;
  updatedAt: Timestamp;
  isActive: boolean;
}

export class FirestoreService {
  // Save company data to Firestore
  async saveCompanyData(tenantId: string, companyData: CompanyData): Promise<void> {
    try {
      const companyDoc: CompanyDocument = {
        ...companyData,
        tenantId,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        userCount: 1, // Starting with 1 admin user
      };

      await adminDb.collection('companies').doc(tenantId).set(companyDoc);
      console.log(`Company data saved successfully for tenant: ${tenantId}`);
    } catch (error) {
      console.error('Error saving company data:', error);
      throw new Error('Failed to save company data');
    }
  }

  // Save user profile data to Firestore
  async saveUserProfile(tenantId: string, userId: string, userData: Partial<UserData>, role: 'admin' | 'user' = 'admin'): Promise<void> {
    try {
      // Remove sensitive data like password before saving
      const { password: _, ...profileData } = userData as UserData;
      
      const userDoc: UserDocument = {
        ...profileData,
        userId,
        tenantId,
        role,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        isActive: true,
      };

      // Save to users collection with compound document ID
      await adminDb.collection('users').doc(`${tenantId}_${userId}`).set(userDoc);
      
      // Also save to a subcollection under the company for easier querying
      await adminDb.collection('companies').doc(tenantId)
        .collection('users').doc(userId).set(userDoc);

      console.log(`User profile saved successfully for user: ${userId} in tenant: ${tenantId}`);
    } catch (error) {
      console.error('Error saving user profile:', error);
      throw new Error('Failed to save user profile');
    }
  }

  // Get company data
  async getCompanyData(tenantId: string): Promise<CompanyDocument | null> {
    try {
      const doc = await adminDb.collection('companies').doc(tenantId).get();
      
      if (!doc.exists) {
        return null;
      }

      return doc.data() as CompanyDocument;
    } catch (error) {
      console.error('Error getting company data:', error);
      throw new Error('Failed to get company data');
    }
  }

  // Get user profile data
  async getUserProfile(tenantId: string, userId: string): Promise<UserDocument | null> {
    try {
      const doc = await adminDb.collection('users').doc(`${tenantId}_${userId}`).get();
      
      if (!doc.exists) {
        return null;
      }

      return doc.data() as UserDocument;
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw new Error('Failed to get user profile');
    }
  }

  // List all users in a company
  async listCompanyUsers(tenantId: string): Promise<UserDocument[]> {
    try {
      const snapshot = await adminDb.collection('companies').doc(tenantId)
        .collection('users').get();

      return snapshot.docs.map(doc => doc.data() as UserDocument);
    } catch (error) {
      console.error('Error listing company users:', error);
      throw new Error('Failed to list company users');
    }
  }

  // Get all companies (for admin purposes)
  async listAllCompanies(): Promise<CompanyDocument[]> {
    try {
      const snapshot = await adminDb.collection('companies').get();
      return snapshot.docs.map(doc => doc.data() as CompanyDocument);
    } catch (error) {
      console.error('Error listing companies:', error);
      throw new Error('Failed to list companies');
    }
  }

  // Search companies by industry
  async getCompaniesByIndustry(industry: string): Promise<CompanyDocument[]> {
    try {
      const snapshot = await adminDb.collection('companies')
        .where('industry', '==', industry)
        .get();

      return snapshot.docs.map(doc => doc.data() as CompanyDocument);
    } catch (error) {
      console.error('Error getting companies by industry:', error);
      throw new Error('Failed to get companies by industry');
    }
  }

  // Update company data
  async updateCompanyData(tenantId: string, updates: Partial<CompanyData>): Promise<void> {
    try {
      await adminDb.collection('companies').doc(tenantId).update({
        ...updates,
        updatedAt: Timestamp.now(),
      });

      console.log(`Company data updated successfully for tenant: ${tenantId}`);
    } catch (error) {
      console.error('Error updating company data:', error);
      throw new Error('Failed to update company data');
    }
  }

  // Update user profile
  async updateUserProfile(tenantId: string, userId: string, updates: Partial<UserData>): Promise<void> {
    try {
      const updateData = {
        ...updates,
        updatedAt: Timestamp.now(),
      };

      // Update in main users collection
      await adminDb.collection('users').doc(`${tenantId}_${userId}`).update(updateData);
      
      // Update in company subcollection
      await adminDb.collection('companies').doc(tenantId)
        .collection('users').doc(userId).update(updateData);

      console.log(`User profile updated successfully for user: ${userId} in tenant: ${tenantId}`);
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw new Error('Failed to update user profile');
    }
  }

  // Increment user count for a company
  async incrementUserCount(tenantId: string): Promise<void> {
    try {
      await adminDb.collection('companies').doc(tenantId).update({
        userCount: adminDb.FieldValue.increment(1),
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error incrementing user count:', error);
      throw new Error('Failed to increment user count');
    }
  }

  // Get companies by size
  async getCompaniesBySize(size: string): Promise<CompanyDocument[]> {
    try {
      const snapshot = await adminDb.collection('companies')
        .where('size', '==', size)
        .get();

      return snapshot.docs.map(doc => doc.data() as CompanyDocument);
    } catch (error) {
      console.error('Error getting companies by size:', error);
      throw new Error('Failed to get companies by size');
    }
  }

  // Get user stats across all companies
  async getUserStats(): Promise<{ totalUsers: number; activeUsers: number; totalCompanies: number }> {
    try {
      const [usersSnapshot, companiesSnapshot] = await Promise.all([
        adminDb.collection('users').get(),
        adminDb.collection('companies').get(),
      ]);

      const users = usersSnapshot.docs.map(doc => doc.data() as UserDocument);
      const activeUsers = users.filter(user => user.isActive).length;

      return {
        totalUsers: users.length,
        activeUsers,
        totalCompanies: companiesSnapshot.size,
      };
    } catch (error) {
      console.error('Error getting user stats:', error);
      throw new Error('Failed to get user stats');
    }
  }
}

export const firestoreService = new FirestoreService(); 