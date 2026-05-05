// config/firebase.js
import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDDhjynK5ldF3ByHMcwQSzwlLPsk7CuNlw",
  authDomain: "lab05-ccc2d.firebaseapp.com",
  projectId: "lab05-ccc2d",
  storageBucket: "lab05-ccc2d.firebasestorage.app",
  messagingSenderId: "187369239510",
  appId: "1:187369239510:web:f64c435da882b2a2efea77"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export default app; // ← only here, once