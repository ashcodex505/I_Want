import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Import Firebase Auth

type ProtectedRouteProps = {
  children: React.ReactNode; // Specify the type for children
};

const ProtectedRoute = ({ children  }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const navigate = useNavigate()
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true); // User is authenticated
      } else {
        setIsAuthenticated(false); // No user is authenticated
      }
    });

    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, []);

  if (isAuthenticated === null) {
    // Still checking authentication, optionally show a loading state
    navigate('/')
  }

  // Redirect if not authenticated, otherwise render children
  return isAuthenticated ? {children} : navigate('/') ;
};

export default ProtectedRoute;
