import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { burgerConstructorSlice } from '../../services/slices/burger-constructor';
import { useDispatch } from '../../services/store';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () =>
      dispatch(burgerConstructorSlice.actions.downIngredient(index));

    const handleMoveUp = () =>
      dispatch(burgerConstructorSlice.actions.upIngredient(index));

    const handleClose = () =>
      dispatch(burgerConstructorSlice.actions.removeIngredient(ingredient));

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
