import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './search-input.scss';
import {
    closeFilterList,
    fetchCards,
    removeFilter,
    selectIsFilterListOpen, setCurrentPage,
    setFilter,
    toggleIsFilterListOpen
} from "../../reducer/searchSlice";

export function SearchInput() {

    const isFilterListOpen = useSelector(selectIsFilterListOpen);
    const dispatch = useDispatch();
    const [currentInputValue, setCurrentInputValue] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (currentInputValue === '') {
            dispatch(removeFilter('name'))
        } else {
            dispatch(setFilter({
                name: 'name',
                value: currentInputValue
            }));
        }
        dispatch(closeFilterList());
        dispatch(setCurrentPage(1))
        dispatch(fetchCards())
    }

    return (
        <div className={'search-input-container'}>
            <form onSubmit={e => handleSubmit(e)} >
                <input className={'search-input'} onChange={(event) => setCurrentInputValue(event.target.value)} type="text"
                       placeholder={'Type a card name ...'}/>
                <i onClick={e => handleSubmit(e)} className="send fas fa-paper-plane" />
            </form>
            <div onClick={() => dispatch(toggleIsFilterListOpen())} className="filter">
                <i className={`fas fa-filter ${isFilterListOpen ? 'opened' : ''}`} />
                <span>Filters</span>
            </div>
        </div>
    );
}