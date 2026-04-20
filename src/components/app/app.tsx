import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import {
  fetchIngredients,
  getIngredientsSelector
} from '../../slices/ingredientsSlice';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Preloader } from '@ui';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { ProtectedRoute } from '../protected-route';
import { getUser } from '../../slices/userSlice';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background;

  const { isIngredientsLoading, ingredients, error } = useSelector(
    getIngredientsSelector
  );

  useEffect(() => {
    dispatch(getUser());
    dispatch(fetchIngredients());
  }, [dispatch]);

  const closeModal = () => navigate(-1);

  return (
    <div className={styles.app}>
      <AppHeader />
      {isIngredientsLoading ? (
        <Preloader />
      ) : error ? (
        <div className={`${styles.error} text text_type_main-medium pt-4`}>
          {error}
        </div>
      ) : ingredients.length > 0 ? (
        <>
          <Routes location={background || location}>
            <Route path='/' element={<ConstructorPage />} />
            <Route path='/feed' element={<Feed />} />
            <Route element={<ProtectedRoute onlyUnAuth />}>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route path='/reset-password' element={<ResetPassword />} />
            </Route>
            <Route path='/profile' element={<ProtectedRoute />}>
              <Route index element={<Profile />} />
              <Route path='orders' element={<ProfileOrders />} />
              <Route path='orders/:number' element={<OrderInfo />} />
            </Route>
            <Route path='*' element={<NotFound404 />} />
            <Route path='/ingredients/:id' element={<IngredientDetails />} />
            <Route path='/feed/:number' element={<OrderInfo />} />
          </Routes>

          {background && (
            <Routes>
              <Route
                path='/feed/:number'
                element={
                  <Modal title='Заказ' onClose={closeModal}>
                    <OrderInfo />
                  </Modal>
                }
              />
              <Route
                path='/ingredients/:id'
                element={
                  <Modal title='Детали ингредиента' onClose={closeModal}>
                    <IngredientDetails />
                  </Modal>
                }
              />
              <Route
                path='/profile/orders/:number'
                element={
                  <Modal title='Заказ' onClose={closeModal}>
                    <OrderInfo />
                  </Modal>
                }
              />
            </Routes>
          )}
        </>
      ) : (
        <div className={`${styles.title} text text_type_main-medium pt-4`}>
          Нет игредиентов
        </div>
      )}
    </div>
  );
};

export default App;
