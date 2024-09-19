import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import type { Image } from '../image/imageSlice';
import SubmitButton from '../../components/SubmitButton';
import Message from '../message/Message';
import { useInputData } from '../../app/hooks';
import { addNewPlant, updatePlant } from './plantSlice';
import { addNewPlantReq, updatePlantReq } from './fetchPlant';
import { setMessageWithTimeout } from '../message/messageSlice';
import ImageContainer from './ImageContainer';
import { uploadImage, uploadRequest, uploadFailure, selectImages } from '../image/imageSlice';

type Props = {
  formMode: string, 
  plantId?: string,
}

export type PlantData = {
  name: string,
  image: Image,
}

const PlantForm = ({ formMode, plantId }: Props) => {
  const { loading, error } = useAppSelector(state => state.images);
  useEffect(() => {
    console.log(`Current form type: ${formMode}`);
}, []);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const initialState: PlantData = {name: '', image: null}; 
    // useInputData hook takes initialState and a callback function as arguments
    const { inputData, file, handleChange, handleSubmit } = useInputData(
        initialState, 
        (plantData) => processPlantData(plantData) 
    );

    const processPlantData = (plantData: PlantData) => {
      const formData = new FormData();
      formData.append('image', plantData.image);

      try {
        dispatch(uploadRequest());
        const imageIsUploaded = uploadImage(formData);
        formMode === 'ADD' ?
      addNewPlantWrapper(plantData.name, imageIsUploaded.secure_url) :
      updatePlantWrapper(imageIsUploaded.secure_url);

      } catch(error) {
        dispatch(setMessageWithTimeout(error))
      }
    }

    const addNewPlantWrapper = (plantName: string, imageUrl: string) =>  {
      console.log(`Adding new plant: ${plantName}`);
      try {
        const plantIsAdded = addNewPlantReq(plantName, imageUrl);
        if(plantIsAdded) {
          
          dispatch(setMessageWithTimeout(plantIsAdded.Flash));
          dispatch(addNewPlant(plantIsAdded));
          console.log('Just added image info:', plantIsAdded.name, plantIsAdded.plantId);
          
          setTimeout(() => {
            navigate('/all-plants');
          }, 1000);
        } 
      } catch (error) {
        throw new Error(`Failed adding new plant: ${error}`);
      }
    }

    const updatePlantWrapper = (newImageUrl: string) => {
      console.log(`Updating plant`);
    
      try {
        const plantIsUpdated = updatePlantReq(newImageUrl, plantId);
        if(plantIsUpdated) {
          dispatch(updatePlant(plantIsUpdated));
        } else {
          dispatch(setMessageWithTimeout(plantIsUpdated.Flash));
        }
      } catch (error) {
        throw new Error(`Failed updating plant: ${error}`);
      }
    }
    
  
    return (
      <>
      <Message />
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

          <SubmitButton text={loading ? 'Uploading...' : 'Upload'}/> 
          <ImageContainer alt="Preview" src={file} />
      </form>
  
  </>
  )
}

export default PlantForm;