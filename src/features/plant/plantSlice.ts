import type { PayloadAction } from "@reduxjs/toolkit"
import type { AppThunk, RootState } from "../../app/store"
import { createAppSlice } from "../../app/createAppSlice"

export type Plant = {
    plantId: number | null,
    parentOf: number[] | null,
    childOf: number | null,
    name: string,
    dateCreated: Date | null,
    lastRepotted: Date | null,
    soilMix: string,
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
    name:"plants",
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
          }
        },
        selectors: {
            selectPlantsExist: state => state.plants.length > 0,
      },
});

export const { addNewPlant, updatePlant, deletePlant } = plantSlice.actions;

export const { selectPlantsExist } = plantSlice.selectors


export default plantSlice.reducer;