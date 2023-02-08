import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/slices/uiSlice'
import classes from './CartButton.module.css';

const CartButton = (props) => {
  const dispatch = useDispatch();
  const quantity = useSelector(state => state.cart.totalQuantity)

  const handleCartToggle = () => {
    dispatch(uiActions.toggle());
  };

  return (
    <button className={classes.button} onClick={handleCartToggle}>
      <span>My Cart</span>
      <span className={classes.badge}>{quantity}</span>
    </button>
  );
};

export default CartButton;
