import { adminAuth } from './firebase-admin';

export interface TenantData {
  displayName: string;
  allowPasswordSignup: boolean;
  enableEmailLinkSignin: boolean;
}

export interface UserData {
  email: string;
  password: string;
  displayName: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
}

export interface CompanyData {
  name: string;
  industry: string;
  size: string;
  address: string;
  city: string;
  country: string;
  website?: string;
}

export class IdentityPlatformService {
  private projectId: string;

  constructor() {
    // Use Firebase App Hosting config first, fall back to local env
    if (process.env.FIREBASE_CONFIG) {
      try {
        const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);
        this.projectId = firebaseConfig.projectId;
        console.log('Using project ID from FIREBASE_CONFIG:', this.projectId);
      } catch {
        console.warn('Failed to parse FIREBASE_CONFIG, falling back to FIREBASE_PROJECT_ID');
        this.projectId = process.env.FIREBASE_PROJECT_ID!;
      }
    } else {
      // Local development fallback
      this.projectId = process.env.FIREBASE_PROJECT_ID!;
      console.log('Using project ID from FIREBASE_PROJECT_ID:', this.projectId);
    }
    
    if (!this.projectId) {
      throw new Error('Project ID not found in either FIREBASE_CONFIG or FIREBASE_PROJECT_ID');
    }
  }

  // Sanitize company name for Firebase tenant displayName
  private sanitizeTenantName(companyName: string): string {
    // Remove special characters, replace spaces with hyphens, convert to lowercase
    let sanitized = companyName
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special chars except spaces and hyphens
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens

    // Ensure it starts with a letter
    if (!/^[a-z]/.test(sanitized)) {
      sanitized = 'company-' + sanitized;
    }

    // Ensure it's within 4-20 characters
    if (sanitized.length < 4) {
      sanitized = sanitized.padEnd(4, '0');
    } else if (sanitized.length > 20) {
      sanitized = sanitized.substring(0, 20);
    }

    // Ensure it doesn't end with a hyphen
    sanitized = sanitized.replace(/-+$/, '');

    return sanitized;
  }

  // Create a new tenant for a company using Firebase Admin SDK
  async createTenant(companyName: string): Promise<string> {
    try {
      console.log(`Creating tenant for company: ${companyName}`);
      
      const sanitizedName = this.sanitizeTenantName(companyName);
      console.log(`Sanitized tenant name: ${sanitizedName}`);
      
      const tenantOptions = {
        displayName: sanitizedName,
        emailSignInConfig: {
          enabled: true,
          passwordRequired: true,
        },
        multiFactorConfig: {
          state: 'DISABLED' as const,
        },
      };

      const tenant = await adminAuth.tenantManager().createTenant(tenantOptions);
      
      console.log(`Tenant created successfully: ${tenant.tenantId}`);
      return tenant.tenantId;
    } catch (error) {
      console.error('Error creating tenant:', error);
      throw new Error('Failed to create tenant');
    }
  }

  // Create a user within a specific tenant using Firebase Admin SDK
  async createUserInTenant(tenantId: string, userData: UserData): Promise<string> {
    try {
      console.log(`Creating user in tenant ${tenantId}: ${userData.email}`);
      
      const tenantAuth = adminAuth.tenantManager().authForTenant(tenantId);
      
      // Prepare user creation data
      const userCreationData: {
        email: string;
        password: string;
        displayName: string;
        emailVerified: boolean;
        phoneNumber?: string;
      } = {
        email: userData.email,
        password: userData.password,
        displayName: userData.displayName,
        emailVerified: false,
      };

      // Only add phone number if it's provided and valid (E.164 format)
      if (userData.phoneNumber && userData.phoneNumber.trim()) {
        // Basic E.164 validation (starts with + and contains only digits)
        const phoneRegex = /^\+[1-9]\d{1,14}$/;
        if (phoneRegex.test(userData.phoneNumber.trim())) {
          userCreationData.phoneNumber = userData.phoneNumber.trim();
        } else {
          console.warn(`Invalid phone number format: ${userData.phoneNumber}. Skipping phone number.`);
        }
      }
      
      const userRecord = await tenantAuth.createUser(userCreationData);

      console.log(`User created successfully: ${userRecord.uid}`);
      return userRecord.uid;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Failed to create user');
    }
  }

  // Get tenant information using Firebase Admin SDK
  async getTenant(tenantId: string) {
    try {
      const tenant = await adminAuth.tenantManager().getTenant(tenantId);
      return tenant;
    } catch (error) {
      console.error('Error getting tenant:', error);
      throw new Error('Failed to get tenant');
    }
  }

  // List all tenants (for admin purposes) using Firebase Admin SDK
  async listTenants() {
    try {
      const listTenantsResult = await adminAuth.tenantManager().listTenants();
      return listTenantsResult.tenants;
    } catch (error) {
      console.error('Error listing tenants:', error);
      throw new Error('Failed to list tenants');
    }
  }
}

export const identityPlatformService = new IdentityPlatformService(); 