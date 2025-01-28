import { ReactNode } from 'react';

interface UnProtectedRouteProps {
  children: ReactNode;
}

const UnProtectedRoute = ({ children }: UnProtectedRouteProps) => {
  return <div>{children}</div>;
};

export default UnProtectedRoute;
