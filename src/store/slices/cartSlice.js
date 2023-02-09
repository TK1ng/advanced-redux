import { createSlice } from '@reduxjs/toolkit';
import { uiActions } from './uiSlice';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
        totalAmount: 0
    },
    reducers: {
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);

            if (!existingItem) {
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.title
                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
            }

            state.totalQuantity++

        },
        removeItemFromCart(state, action) {
            state.totalQuantity--;

            const { id } = action.payload;
            const existingItem = state.items.find(item => item.id === id);

            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }
        },
    }
});

// // action creator 'THUNK'
// const sendCartData = (cart) => {
//     return async (dispatch) => {
//         dispatch(uiActions.showNotification({
//             status: 'pending',
//             title: 'Sending..',
//             message: 'Sending cart data...'
//           }));
//     };

//     const response = await fetch('https://redux-cart-5d39e-default-rtdb.firebaseio.com/cart.json', {
//         method: 'PUT',
//         body: JSON.stringify(cart)
//       })

//       if (!response.ok) {
//         throw new Error('Sending cart data failed');
//       }

//       dispatch(uiActions.showNotification({
//         status: 'success',
//         title: 'Sent',
//         message: 'Sent cart data successfully!'
//       }))
//     }
// }

export const cartActions = cartSlice.actions;

export default cartSlice;