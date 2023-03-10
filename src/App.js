import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { uiActions } from './store/slices/uiSlice'
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';

let isInitial = true;

function App() {
  const dispatch = useDispatch();

  const showCart = useSelector(state => state.ui.cartIsVisible);

  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(uiActions.showNotification({
        status: 'pending',
        title: 'Sending..',
        message: 'Sending cart data...'
      }));

      const response = await fetch('https://redux-cart-5d39e-default-rtdb.firebaseio.com/cart.json', {
        method: 'PUT',
        body: JSON.stringify(cart)
      })

      if (!response.ok) {
        throw new Error('Sending cart data failed');
      }

      dispatch(uiActions.showNotification({
        status: 'success',
        title: 'Sent',
        message: 'Sent cart data successfully!'
      }))
    }

    if (isInitial) {
      isInitial = false;
      return;
    }

    sendCartData().catch(err => {
      dispatch(
        uiActions.showNotification({
          status: 'Error',
          title: 'Failed',
          message: 'Sending cart data failed'
        })
      );
    });
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && <Notification
        status={notification.status}
        title={notification.title}
        message={notification.message}
      />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
