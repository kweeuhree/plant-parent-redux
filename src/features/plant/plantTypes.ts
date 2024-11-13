import type { Image } from "../image";

export type Plant = {
  plantId: string;
  name: string;
  dateCreated: string;
  image: Image;
  parentOf: number | number[] | null;
  childOf: number | null;
  lastRepotted: string | null;
  soilMixRecipe: string | null;
  familyTreeId: number | null;
  timelineId: number | null;
};

export type PlantArray = {
  plants: Plant[];
  selectedPlant?: Plant;
};

export const initialState: PlantArray = {
  plants: [],
};
