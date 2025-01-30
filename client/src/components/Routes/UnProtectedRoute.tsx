import { useState, useEffect, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import MedicalLoader from '@/components/Loader';
import axiosInstance from '@/util/axiosInstance';

interface UnprotectedProps {
  children: ReactNode;
}

const Unprotected: React.FC<UnprotectedProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        console.log("No token found, assuming unauthenticated user.");
        setIsAuthenticated(false);
        return;
      }

      try {
        console.log("Checking authentication...");

        const responses = await Promise.allSettled([
          axiosInstance.get('/organisation/verifyOrganisation', { headers: { Authorization: `Bearer ${token}` } }),
          axiosInstance.get('/admin/verifyAdmin', { headers: { Authorization: `Bearer ${token}` } }),
          axiosInstance.get('/donor/verifyDonor', { headers: { Authorization: `Bearer ${token}` } }),
          axiosInstance.get('/patient/verifyPatient', { headers: { Authorization: `Bearer ${token}` } })
        ]);

        const success = responses.some(res => res.status === "fulfilled" && res.value.status === 200);

        setIsAuthenticated(success);
      } catch (error) {
        console.error("Authentication error:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []);

  console.log("Auth State:", isAuthenticated);

  if (isAuthenticated === null) {
    return <MedicalLoader />;
  }

  return isAuthenticated ? <Navigate to="/dashboard" /> : <>{children}</>;
};

export default Unprotected;
