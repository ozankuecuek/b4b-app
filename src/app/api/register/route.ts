import { NextRequest, NextResponse } from 'next/server';
import { identityPlatformService, UserData, CompanyData } from '@/lib/identity-platform';
import { firestoreService } from '@/lib/firestore-service';

export interface RegistrationRequest {
  companyData: CompanyData;
  userData: UserData;
}

export async function POST(request: NextRequest) {
  try {
    const body: RegistrationRequest = await request.json();
    const { companyData, userData } = body;

    // Validate required fields
    if (!companyData.name || !userData.email || !userData.password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log('Starting B2B registration process...');

    // Step 1: Create tenant for the company
    console.log(`Creating tenant for company: ${companyData.name}`);
    const tenantId = await identityPlatformService.createTenant(companyData.name);

    // Step 2: Create user in the tenant
    console.log(`Creating user in tenant ${tenantId}: ${userData.email}`);
    const userId = await identityPlatformService.createUserInTenant(tenantId, userData);

    // Step 3: Save company data to Firestore
    console.log(`Saving company data for tenant: ${tenantId}`);
    await firestoreService.saveCompanyData(tenantId, companyData);

    // Step 4: Save user profile data to Firestore
    console.log(`Saving user profile for user: ${userId}`);
    await firestoreService.saveUserProfile(tenantId, userId, userData, 'admin');

    console.log('B2B registration completed successfully');

    return NextResponse.json({
      success: true,
      data: {
        tenantId,
        userId,
        companyName: companyData.name,
        userEmail: userData.email,
      },
    });

  } catch (error) {
    console.error('Registration error:', error);
    
    return NextResponse.json(
      { 
        error: 'Registration failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Get registration status or company info
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tenantId = searchParams.get('tenantId');

    if (!tenantId) {
      return NextResponse.json(
        { error: 'Tenant ID is required' },
        { status: 400 }
      );
    }

    // Get tenant info
    const tenant = await identityPlatformService.getTenant(tenantId);
    
    // Get company data from Firestore
    const companyData = await firestoreService.getCompanyData(tenantId);

    // Get list of users in the company from Firestore
    const userIds = await firestoreService.listCompanyUsers(tenantId);

    return NextResponse.json({
      success: true,
      data: {
        tenant,
        companyData,
        userCount: userIds.length,
        userIds,
      },
    });

  } catch (error) {
    console.error('Error getting registration info:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to get registration info',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 