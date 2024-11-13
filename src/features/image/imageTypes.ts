export type Image = {
  imageUrl: string;
  imageId: string;
};

type ImageState = {
  loading: boolean;
  images: Image[];
  error: string;
};

export const initialState: ImageState = {
  loading: false,
  images: [],
  error: "",
};
