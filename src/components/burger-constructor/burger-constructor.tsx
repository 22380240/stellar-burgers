import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import * as burgerConstructor from '../../services/slices/burger-constructor';
import * as order from '../../services/slices/order';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector((state) => state.burgerConstructor);
  const orderRequest = useSelector((state) => state.order.isOrderLoading);
  const orderModalData = useSelector((state) => state.order.order);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuth);

  const onOrderClick = async () => {
    if (!isAuth) {
      navigate('/login');
      return;
    }

    if (!constructorItems.bun || orderRequest) {
      return;
    }

    await dispatch(
      order.orderBurger([
        constructorItems.bun._id,
        ...constructorItems.ingredients.map(({ _id }) => _id),
        constructorItems.bun._id
      ])
    );
    dispatch(burgerConstructor.burgerConstructorSlice.actions.clear());
  };

  const closeOrderModal = () => {
    dispatch(order.orderSlice.actions.clearOrder());
    dispatch(burgerConstructor.burgerConstructorSlice.actions.clear());
    navigate('/', { replace: true });
  };

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
