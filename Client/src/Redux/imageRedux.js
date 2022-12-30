import { createSlice } from "@reduxjs/toolkit";

export const ImageSlice = createSlice({
  name: "image",
  initialState: {
    images: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //ADD
    addImageStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addImageSuccess: (state, action) => {
      state.isFetching = false;
      state.images.push(action.payload);
    },
    addImageFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

     //GET ALL
     getImageStart: (state) => {
        state.isFetching = true;
        state.error = false;
      },
      getImageSuccess: (state, action) => {
        state.isFetching = false;
        state.images = action.payload;
      },
      getImageFailure: (state) => {
        state.isFetching = false;
        state.error = true;
      },
      //DELETE
      deleteImageStart: (state) => {
        state.isFetching = true;
        state.error = false;
      },
      deleteImageSuccess: (state, action) => {
        state.isFetching = false;
        state.images.splice(
          state.images.findIndex((item) => item._id === action.payload),
          1
        );
      },
      deleteImageFailure: (state) => {
        state.isFetching = false;
        state.error = true;
      },
  },
});

export const {
  addImageStart,
  addImageSuccess,
  addImageFailure,
  getImageStart,
  getImageSuccess,
  getImageFailure,
  deleteImageStart,
  deleteImageSuccess,
  deleteImageFailure,
} = ImageSlice.actions;

export default ImageSlice.reducer;