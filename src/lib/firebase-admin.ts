import { initializeApp, getApps, applicationDefault } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin SDK
// Firebase App Hosting provides default application credentials
function initializeFirebaseAdmin() {
  if (getApps().length === 0) {
    try {
      // Use application default credentials (works in Firebase App Hosting)
      return initializeApp({
        credential: applicationDefault(),
      });
    } catch (error) {
      console.warn('Firebase Admin SDK initialization failed:', error);
      // Fallback initialization for build-time compatibility
      return initializeApp();
    }
  } else {
    return getApps()[0];
  }
}

// Initialize the app
const app = initializeFirebaseAdmin();

// Direct exports - no lazy loading to avoid "Client not ready" errors
export const adminAuth = getAuth(app);
export const adminDb = getFirestore(app);
export default app; 