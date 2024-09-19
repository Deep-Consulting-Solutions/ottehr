import { useAuth0 } from '@auth0/auth0-react';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { IntakeFlowPageRoute } from '../../App';

export const ProtectedRoute: FC<{
  loadingFallback: JSX.Element;
  errorFallback: JSX.Element;
  unauthorizedFallback: JSX.Element;
}> = ({ loadingFallback, errorFallback, unauthorizedFallback }) => {
  const { isAuthenticated, isLoading, error } = useAuth0();
  if (error) {
    console.error(error);
    return errorFallback;
  }

  if (isLoading) {
    return loadingFallback;
  }

  if (!isAuthenticated) {
    if (location.pathname === IntakeFlowPageRoute.PatientPortal.path) {
      localStorage.setItem('fromHome', 'true');
    }
    return unauthorizedFallback;
  }

  return <Outlet />;
};
