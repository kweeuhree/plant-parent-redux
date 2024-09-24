import type { Image } from "../image/imageSlice";


const currentDate = new Date();

export const addNewPlantReq = (image: Image, plantName: string) => {
    // console.log('Attempting to post a new plant...');
    try {
        const newPlant = {
            plantId: (Math.floor(Math.random() * 1000)).toString(),
            name: plantName,
            dateCreated: JSON.stringify(currentDate),
            image: image,
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

export const updatePlantReq = async (newImage: Image, plantId: string, plantName: string, dateCreated: string) => {
    console.log(`Attempting to update a plant with id ${plantId}...`);
    try {
        const updatedPlant = {
            plantId: plantId,
            name: plantName,
            dateCreated: dateCreated,
            image: {
                imageId: newImage.imageId,
                imageUrl: newImage.imageUrl,
            },
            parentOf: null,
            childOf: null,
            soilMixRecipe: null,
            familyTreeId: null,
            timelineId: null,
            lastRepotted: null,
            Flash: "Plant is updated!"
        }
        console.log(updatedPlant);
        return updatedPlant;

    } catch(error) {
        throw new Error(`Failed to post new plant: ${error}`);
    }
}