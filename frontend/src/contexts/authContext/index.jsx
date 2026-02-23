import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { db } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isEmailUser, setIsEmailUser] = useState(false);
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [displayNames, setDisplayNames] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser({ ...user });

        const isEmail = user.providerData.some(
          (provider) => provider.providerId === "password"
        );
        setIsEmailUser(isEmail);

        const isGoogle = user.providerData.some(
          (provider) => provider.providerId === "google.com"
        );
        setIsGoogleUser(isGoogle);

        setUserLoggedIn(true);
      } else {
        setCurrentUser(null);
        setUserLoggedIn(false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const fetchDisplayName = async (uid) => {
    if (displayNames[uid]) {
      return displayNames[uid];
    }
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      const displayName = userDoc.data().displayName;
      setDisplayNames((prev) => ({ ...prev, [uid]: displayName }));
      return displayName;
    }
    return null;
  };

  const value = {
    userLoggedIn,
    isEmailUser,
    isGoogleUser,
    currentUser,
    setCurrentUser,
    loading,
    setLoading,
    fetchDisplayName,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
