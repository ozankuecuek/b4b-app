'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RegistrationForm } from '@/components/RegistrationForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const router = useRouter();
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [registrationData, setRegistrationData] = useState<{
    tenantId: string;
    userId: string;
    companyName: string;
    userEmail: string;
  } | null>(null);

  const handleRegistrationSuccess = (data: {
    tenantId: string;
    userId: string;
    companyName: string;
    userEmail: string;
  }) => {
    setRegistrationData(data);
    setRegistrationComplete(true);
  };

  const handleCancel = () => {
    router.push('/');
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  if (registrationComplete && registrationData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-green-600">
              🎉 Registration Successful!
            </CardTitle>
            <CardDescription>
              Your B2B account has been created successfully
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">Account Details:</h3>
              <div className="space-y-1 text-sm text-green-700">
                <p><strong>Company:</strong> {registrationData.companyName}</p>
                <p><strong>Admin Email:</strong> {registrationData.userEmail}</p>
                <p><strong>Tenant ID:</strong> {registrationData.tenantId}</p>
                <p><strong>User ID:</strong> {registrationData.userId}</p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">What's Next?</h3>
              <ul className="space-y-1 text-sm text-blue-700">
                <li>• A verification email has been sent to your email address</li>
                <li>• You can now log in to your company's tenant</li>
                <li>• Invite team members to join your organization</li>
                <li>• Configure your company settings and preferences</li>
              </ul>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-semibold text-yellow-800 mb-2">Important:</h3>
              <p className="text-sm text-yellow-700">
                Save your Tenant ID ({registrationData.tenantId}) as you'll need it for logging in to your company's account.
              </p>
            </div>

            <div className="flex justify-center">
              <Button onClick={handleBackToHome} className="px-8">
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-foreground mb-4">
            B2B Registration
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Create your company account with multi-tenant authentication powered by Google Identity Platform
          </p>
        </div>

        {/* Registration Form */}
        <RegistrationForm
          onSuccess={handleRegistrationSuccess}
          onCancel={handleCancel}
        />

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🏢 Multi-Tenant Architecture</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Each company gets its own isolated tenant with dedicated user management and security boundaries.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🔐 Enterprise Security</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Powered by Google Identity Platform with enterprise-grade authentication and authorization.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🗃️ Database Storage</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Company data and user profiles are securely stored in Firestore database with automatic backups.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 