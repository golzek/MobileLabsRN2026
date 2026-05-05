// context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth';
import { doc, setDoc, getDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Реєстрація нового користувача
  const register = async (email, password) => {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    // Створюємо порожній документ профілю у Firestore
    await setDoc(doc(db, 'users', credential.user.uid), {
      email: credential.user.uid,
      name: '',
      age: '',
      city: '',
      createdAt: serverTimestamp(),
    });
    return credential;
  };

  // Вхід існуючого користувача
  const login = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Вихід із системи
  const logout = async () => {
    return signOut(auth);
  };

  // Відновлення паролю через email
  const resetPassword = async (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // Отримання профілю з Firestore (тільки власний документ через uid)
  const getUserProfile = async () => {
    if (!auth.currentUser) throw new Error('Користувач не авторизований');
    const ref = doc(db, 'users', auth.currentUser.uid);
    const snap = await getDoc(ref);
    return snap.exists() ? snap.data() : null;
  };

  // Збереження/оновлення профілю — тільки документ з id = uid
  const saveUserProfile = async (profileData) => {
    if (!auth.currentUser) throw new Error('Користувач не авторизований');
    const ref = doc(db, 'users', auth.currentUser.uid);
    await setDoc(ref, { ...profileData, updatedAt: serverTimestamp() }, { merge: true });
  };

  // Повторна автентифікація перед видаленням
  const reauthenticate = async (password) => {
    if (!auth.currentUser) throw new Error('Користувач не авторизований');
    const credential = EmailAuthProvider.credential(auth.currentUser.email, password);
    return reauthenticateWithCredential(auth.currentUser, credential);
  };

  // Видалення облікового запису + документа у Firestore
  const deleteAccount = async (password) => {
    if (!auth.currentUser) throw new Error('Користувач не авторизований');
    // Спочатку повторна автентифікація
    await reauthenticate(password);
    // Видаляємо документ Firestore
    await deleteDoc(doc(db, 'users', auth.currentUser.uid));
    // Видаляємо обліковий запис Firebase Auth
    await deleteUser(auth.currentUser);
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    resetPassword,
    getUserProfile,
    saveUserProfile,
    deleteAccount,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
