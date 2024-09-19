import type { PlantData } from "./PlantForm";

const currentDate = new Date();

export const addNewPlantReq = (plantData: PlantData, plantName: string) => {
    console.log('Attempting to post a new plant...');
    try {
        const newPlant = {
            plantId: (Math.floor(Math.random() * 1000)).toString(),
            name: plantName,
            dateCreated: JSON.stringify(currentDate),
            parentOf: null,
            childOf: null,
            soilMixRecipe: null,
            familyTreeId: null,
            timelineId: null,
            lastRepotted: null,
            Flash: "Plant is added!"
        }
        console.log(newPlant);
        return newPlant;

    } catch(error) {
        throw new Error(`Failed to post new plant: ${error}`);
    }
}

export const updatePlantReq = async (plantData, plantId) => {
    console.log(plantData, "plantData");
    console.log(plantId, 'id');
}