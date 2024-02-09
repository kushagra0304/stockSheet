import { configureStore } from '@reduxjs/toolkit'
import selectedReelGroupsReducer from './reducers/selectedReelGroupsReducer';

const store = configureStore({
  reducer: {
    selectedReelGroups: selectedReelGroupsReducer
  }
})

export default store;