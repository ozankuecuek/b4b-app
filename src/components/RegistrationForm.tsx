'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CompanyData, UserData } from "@/lib/identity-platform";

interface RegistrationFormProps {
  onSuccess?: (data: { tenantId: string; userId: string; companyName: string; userEmail: string }) => void;
  onCancel?: () => void;
}

export function RegistrationForm({ onSuccess, onCancel }: RegistrationFormProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [companyData, setCompanyData] = useState<CompanyData>({
    name: '',
    industry: '',
    size: '',
    address: '',
    city: '',
    country: '',
    website: '',
  });

  const [userData, setUserData] = useState<UserData>({
    email: '',
    password: '',
    displayName: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });

  const handleCompanySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyData.name || !companyData.industry || !companyData.size) {
      setError('Please fill in all required company fields');
      return;
    }
    setError(null);
    setStep(2);
  };

  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userData.email || !userData.password || !userData.firstName || !userData.lastName) {
      setError('Please fill in all required personal fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Create display name from first and last name
      const displayName = `${userData.firstName} ${userData.lastName}`;
      const completeUserData = { ...userData, displayName };

      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyData,
          userData: completeUserData,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Registration failed');
      }

      // console.log('Registration successful:', result.data);
      onSuccess?.(result.data);
      
    } catch (err) {
      // console.error('Registration error:', err);
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setStep(1);
    setError(null);
  };

  if (step === 1) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
          <CardDescription>
            Step 1 of 2: Tell us about your company
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCompanySubmit} className="space-y-4">
            {error && (
              <div className="p-4 text-sm text-red-600 bg-red-50 rounded-md">
                {error}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="companyName" className="block text-sm font-medium mb-1">
                  Company Name *
                </label>
                <Input
                  id="companyName"
                  type="text"
                  required
                  placeholder="Acme Corporation"
                  value={companyData.name}
                  onChange={(e) => setCompanyData({ ...companyData, name: e.target.value })}
                />
              </div>
              
              <div>
                <label htmlFor="industry" className="block text-sm font-medium mb-1">
                  Industry *
                </label>
                <Input
                  id="industry"
                  type="text"
                  required
                  placeholder="Technology"
                  value={companyData.industry}
                  onChange={(e) => setCompanyData({ ...companyData, industry: e.target.value })}
                />
              </div>
              
              <div>
                <label htmlFor="size" className="block text-sm font-medium mb-1">
                  Company Size *
                </label>
                <select
                  id="size"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={companyData.size}
                  onChange={(e) => setCompanyData({ ...companyData, size: e.target.value })}
                >
                  <option value="">Select company size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-1000">201-1000 employees</option>
                  <option value="1000+">1000+ employees</option>
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium mb-1">
                  Address
                </label>
                <Input
                  id="address"
                  type="text"
                  placeholder="123 Business Street"
                  value={companyData.address}
                  onChange={(e) => setCompanyData({ ...companyData, address: e.target.value })}
                />
              </div>
              
              <div>
                <label htmlFor="city" className="block text-sm font-medium mb-1">
                  City
                </label>
                <Input
                  id="city"
                  type="text"
                  placeholder="San Francisco"
                  value={companyData.city}
                  onChange={(e) => setCompanyData({ ...companyData, city: e.target.value })}
                />
              </div>
              
              <div>
                <label htmlFor="country" className="block text-sm font-medium mb-1">
                  Country
                </label>
                <Input
                  id="country"
                  type="text"
                  placeholder="United States"
                  value={companyData.country}
                  onChange={(e) => setCompanyData({ ...companyData, country: e.target.value })}
                />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="website" className="block text-sm font-medium mb-1">
                  Website
                </label>
                <Input
                  id="website"
                  type="url"
                  placeholder="https://www.example.com"
                  value={companyData.website}
                  onChange={(e) => setCompanyData({ ...companyData, website: e.target.value })}
                />
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit">
                Next: Personal Information
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>
          Step 2 of 2: Create your admin account for {companyData.name}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleUserSubmit} className="space-y-4">
          {error && (
            <div className="p-4 text-sm text-red-600 bg-red-50 rounded-md">
              {error}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                First Name *
              </label>
              <Input
                id="firstName"
                type="text"
                required
                placeholder="John"
                value={userData.firstName}
                onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
              />
            </div>
            
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                Last Name *
              </label>
              <Input
                id="lastName"
                type="text"
                required
                placeholder="Doe"
                value={userData.lastName}
                onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
              />
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email Address *
              </label>
              <Input
                id="email"
                type="email"
                required
                placeholder="john.doe@example.com"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              />
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password *
              </label>
              <Input
                id="password"
                type="password"
                required
                placeholder="Choose a strong password"
                value={userData.password}
                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
              />
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="phoneNumber" className="block text-sm font-medium mb-1">
                Phone Number (Optional)
              </label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="+1234567890 (E.164 format)"
                value={userData.phoneNumber}
                onChange={(e) => setUserData({ ...userData, phoneNumber: e.target.value })}
              />
              <p className="text-xs text-gray-500 mt-1">
                Format: +[country code][number] (e.g., +1234567890)
              </p>
            </div>
          </div>
          
          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={handleBack}>
              Back
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating Account...' : 'Complete Registration'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 