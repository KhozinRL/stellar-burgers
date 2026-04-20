import { useSelector } from 'react-redux';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { selectUserState } from '../../slices/userSlice';
import { Preloader } from '@ui';

export const ProtectedRoute = ({ onlyUnAuth = false }) => {
  const { user, isAuthChecked, isLoading } = useSelector(selectUserState);
  const location = useLocation();

  console.log('Only unauth is ', onlyUnAuth);

  if (!isAuthChecked || isLoading) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    return <Navigate replace to={location.state?.from ?? '/'} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  return <Outlet />;
};
