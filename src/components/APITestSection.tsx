'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface APIResponse {
  message: string;
  timestamp: string;
  method: string;
  receivedData?: unknown;
}

export function APITestSection() {
  const [response, setResponse] = useState<APIResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testAPI = async (method: 'GET' | 'POST') => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (method === 'POST') {
        options.body = JSON.stringify({
          testData: 'This is test data from the frontend',
          timestamp: new Date().toISOString(),
        });
      }

      const res = await fetch('/api/hello', options);
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-foreground mb-8">
        API Testing
      </h2>
      <Card>
        <CardHeader>
          <CardTitle>Test API Endpoints</CardTitle>
          <CardDescription>
            Test the fullstack functionality by calling our API routes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Button 
              onClick={() => testAPI('GET')} 
              disabled={loading}
              variant="default"
            >
              {loading ? 'Loading...' : 'Test GET Request'}
            </Button>
            <Button 
              onClick={() => testAPI('POST')} 
              disabled={loading}
              variant="secondary"
            >
              {loading ? 'Loading...' : 'Test POST Request'}
            </Button>
          </div>

          {error && (
            <div className="p-4 rounded-lg border-l-4 bg-red-50 border-red-500">
              <div className="text-lg font-semibold text-red-800">Error</div>
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {response && (
            <div className="p-4 rounded-lg border-l-4 bg-green-50 border-green-500">
              <div className="text-lg font-semibold text-green-800 mb-2">API Response</div>
              <pre className="text-sm text-green-700 bg-green-100 p-3 rounded font-mono overflow-x-auto">
                {JSON.stringify(response, null, 2)}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
} 