/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axiosInstance from '@/util/axiosInstance';


<<<<<<< HEAD
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  return <div>{children}</div>;
};

export default ProtectedRoute;
=======
const Protected = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const response = await axiosInstance.post('/auth/verify', {
          token: token,
        });
        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error(error);
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []);

  if(isAuthenticated === null) {
    return (
      <>
      <p>Loading...</p>
      </>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default Protected;
>>>>>>> 7c0dfb70bc445b745494f7d0bed5e5559c7a9f5d
