import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const baseUrl = 'https://api.pokemontcg.io/v2';
const apiKey = 'd660f741-8e02-4aca-96b4-1ce77f756afb';


export const fetchFiltersChoices = createAsyncThunk(
    'filters/fetchFilters',
    async () => {
        const filterTypes = ['types', 'subtypes', 'supertypes', 'rarities'];
        return await Promise.all(filterTypes.map(async filterType => {
            let choices = await fetchFilterChoicesByType(filterType);
            return {
                type: filterType,
                choices: choices.data
            }
        }));
    }
)

export const fetchFilterChoicesByType = async (filterType) => {
    let response = await fetch(`${baseUrl}/${filterType}`, {
        method: 'GET',
        headers: {
            'X-Api-Key': apiKey,
        }
    });
    return await response.json();
}

export const FilterSlice = createSlice({
    name: 'filters',
    initialState: {
        filters: [],
        errors: null
    },
    extraReducers: {
        [fetchFiltersChoices.pending]: state => {
            state.cards = [];
            state.loading = true;
        },
        [fetchFiltersChoices.fulfilled]: (state, action) => {
            state.filters = action.payload
            state.loading = false;
        },
        [fetchFiltersChoices.rejected]: (state, action) => {
            state.errors = action.payload;
            state.loading = false;
        }
    }
});

export const selectFilters = state => state.filters.filters;

export default FilterSlice.reducer;