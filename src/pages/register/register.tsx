import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { registerUser, selectUserState } from '../../slices/userSlice';
import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isAuthenticated } = useSelector(selectUserState);
  const location = useLocation();
  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!email || !password || !userName) {
      return;
    }

    dispatch(registerUser({ email, password, name: userName }));
  };

  if (isAuthenticated) {
    return <Navigate to={'/'} />;
  }

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
