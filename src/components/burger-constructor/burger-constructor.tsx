import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';

import {
  clearConstructor,
  selectConstructorItems,
  selectOrderIngredientIds
} from '../../slices/constructorSlice';
import { selectUserState } from '../../slices/userSlice';
import { useNavigate } from 'react-router-dom';
import {
  clearOrder,
  selectOrderState,
  sendOrder
} from '../../slices/orderSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(selectUserState);
  const constructorItems = useSelector(selectConstructorItems);
  const { isLoading: orderRequest, order: orderModalData } =
    useSelector(selectOrderState);
  const orderIngredients = useSelector(selectOrderIngredientIds);

  const onOrderClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!constructorItems.bun || orderRequest) return;
    dispatch(sendOrder(orderIngredients)).then((result) => {
      if (sendOrder.fulfilled.match(result)) {
        dispatch(clearConstructor());
      }
    });
  };
  const closeOrderModal = () => dispatch(clearOrder());

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
