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
import LabeledInput from '../../components/LabeledInput';
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
      if(!plantData.name) {
        setMessage('Did not find plant name');
        return;
      };

      if(!plantData.image && plant?.image) {
        updatePlantWrapper(plant.image, plantData.name);
      }

      const formData = new FormData();
      formData.append('file', plantData.image);

      try {
          const imageIsUploaded = await dispatch(uploadImage(formData)); 
          if(imageIsUploaded === undefined) return;

          formMode === 'ADD' ?
        addNewPlantWrapper(imageIsUploaded, plantData.name) :
        updatePlantWrapper(imageIsUploaded, plantData.name);
      
      } catch(error) {
        setMessage(`Error: ${error instanceof Error ? error.message : String(error)}`);
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

    const updatePlantWrapper = async (newImage: Image, newName: string) => {
      console.log(`Updating plant with ${newImage.imageId} and ${newImage.imageUrl} `);

      if(!plant) {
        setMessage('Did not find a plant');
        return;
      }

      try {
        const plantIsUpdated = await updatePlantReq(newImage, plant.plantId, newName, plant.dateCreated);
        if (plantIsUpdated) {
          dispatch(updatePlant({
            plantId: plant.plantId,
            name: plantIsUpdated.name,
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
        <LabeledInput 
          label="Plant name:"
          id="plant-name"
          name="name"
          type="text"
          onChange={handleChange}
          value={inputData.name} />
          
          <br />

        <LabeledInput 
          label="Plant image:"
          id="plant-image"
          name="image"
          type="file"
          onChange={handleChange}
          required={formMode === 'UPDATE' && false}
           />

          <Button type="submit" text={loading ? 'Uploading...' : 'Upload'}/> 
          <ImageContainer alt="Preview" src={file || plant?.image.imageUrl} />
      </form>
      
  </DefaultLayout>
  )
}

export default PlantForm;