import React from 'react';
import {useSelector} from "react-redux";
import {selectCards, selectLoading} from "../../reducer/searchSlice";
import {CardItem} from "../cardItem/CardItem";
import pokeballLogo from './../../assets/pokeball.svg';

import './card-list.scss';

export function CardList() {
    const cards = useSelector(selectCards);
    const loading = useSelector(selectLoading);

    return (
        <div className={'cards-list'}>
            {!loading && cards?.map((card, index) => {
                return (
                    <CardItem key={index} card={card}/>
                )
            })}
            {loading &&
            <div className={'loader-layer'}>
                <img className={'fa fa-spin'} src={pokeballLogo} alt={'pokeball-loader'}/>
            </div>
            }
        </div>
    )
}