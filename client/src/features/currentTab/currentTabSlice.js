import { createSlice } from "@reduxjs/toolkit";

const currentTabSlice = createSlice({
    name: "currentTab",
    initialState: {
        currentTab: "home",
        options: null
    },
    reducers: {
        setCurrentTab: (state, action) => {
            state.currentTab = action.payload.currentTab;
            state.options = action.payload.options;
        }
    }
});

export const { setCurrentTab } = currentTabSlice.actions;
export default currentTabSlice.reducer;