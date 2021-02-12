import React, {useEffect} from 'react';
import './App.scss';
import pokeballLogo from './assets/pokeball.svg'
import {SearchInput} from "./features/SearchInput/SearchInput";
import {CardList} from "./features/CardList/CardList";
import {FilterList} from "./features/FilterList/FilterList";
import {fetchFiltersChoices} from "./reducer/filterSlice";
import {useDispatch} from "react-redux";
import {SearchResultData} from "./features/searchResult/SearchResult";
import {Cart} from "./features/cart/Cart";
import {fetchCards} from "./reducer/searchSlice";
import {CartSummary} from "./features/cartSummary/CartSummary";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFiltersChoices());
        dispatch(fetchCards());
    });

    return (
        <div className="App">
            <header className="app-header">
                <div className="header-title">
                    <img src={pokeballLogo} alt={"pokeball"}/>
                    <span className={'title'}>POKEMON</span>
                    <span className={'subtitle'}>Card Shop</span>
                </div>
                <SearchInput />
                <Cart />
            </header>
            <CartSummary />
            <SearchResultData />
            <FilterList />
            <CardList />
        </div>
    );
}

export default App;
