import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ConceptTopic } from "@/types";

interface TopicsData {
  selectedTopic: string,
  topicList: ConceptTopic [],
}

const initialState = {
  selectedTopic: '',
  topicList: [],
} as TopicsData;



export const topics = createSlice({
  name: 'languages',
  initialState,
  reducers: {
    setTopicSelection: (state, action: PayloadAction<string>) => {
      state.selectedTopic = action.payload;
      // state.languages = action.payload;
      // state.languageCheck = action.payload.reduce((object, item:ActiveLanguages) => Object.assign(object, { [item.name]: item.checked }), {});
      // console.log(state.languageCheck);
    },
    setTopicList: (state, action: PayloadAction<ConceptTopic []>) => {
      // console.log(action);
      state.topicList = action.payload;
    }
  }
})


export const { setTopicSelection, setTopicList } = topics.actions;
export default topics.reducer;