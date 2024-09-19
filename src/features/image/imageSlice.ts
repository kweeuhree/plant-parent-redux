import type { PayloadAction } from "@reduxjs/toolkit"
import type { AppThunk, RootState } from "../../app/store"
import { createAppSlice } from "../../app/createAppSlice"

export type Image = {
    imageUrl: string,
    imageId: string,
  }

const initialState = {
    loading: false,
    images: [],
    error: ''

}

export const imageSlice = createAppSlice({
    name: "images",
    initialState,
    reducers: {
      uploadRequest: (state) => {
        state.loading = true;
      },
      uploadImage: (state, action: PayloadAction<Image>) => {
        state.images.push(action.payload);
        state.loading = false;
      },
      uploadFailure: (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      },
      deleteImage: (state, action: PayloadAction<string>) => {
        state.images = state.images.filter((image) => image.imageId !== action.payload);
      },
      updateImage: (state, action: PayloadAction<Image>) => {
        state.images = state.images.map((image) => {
          if (image.imageId === action.payload.imageId) {
            return { ...image, imageUrl: action.payload.imageUrl };
          }
          return image;
        });
      },
    //   this function will be responsible for creating a new timeline in the backend
      updateTimelineImage: (state, action: PayloadAction<{ imageId: string; image: string }>) => {
        state.images = state.images.map((image) => {
          if (image.imageId === action.payload.imageId) {
            return { ...image, image: action.payload.image };
          }
          return image;
        });
      },
    },
       selectors: {
            selectImages: state => state.images,
    }
  });

export const { updateTimelineImage, updateImage, uploadRequest, uploadFailure, deleteImage, uploadImage } = imageSlice.actions;

export const { selectImages } = imageSlice.selectors


export default imageSlice.reducer;