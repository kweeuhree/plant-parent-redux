import type { PayloadAction } from "@reduxjs/toolkit"
import type { AppThunk, RootState } from "../../app/store"
import { createAppSlice } from "../../app/createAppSlice"

export type Image = {
    imageUrl: string,
    imageId: string,
  }

type ImageState = {
  loading: boolean,
  images: Image[],
  error: string,
}

const initialState: ImageState = {
    loading: false,
    images: [],
    error: '',

}

export const imageSlice = createAppSlice({
    name: "images",
    initialState,
    reducers: {
      uploadRequest: (state) => {
        state.loading = true;
      },
      uploadSuccess: (state) => {
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

export const { updateTimelineImage, updateImage, uploadRequest, uploadFailure, uploadSuccess, deleteImage } = imageSlice.actions;

export const { selectImages } = imageSlice.selectors


export default imageSlice.reducer;

// Define the asynchronous thunk
export const uploadImage = (formData: FormData): AppThunk => async (dispatch) => {
  const cloudName = import.meta.env.VITE_CLOUD_NAME;
  const preset = import.meta.env.VITE_PRESET;

  dispatch(uploadRequest());
  
  try {

    formData.append('upload_preset', preset);

    // Make the async request to Cloudinary
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );
    const data = await response.json();
    console.log(data, 'received after uploading to cloudinary');
    if (!response.ok) {
      throw new Error(data.error?.message || 'Image upload failed');
    }
    dispatch(uploadSuccess());
    return {imageUrl: data.secure_url, imageId: data.asset_id};
   

  } catch (error: any) {
    dispatch(uploadFailure(error.message || 'Upload failed'));
  }
};