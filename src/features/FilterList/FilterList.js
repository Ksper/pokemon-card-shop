import React from 'react';
import './filterList.scss';
import {
    fetchCards,
    removeFilter,
    selectIsFilterListOpen, selectSelectedFilters, setCurrentPage,
    setFilter, toggleIsFilterListOpen
} from "../../reducer/searchSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectFilters} from "../../reducer/filterSlice";

export function FilterList() {
    const opened = useSelector(selectIsFilterListOpen);
    const filters = useSelector(selectFilters);
    const selectedFilters = useSelector(selectSelectedFilters);
    const dispatch = useDispatch();

    const handleChange = (filterType, filterValue) => {
        if (filterValue === '') {
            dispatch(removeFilter(filterType))
        } else {
            dispatch(setFilter({
                name: filterType,
                value: filterValue
            }));
        }
        dispatch(setCurrentPage(1))
        dispatch(fetchCards());
    }

    return (
        <React.Fragment>
            <div className={`filter-list ${opened ? 'open' : ''}`}>
                {filters.map((filter, index) => {
                    return (
                        <div key={index}>
                            <label htmlFor={filter.type}>{filter.type}</label>
                            <select defaultValue={selectedFilters[filter.type] || ''} onChange={(e) => handleChange(filter.type, e.target.value)} name={filter.type} id="">
                                <option value={''}>Select a filter ...</option>
                                {filter.choices.map((choice, index) => {
                                    return (<option key={index} value={choice}>{choice}</option>)
                                })}
                            </select>
                        </div>
                    )
                })}
            </div>
            {opened &&
                <div onClick={() => dispatch(toggleIsFilterListOpen())} className="filter-layer" />
            }
        </React.Fragment>
    )
}