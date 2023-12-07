import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ConceptTopic, User } from "@/types";

interface UserData {
  user: User
}

const initialState = {
  user: {}
} as UserData;



export const users = createSlice({
  name: 'languages',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      //console.log(action.payload);
      state.user = action.payload;
      // state.languages = action.payload;
      // state.languageCheck = action.payload.reduce((object, item:ActiveLanguages) => Object.assign(object, { [item.name]: item.checked }), {});
      // console.log(state.languageCheck);
    },
  }
})


export const { setUser } = users.actions;
export default users.reducer;