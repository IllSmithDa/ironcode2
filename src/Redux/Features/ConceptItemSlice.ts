import { ActiveLanguages, ConceptItem, ConceptTopic, Language } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ConceptState {
  concepts: ConceptTopic []
}

const initialState = {
  concepts:[]
} as ConceptState;



export const concepts = createSlice({
  name: 'languages',
  initialState,
  reducers: {
    setConcepts: (state, action: PayloadAction<ConceptTopic []>) => {
      state.concepts = action.payload;
      // state.languageCheck = action.payload.reduce((object, item:ActiveLanguages) => Object.assign(object, { [item.name]: item.checked }), {});
      // console.log(state.languageCheck);
    }// 
  }
})


export const { setConcepts } = concepts.actions;
export default concepts.reducer;