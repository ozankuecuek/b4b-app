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

// Lazy initialization to avoid build-time issues
let app: ReturnType<typeof initializeFirebaseAdmin> | null = null;
let auth: ReturnType<typeof getAuth> | null = null;
let db: ReturnType<typeof getFirestore> | null = null;

function getApp() {
  if (!app) {
    app = initializeFirebaseAdmin();
  }
  return app;
}

// Lazy exports to prevent initialization during build
export const adminAuth = new Proxy({} as ReturnType<typeof getAuth>, {
  get(target, prop) {
    if (!auth) {
      auth = getAuth(getApp());
    }
    return auth[prop as keyof typeof auth];
  }
});

export const adminDb = new Proxy({} as ReturnType<typeof getFirestore>, {
  get(target, prop) {
    if (!db) {
      db = getFirestore(getApp());
    }
    return db[prop as keyof typeof db];
  }
});

export default getApp; 