import React from 'react';
import './cart-summary.scss';
import {useDispatch, useSelector} from "react-redux";
import {
    addItemToCart, removeItemFromCart,
    selectCartItems, selectCartTotalPrice,
    selectIsCartSummaryOpen,
    toggleIsCartSummaryOpen
} from "../../reducer/cartSlice";

export function CartSummary() {

    const cartItems = useSelector(selectCartItems);
    const totalPrice = useSelector(selectCartTotalPrice);
    const isCartSummaryOpen = useSelector(selectIsCartSummaryOpen)
    const dispatch = useDispatch()

    return (
        <React.Fragment>
            <div className={`cart-summary ${isCartSummaryOpen ? 'open' : ''}`}>
                <div className="cart-total"><span>TOTAL : {totalPrice}€</span> <span><button onClick={() => {alert('TO BE IMPLEMENTED!')}}>Checkout Cart</button></span>
                </div>
                <ul>
                    {cartItems?.map((item, index) => (
                        <li key={index}>
                            <img src={item.images.small} alt="card"/>
                            <div className={'data-container'}>
                                <div className="data">
                                    <div className="title">{item.name} <span>- {item.rarity} </span>/ ( {item.price * item.quantity}€)
                                    </div>
                                    <div className="data-content">
                                        {item.types && <span>Type: <span>{item.types && item.types[0]}</span></span>}
                                        {item.subtypes && <span>Subtype: <span>{item.subtypes[0]}</span></span>}
                                        <span>Price(unit): <span>{item.price} €</span></span>
                                    </div>
                                </div>
                                <div className="tools-container">
                                    <div className="delete">
                                        <i onClick={e => dispatch(removeItemFromCart({
                                            item: item,
                                            toRemove: item.quantity
                                        }))} className="fas fa-trash-alt" />
                                    </div>
                                    <div className="quantity">
                                        <i onClick={() => dispatch(removeItemFromCart({item: item, toRemove: 1}))}
                                           className="fas fa-minus-circle"/>
                                        <div className="quantity-counter">{item.quantity}</div>
                                        <i onClick={() => dispatch(addItemToCart({item: item, toAdd: 1}))}
                                           className="fas fa-plus-circle"/>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div onClick={() => dispatch(toggleIsCartSummaryOpen())}
                 className={`cart-summary-layer ${isCartSummaryOpen ? 'open' : ''}`}/>
        </React.Fragment>
    )
}