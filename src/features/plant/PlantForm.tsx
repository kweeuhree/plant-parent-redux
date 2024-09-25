import { useEffect } from 'react';
import { useAppDispatch, useAppSelector, useInputData, useMessageWithTimeOut, useNavigateToPath, useSelectedPlant } from '../../app/hooks';
// image slice imports
import type { Image } from '../image/imageSlice';
import { uploadImage } from '../image/imageSlice';
import ImageContainer from '../image/ImageContainer';
// message slice imports
import Message from '../message/Message';
// plant slice imports
import { addNewPlant, updatePlant, unselectPlant } from './plantSlice';
import { addNewPlantReq, updatePlantReq } from './fetchPlant';
// components
import Button from '../../components/Button';
import DefaultLayout from '../../layouts/DefaultLayout';

type Props = {
  formMode: string, 
  plantId?: string,
}

export type PlantData<T> = {
  name?: string,
  image?: T, 
}

const PlantForm = ({ formMode }: Props) => {
  const { loading, error } = useAppSelector(state => state.images);

    const dispatch = useAppDispatch();
    const navigate = useNavigateToPath();
    const setMessage = useMessageWithTimeOut();
    // use selected plant on form update
    const plant = useSelectedPlant();

    useEffect(() => {
      // ensure there is no selected plant if adding a new plant
      formMode === 'ADD' && dispatch(unselectPlant());
  }, [formMode, dispatch]);

    useEffect(() => {
      if (error) {
        setMessage(error);
      }
    }, [error, setMessage]);

    // useInputData hook takes initialState and a callback function as arguments
    const initialState =  formMode === 'ADD' ? {name: '', image: ''} : {name: plant?.name, image: plant?.image.imageUrl}; 
    const { inputData, file, handleChange, handleSubmit } = useInputData(
        initialState, 
        (plantData) => processPlantData(plantData) 
    );

    const processPlantData = async (plantData: PlantData<any>) => {
      const formData = new FormData();
      formData.append('file', plantData.image);
        try {
          const imageIsUploaded = await dispatch(uploadImage(formData)); 
          if(imageIsUploaded === undefined || !plantData.name) return;

          formMode === 'ADD' ?
        addNewPlantWrapper(imageIsUploaded, plantData.name) :
        updatePlantWrapper(imageIsUploaded);
      
      } catch(error) {
        setMessage(`${error instanceof Error && error}`);
      }
    }

    const addNewPlantWrapper = (image: Image, plantName: string) =>  {
      try {
        const plantIsAdded = addNewPlantReq(image, plantName);
        if(plantIsAdded) {
          
          setMessage(plantIsAdded.Flash);
          dispatch(addNewPlant(plantIsAdded));

          navigate('/all-plants', 1000);
        } 
      } catch (error) {
        throw new Error(`Failed adding new plant: ${error}`);
      } 
    }

    const updatePlantWrapper = async (newImage: Image) => {
      console.log(`Updating plant with ${newImage.imageId} and ${newImage.imageUrl} `);

      if(!plant) {
        setMessage('Did not find a plant');
        return;
      }

      try {
        const plantIsUpdated = await updatePlantReq(newImage, plant.plantId, plant.name, plant.dateCreated);
        if (plantIsUpdated) {
          dispatch(updatePlant({
            plantId: plant.plantId,
            image: {...plantIsUpdated.image},
          }));
          navigate('/all-plants', 1000);
          
        } else {
          setMessage(plantIsUpdated.Flash);
        }
      } catch (error) {
        throw new Error(`Failed updating plant: ${error}`);
      } 
    }

  
    return (
      <DefaultLayout>

      {!error && <Message /> }
      <form onSubmit={handleSubmit}>
          <label htmlFor='plant-name'>Plant name:</label>
            <input id="plant-name" 
              name="name" 
              type="text" 
              value={inputData.name} 
              onChange={handleChange}
              required />

            <br />

          <label htmlFor='plant-image'>Plant image:</label>
          <input id="plant-image" 
            name="image" 
            type="file" 
            onChange={handleChange}
            required />

          <Button type="submit" text={loading ? 'Uploading...' : 'Upload'}/> 
          <ImageContainer alt="Preview" src={file || plant?.image.imageUrl} />
      </form>
  </DefaultLayout>
  )
}

export default PlantForm;