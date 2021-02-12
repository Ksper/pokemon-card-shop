import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const baseUrl = 'https://api.pokemontcg.io/v2';
const apiKey = 'd660f741-8e02-4aca-96b4-1ce77f756afb';

const getSearchParams = (params, resultsPerPage, nameOrder, page) => {
    let searchParams = new URLSearchParams();
    for (const param in params) {
        searchParams.set(param, params[param]);
    }
    return `q=${searchParams.toString()
        .replaceAll('=', ':')
        .replaceAll('+', '.')
        .replaceAll('&', ' ')
        .replace('rarities', 'rarity')
        .replace('supertypes', 'supertype')}&pageSize=${resultsPerPage}&orderBy=${nameOrder}name&page=${page}`;
}

const processCardsPrice = cards => cards.map(card => {
    let price = (card.hp / 10) * 2;
    if (isNaN(price)) {
        price = 10;
    }
    return {
        ...card,
        price: price,
        quantity: 0,
    }
});

export const fetchCards = createAsyncThunk(
    'search/FETCH_CARDS',
    async (arg, thunkAPI) => {
        let state = thunkAPI.getState();
        let params = getSearchParams(
            selectSelectedFilters(state),
            selectResultsPerPage(state),
            selectNameOrder(state),
            selectCurrentPage(state)
        );
        let response = await fetch(`${baseUrl}/cards?${params}`, {
            method: 'GET',
            headers: {
                'X-Api-Key': apiKey,
            }
        });
        let cards = await response.json();
        return {
            ...cards,
            data: processCardsPrice(cards.data)
        };
    }
);

export const searchReducer = createSlice({
    name: 'search',
    initialState: {
        cards: [],
        totalCount: 0,
        count: 0,
        currentPage: 1,
        selectedFilters: {},
        loading: false,
        isFilterListOpen: false,
        resultsPerPage: 30,
        nameOrder: ''
    },
    reducers: {
        setFilter: (state, action) => {
            state.selectedFilters[action.payload.name] = action.payload.value;
        },
        removeFilter: (state, action) => {
            delete state.selectedFilters[action.payload];
        },
        toggleIsFilterListOpen: state => {
            state.isFilterListOpen = !state.isFilterListOpen;
        },
        openFilterList: state => {
            state.isFilterListOpen = true;
        },
        closeFilterList: state => {
            state.isFilterListOpen = false;
        },
        setResultPerPage: (state, action) => {
            state.resultsPerPage = action.payload;
        },
        setNameOrder: (state, action) => {
            state.nameOrder = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        }
    },
    extraReducers: {
        [fetchCards.pending]: state => {
            state.cards = [];
            state.loading = true;
        },
        [fetchCards.fulfilled]: (state, action) => {
            state.cards = action.payload.data;
            state.page = action.payload.page;
            state.totalCount = action.payload.totalCount;
            state.count = action.payload.count;
            state.loading = false;
        },
        [fetchCards.rejected]: (state, action) => {
            state.cards = action.payload;
            state.loading = false;
        }
    }
});

export const {
    setFilter,
    removeFilter,
    toggleIsFilterListOpen,
    closeFilterList,
    setResultPerPage,
    setNameOrder,
    setCurrentPage,
} = searchReducer.actions;

export const selectSearchedValue = state => state.search.selectedFilters['name'];

export const selectSelectedFilters = state => state.search.selectedFilters;

export const selectIsFilterListOpen = state => state.search.isFilterListOpen;

export const selectCards = state => state.search.cards;

export const selectTotalResults = state => state.search.totalCount;

export const selectCurrentPage = state => state.search.currentPage;

export const selectLoading = state => state.search.loading;

export const selectCount = state => state.search.count;

export const selectResultsPerPage = state => state.search.resultsPerPage;

export const selectNameOrder = state => state.search.nameOrder;

export default searchReducer.reducer;