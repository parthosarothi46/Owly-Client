import { createContext, useContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/firebase/firebase.config";
import LoadingSpinner from "@/components/LoadingSpinner";
import axios from "axios";

// Create the AuthContext
const AuthContext = createContext();

// Custom hook for accessing AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Login with email and password
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Sign in with Google
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  // Logout
  const logout = () => {
    return signOut(auth);
  };

  // Register a new user with email and password
  const register = (email, password, displayName, photoURL) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        // Update user profile with additional data
        return updateProfile(userCredential.user, {
          displayName,
          photoURL,
        }).then(() => {
          setUser({
            ...userCredential.user,
            displayName,
            photoURL,
          });
        });
      }
    );
  };

  // Monitor auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser?.email) {
        const user = {
          email: currentUser.email,
        };
        axios
          .post("http://localhost:5000/jwt", user, {
            withCredentials: true,
          })
          .then((res) => setLoading(false));
      } else {
        axios
          .post(
            "http://localhost:5000/logout",
            {},
            {
              withCredentials: true,
            }
          )
          .then((res) => setLoading(false));
      }
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, signInWithGoogle, logout, register }}
    >
      {loading ? <LoadingSpinner /> : children}
    </AuthContext.Provider>
  );
};
