import type { PayloadAction } from "@reduxjs/toolkit";
import type { AppThunk } from "../../app/store";
import { createAppSlice } from "../../app/createAppSlice";
import { initialState, type Image } from "./";

export const imageSlice = createAppSlice({
  name: "images",
  initialState,
  reducers: {
    uploadRequest: state => {
      state.loading = true;
    },
    uploadSuccess: state => {
      state.loading = false;
    },
    uploadFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateImage: (state, action: PayloadAction<Image>) => {
      state.images = state.images.map(image => {
        if (image.imageId === action.payload.imageId) {
          return { ...image, imageUrl: action.payload.imageUrl };
        }
        return image;
      });
    },
    //   this function will be responsible for creating a new timeline in the backend
    updateTimelineImage: (
      state,
      action: PayloadAction<{ imageId: string; image: string }>,
    ) => {
      state.images = state.images.map(image => {
        if (image.imageId === action.payload.imageId) {
          return { ...image, image: action.payload.image };
        }
        return image;
      });
    },
  },
  selectors: {
    selectImages: state => state.images,
  },
});

export const {
  updateTimelineImage,
  updateImage,
  uploadRequest,
  uploadFailure,
  uploadSuccess,
} = imageSlice.actions;

export const { selectImages } = imageSlice.selectors;

// Define the asynchronous thunks

const cloudName = import.meta.env.VITE_CLOUD_NAME;
const preset = import.meta.env.VITE_PRESET;
const apiKey = import.meta.env.VITE_API_KEY;
const apiSecret = import.meta.env.VITE_API_SECRET;

export const uploadImage =
  (formData: FormData): AppThunk =>
  async dispatch => {
    dispatch(uploadRequest());

    try {
      formData.append("upload_preset", preset);

      // Make the async request to Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );
      const data = await response.json();
      console.log(`Secure url: ${data.secure_url}`);
      if (!response.ok) {
        throw new Error(data.error?.message || "Image upload failed");
      }
      dispatch(uploadSuccess());
      return { imageUrl: data.secure_url, imageId: data.public_id };
    } catch (error: any) {
      dispatch(uploadFailure(error.message || "Upload failed"));
    }
  };

export const deleteImage =
  (imageId: string): AppThunk =>
  async dispatch => {
    console.log(`Attempting to request deletion of image`);
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/resources/image/upload/${imageId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Basic ${btoa(`${apiKey}:${apiSecret}`)}`, // Base64-encode the key and secret
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error(`Failed to delete image. Status: ${response.status}`);
      }
      const result = await response.json();
      console.log(`Received this as a result: ${result}`);
    } catch (error) {
      throw new Error(
        (error instanceof Error && error?.message) || "Image upload failed",
      );
    }
  };
