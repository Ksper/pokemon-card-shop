import {createSlice} from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
        cartTotalPrice: 0,
        cartTotalQuantity: 0,
        isCartSummaryOpen: false
    },
    reducers: {
        addItemToCart: (state, action) => {
            if (state.cartItems.find(cartItem => cartItem.id === action.payload.item.id)) {
                state.cartItems = state.cartItems.map(item => {
                    if (item.id === action.payload.item.id) {
                        item.quantity += action.payload.toAdd;
                    }
                    return item;
                })
            } else {
                state.cartItems.push({...action.payload.item, quantity: action.payload.item.quantity + action.payload.toAdd});
            }

            state.cartTotalPrice += action.payload.item.price * action.payload.toAdd;
            state.cartTotalQuantity += action.payload.toAdd;
        },
        removeItemFromCart: (state, action) => {
            let cartItem = state.cartItems.find(item => item.id === action.payload.item.id);
            if((cartItem.quantity - action.payload.toRemove) === 0) {
                state.cartItems = state.cartItems.filter(item => item.id !== action.payload.item.id);
            } else {
                state.cartItems = state.cartItems.map(item => {
                    if (item.id === action.payload.item.id) {
                        item.quantity -= action.payload.toRemove;
                    }
                    return item;
                })
            }
            state.cartTotalPrice -= action.payload.item.price * action.payload.toRemove;
            state.cartTotalQuantity -= action.payload.toRemove;
        },
        toggleIsCartSummaryOpen: state => {
            state.isCartSummaryOpen = !state.isCartSummaryOpen;
        },
        openCartSummary: state => {
            state.isCartSummaryOpen = true;
        },
        closeCartSummary: state => {
            state.isCartSummaryOpen = false;
        },
    }
});

export const {
    addItemToCart,
    removeItemFromCart,
    toggleIsCartSummaryOpen,
    openCartSummary,
    closeCartSummary
} = cartSlice.actions;

export const selectCartTotalPrice = state => state.cart.cartTotalPrice;

export const selectCartTotalQuantity = state => state.cart.cartTotalQuantity;

export const selectCartItems = state => state.cart.cartItems;

export const selectIsCartSummaryOpen = state => state.cart.isCartSummaryOpen;

export default cartSlice.reducer;