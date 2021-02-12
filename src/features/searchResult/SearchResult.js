import React from 'react';
import './search-result.scss';
import {useDispatch, useSelector} from "react-redux";
import {
    setResultPerPage,
    selectSearchedValue,
    selectCurrentPage,
    selectTotalResults,
    selectCount,
    fetchCards,
    selectResultsPerPage,
    selectLoading,
    selectSelectedFilters,
    setNameOrder,
    selectNameOrder, setCurrentPage
} from "../../reducer/searchSlice";

const resultPerPageOptions = [8, 30, 50, 100];

export function SearchResultData() {

    const totalCount = useSelector(selectTotalResults);
    const currentPage = useSelector(selectCurrentPage);
    const currentSearch = useSelector(selectSearchedValue);
    const currentResultPerPage = useSelector(selectResultsPerPage);
    const count = useSelector(selectCount);
    const loading = useSelector(selectLoading);
    const selectedFilter = useSelector(selectSelectedFilters);
    const currentNameOrder = useSelector(selectNameOrder);

    const dispatch = useDispatch();

    const handlePerPageChange = (event) => {
        dispatch(setResultPerPage(event.target.value));
        dispatch(fetchCards());
    }

    const handleNameOrderingChange = (orderSign) => {
        dispatch(setNameOrder(orderSign))
        dispatch(fetchCards());
    }

    const renderFiltersElt = () => {
        let filtersRenderedElts = [];
        let i = 0;
        for (const filter in selectedFilter) {
            if (filter !== 'name') {
                filtersRenderedElts.push(
                    (<span key={i} className={'filters-item'}>
                        <span>{selectedFilter[filter]}</span>
                    </span>)
                )
            }
            i++;
        }
        return filtersRenderedElts;
    };

    const handlePageChange = (sign) => {
        let targetPage;
        if (sign === '+') {
            targetPage = currentPage + 1;
        } else {
            targetPage = currentPage - 1;
        }
        if (targetPage > 0) {
            dispatch(setCurrentPage(targetPage));
            dispatch(fetchCards());
        }
    }

    return (
        <React.Fragment>
            <div className={'search-result-data'}>
                {!loading &&
                <React.Fragment>
                    <div className={'result-per-page'}>
                        <span> Results Per Page: </span>
                        <select defaultValue={currentResultPerPage} onChange={(e) => handlePerPageChange(e)} name=""
                                id="">
                            {resultPerPageOptions.map((option, index) => {
                                return (<option key={index} value={option}>{option}</option>)
                            })}
                        </select>
                        {currentNameOrder === '-' &&
                        <i onClick={e => handleNameOrderingChange('')} className="fas fa-sort-alpha-up"/>}
                        {currentNameOrder === '' &&
                        <i onClick={e => handleNameOrderingChange('-')} className="fas fa-sort-alpha-down"/>}
                    </div>
                    <span>
                        <span className={'result-count'}>{currentResultPerPage*(currentPage-1) + count} of <span className={'total-count'}>{totalCount}</span> {currentSearch && <span>results for <span className={'current-search'}>"{currentSearch}"</span></span>}</span>
                        <span className="result-count-mobile">{totalCount} results</span>
                        <span className={'page-changer'}>
                            <i onClick={() => handlePageChange('-')} className="fas fa-arrow-circle-left"/>
                            <span>{currentPage} / {Math.ceil(totalCount / currentResultPerPage)}</span>
                            <i onClick={() => handlePageChange('+')} className="fas fa-arrow-circle-right"/>
                        </span>
                    </span>
                    <div className={'selected-filters'}>
                        {selectedFilter !== {} && renderFiltersElt()}
                    </div>
                </React.Fragment>
                }
            </div>
        </React.Fragment>
    )
}