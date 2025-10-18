import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name: "company",
    initialState: {
        companies: [],
        company: null,
        searchCompanyByText: ""
    },

    reducers: {
        setCompanies: (state, action) => {
            state.companies = action.payload;
        },
        setSingleCompany: (state, action) => {
            state.singleCompany = action.payload;
        },
        setSearchCompanyByText: (state, action) => {
            state.searchCompanyByText = action.payload;
        }
    }
});

export const { setCompanies, setSingleCompany, setSearchCompanyByText } = companySlice.actions;
export default companySlice.reducer;