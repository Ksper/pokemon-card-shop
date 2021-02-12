import React from 'react';
import './cart.scss';
import {selectCartTotalPrice, selectCartTotalQuantity, toggleIsCartSummaryOpen} from "../../reducer/cartSlice";
import {useDispatch, useSelector} from "react-redux";

export function Cart() {
    const totalPrice = useSelector(selectCartTotalPrice);
    const totalQuantity = useSelector(selectCartTotalQuantity);
    const dispatch = useDispatch();

    return (
        <div onClick={() => dispatch(toggleIsCartSummaryOpen())} className={'cart-container'}>
            <div className="cart">
                <i className="fas fa-shopping-cart" />
                <span>{totalPrice} € - {totalQuantity} Products</span>
            </div>
        </div>
    )
}