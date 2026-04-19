import { useSelector } from 'react-redux';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { selectUserState } from '../../slices/userSlice';
import { Preloader } from '@ui';

export const ProtectedRoute = () => {
  const { user, isAuthChecked, isLoading } = useSelector(selectUserState);
  const location = useLocation();

  if (!isAuthChecked || isLoading) {
    return <Preloader />;
  }

  if (!user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  return <Outlet />;
};
