import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/auth/userSlice'
import propertyReducer from './features/list/propertiesSlice'

export const store = configureStore({
    reducer: {
      user : userReducer,
      prop : propertyReducer
    },
  })