import type { PayloadAction } from "@reduxjs/toolkit"
import type { AppThunk, RootState } from "../../app/store"
import { createAppSlice } from "../../app/createAppSlice"

export type Plant = {
    plantId: number | null,
    parentOf: number | number[] | null,
    childOf: number | null,
    name: string,
    image: string,
    dateCreated: Date | null,
    lastRepotted: Date | null,
    soilMixRecipe: string,
    familyTreeId: number | null,
    timelineId: number | null,
}

export type PlantArray = {
    plants: Plant[],
}

export const initialState: PlantArray = {
    plants: [],
}

export const plantSlice = createAppSlice({
    name: "plants",
    initialState,
    reducers: {
      addNewPlant: (state, action: PayloadAction<Plant>) => {
        state.plants.push(action.payload);
      },
      deletePlant: (state, action: PayloadAction<number>) => {
        state.plants = state.plants.filter((plant) => plant.plantId !== action.payload);
      },
      updatePlant: (state, action: PayloadAction<{ id: number; title: string }>) => {
        state.plants = state.plants.map((plant) => {
          if (plant.plantId === action.payload.id) {
            return { ...plant, title: action.payload.title };
          }
          return plant;
        });
      },
    //   this function will be responsible for creating a new timeline in the backend
      updatePlantImage: (state, action: PayloadAction<{ plantId: number; newImage: string }>) => {
        state.plants = state.plants.map((plant) => {
          if (plant.plantId === action.payload.plantId) {
            return { ...plant, image: action.payload.newImage };
          }
          return plant;
        });
      },
      repotPlant: (state, action: PayloadAction<{plantId: number, newRepottingDate: Date}>) => {
        state.plants = state.plants.map((plant) => {
            if (plant.plantId === action.payload.plantId) {
              return { ...plant, lastRepotted: action.payload.newRepottingDate };
            }
            return plant;
          });
      },
      makeAPup: (state, action: PayloadAction<{parentId: number, childId: number}>) => {
        state.plants = state.plants.map((plant) => {
            if (plant.plantId === action.payload.parentId) {
              return { ...plant, parentOf: action.payload.childId };
            }
            return plant;
          });
      },
      soilMixRecipe: (state, action: PayloadAction<{plantId: number, newSoilMixRecipe: string}>) => {
        state.plants = state.plants.map((plant) => {
            if (plant.plantId === action.payload.plantId) {
              return { ...plant, soilMixRecipe: action.payload.newSoilMixRecipe };
            }
            return plant;
          });
      },
    },
       selectors: {
            selectPlantsExist: state => state.plants.length > 0,
    }
  });

export const { addNewPlant, updatePlant, updatePlantImage, deletePlant, 
               repotPlant, makeAPup, soilMixRecipe } = plantSlice.actions;

export const { selectPlantsExist } = plantSlice.selectors


export default plantSlice.reducer;