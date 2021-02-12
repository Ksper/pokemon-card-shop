import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import './card-item.scss';
import {addItemToCart} from "../../reducer/cartSlice";

export function CardItem(props) {
    const dispatch = useDispatch();
    const [cardQuantity, setCardQuantity] = useState(1);

    const AddToCart = (card) => {
        dispatch(addItemToCart({item: card, toAdd: cardQuantity}));
        setCardQuantity(1);
    }

    const handleQuantityChange = (operator) => {
        if(operator === 'plus') {
            setCardQuantity(cardQuantity + 1);
        } else if(cardQuantity > 1) {
            setCardQuantity(cardQuantity - 1);
        }
    }

    return (
        <div className={'card-item'}>
            <div className="card-item-header">
                <span className={'card-item-name'}>{props.card.name}</span>
                <span className={'card-item-price'}>{props.card.price} €</span>
            </div>
            <img src={props.card.images.small} alt="card"/>
            <div className="card-item-bottom">
                <div className="quantity">
                    <i onClick={() => handleQuantityChange('minus')} className="fas fa-minus-circle" />
                    <div className="quantity-counter">{cardQuantity}</div>
                    <i onClick={() => handleQuantityChange('plus')} className="fas fa-plus-circle" />
                </div>
                <button onClick={() => AddToCart(props.card)}>Add</button>
            </div>
        </div>
    )
}