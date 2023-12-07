import { configureStore } from "@reduxjs/toolkit";
import languageReducer from '../Features/LanguageSlice';
import topicsReducer from '../Features/TopicsSlice';
import conceptsReducer from '../Features/ConceptItemSlice';
import userReducer from '../Features/UserSlice';
export const store = configureStore({
  reducer: {
    languageData: languageReducer,
    topicsData: topicsReducer,
    conceptsData: conceptsReducer, 
    userData: userReducer,
  }
});
