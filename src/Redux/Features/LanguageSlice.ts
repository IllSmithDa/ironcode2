import { ActiveLanguages, Language } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface LanguageState {
  languages: Language[]
  languageCheck: {
   [languageName: string]: boolean 
  },
  selectedLanguage: Language,
}

const initialState = {
  languages : [],
  languageCheck: {},
  selectedLanguage: {
    id: '',
    name: '',
    description: '',
    created_at: '',
  },
} as LanguageState;



export const languages = createSlice({
  name: 'languages',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.selectedLanguage = action.payload;
      // state.languageCheck = action.payload.reduce((object, item:ActiveLanguages) => Object.assign(object, { [item.name]: item.checked }), {});
      // console.log(state.languageCheck);
    }// 
  }
})


export const { setLanguage } = languages.actions;
export default languages.reducer;