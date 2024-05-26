import { createSlice } from '@reduxjs/toolkit'

const propertySlice = createSlice({
    name: 'properties',
    initialState: { properties : [] },
    reducers: {
        add: (state, action) => {
            state.properties = action.payload;
        } 
    }
})

export const { add } = propertySlice.actions
export default propertySlice.reducer