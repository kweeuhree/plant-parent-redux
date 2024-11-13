import type { PayloadAction } from "@reduxjs/toolkit";
// import type { AppThunk, RootState } from "../../app/store"
import { createAppSlice } from "../../app/createAppSlice";
import { initialState, type Plant } from "./plantTypes";
import type { Image } from "../image";

export const plantSlice = createAppSlice({
  name: "plants",
  initialState,
  reducers: {
    getPlantById: (state, action: PayloadAction<string>) => {
      const foundPlant = state.plants.find(
        plant => plant.plantId === action.payload,
      );
      state.selectedPlant = foundPlant;
    },
    unselectPlant: state => {
      state.selectedPlant = undefined;
    },
    addNewPlant: (state, action: PayloadAction<Plant>) => {
      state.plants.push(action.payload);
    },
    deletePlant: (state, action: PayloadAction<string>) => {
      state.plants = state.plants.filter(
        plant => plant.plantId !== action.payload,
      );
    },
    updatePlant: (
      state,
      action: PayloadAction<{ plantId: string; image: Image; name: string }>,
    ) => {
      console.log("Action payload: ", action.payload);
      state.plants = state.plants.map(plant => {
        if (plant.plantId === action.payload.plantId) {
          return {
            ...plant,
            name: action.payload.name,
            image: {
              ...plant.image,
              imageId: action.payload.image.imageId,
              imageUrl: action.payload.image.imageUrl,
            },
          };
        }
        return plant;
      });
    },
    //   this function will be responsible for creating a new timeline in the backend
    updatePlantImage: (
      state,
      action: PayloadAction<{ plantId: string; image: Image }>,
    ) => {
      state.plants = state.plants.map(plant => {
        if (plant.plantId === action.payload.plantId) {
          return { ...plant, image: action.payload.image };
        }
        return plant;
      });
    },
    repotPlant: (
      state,
      action: PayloadAction<{ plantId: string; newRepottingDate: string }>,
    ) => {
      state.plants = state.plants.map(plant => {
        if (plant.plantId === action.payload.plantId) {
          return { ...plant, lastRepotted: action.payload.newRepottingDate };
        }
        return plant;
      });
    },
    makeAPup: (
      state,
      action: PayloadAction<{ parentId: string; childId: number }>,
    ) => {
      state.plants = state.plants.map(plant => {
        if (plant.plantId === action.payload.parentId) {
          return { ...plant, parentOf: action.payload.childId };
        }
        return plant;
      });
    },
    soilMixRecipe: (
      state,
      action: PayloadAction<{ plantId: string; newSoilMixRecipe: string }>,
    ) => {
      state.plants = state.plants.map(plant => {
        if (plant.plantId === action.payload.plantId) {
          return { ...plant, soilMixRecipe: action.payload.newSoilMixRecipe };
        }
        return plant;
      });
    },
  },
  selectors: {
    selectPlantsExist: state => state.plants.length > 0,
    selectPlants: state => state.plants,
    selectSpecificPlant: state => state.selectedPlant,
  },
});

export const {
  getPlantById,
  addNewPlant,
  updatePlant,
  updatePlantImage,
  deletePlant,
  repotPlant,
  makeAPup,
  soilMixRecipe,
  unselectPlant,
} = plantSlice.actions;

export const { selectPlantsExist, selectPlants, selectSpecificPlant } =
  plantSlice.selectors;
