import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    comments:null,
    loading:false,
    error:false
}


export const commentsSlice = createSlice({
    name:'comments',
    initialState,
    reducers:{
    commentsLoading: (state) =>{
     state.loading = true;
    },
    commentsSuccess: (state,action) => {
        state.loading = false;
        state.comments = action.payload;
    },
    commentsFailure: (state) => {
        state.loading=false;
        state.error=true;
    },
    editComment:(state,action) => {
      state.comments = action.payload;
    }
    }
})


export const {commentsLoading,commentsSuccess,commentsFailure} = commentsSlice.actions;
export default commentsSlice.reducer;