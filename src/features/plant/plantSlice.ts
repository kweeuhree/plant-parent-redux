import type { PayloadAction } from "@reduxjs/toolkit"
import type { AppThunk, RootState } from "../../app/store"
import { createAppSlice } from "../../app/createAppSlice"

export type Plant = {
    plantId: string,
    parentOf: number | number[] | null,
    childOf: number | null,
    name: string,
    dateCreated: string,
    lastRepotted: string | null,
    soilMixRecipe: string | null,
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
      deletePlant: (state, action: PayloadAction<string>) => {
        state.plants = state.plants.filter((plant) => plant.plantId !== action.payload);
      },
      updatePlant: (state, action: PayloadAction<{ plantId: string; name: string }>) => {
        state.plants = state.plants.map((plant) => {
          if (plant.plantId === action.payload.plantId) {
            return { ...plant, title: action.payload.name };
          }
          return plant;
        });
      },
    //   this function will be responsible for creating a new timeline in the backend
      updatePlantImage: (state, action: PayloadAction<{ plantId: string; image: string }>) => {
        state.plants = state.plants.map((plant) => {
          if (plant.plantId === action.payload.plantId) {
            return { ...plant, image: action.payload.image };
          }
          return plant;
        });
      },
      repotPlant: (state, action: PayloadAction<{plantId: string, newRepottingDate: string}>) => {
        state.plants = state.plants.map((plant) => {
            if (plant.plantId === action.payload.plantId) {
              return { ...plant, lastRepotted: action.payload.newRepottingDate };
            }
            return plant;
          });
      },
      makeAPup: (state, action: PayloadAction<{parentId: string, childId: number}>) => {
        state.plants = state.plants.map((plant) => {
            if (plant.plantId === action.payload.parentId) {
              return { ...plant, parentOf: action.payload.childId };
            }
            return plant;
          });
      },
      soilMixRecipe: (state, action: PayloadAction<{plantId: string, newSoilMixRecipe: string}>) => {
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
            selectPlants: state => state.plants,
    }
  });

export const { addNewPlant, updatePlant, updatePlantImage, deletePlant, 
               repotPlant, makeAPup, soilMixRecipe } = plantSlice.actions;

export const { selectPlantsExist, selectPlants } = plantSlice.selectors


export default plantSlice.reducer;