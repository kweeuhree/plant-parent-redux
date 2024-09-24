import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector, useInputData } from '../../app/hooks';
// image slice imports
import type { Image } from '../image/imageSlice';
import { uploadImage } from '../image/imageSlice';
import ImageContainer from '../image/ImageContainer';
// message slice imports
import Message from '../message/Message';
import { setMessageWithTimeout } from '../message/messageSlice';
// plant slice imports
import { addNewPlant, selectSpecificPlant, updatePlant } from './plantSlice';
import { addNewPlantReq, updatePlantReq } from './fetchPlant';
// components
import SubmitButton from '../../components/SubmitButton';

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
}, [formMode]);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const initialState: PlantData =  formMode === 'ADD' ? {name: '', image: null} : {image: null}; 
    // useInputData hook takes initialState and a callback function as arguments
    const { inputData, file, handleChange, handleSubmit } = useInputData(
        initialState, 
        (plantData) => processPlantData(plantData) 
    );
//--------
let plant = useAppSelector(selectSpecificPlant);


    const processPlantData = async (plantData: PlantData) => {
      const formData = new FormData();
      formData.append('file', plantData.image);

      try {
        // dispatch(uploadRequest());
        const imageIsUploaded = await dispatch(uploadImage(formData)); 
        console.log(imageIsUploaded.imageUrl, 'image secure url');
        console.log(imageIsUploaded.imageId, 'image id');
        formMode === 'ADD' ?
      addNewPlantWrapper(plantData.name, imageIsUploaded) :
      updatePlantWrapper(imageIsUploaded);

      } catch(error) {
        dispatch(setMessageWithTimeout(`${error instanceof Error && error}`))
      }
    }

    const addNewPlantWrapper = (plantName: string, image) =>  {
      console.log(`Adding new plant: ${plantName}`);
      try {
        const plantIsAdded = addNewPlantReq(image, plantName);
        if(plantIsAdded) {
          
          dispatch(setMessageWithTimeout(plantIsAdded.Flash));
          dispatch(addNewPlant(plantIsAdded));
          console.log('Just added image info:', plantIsAdded.name, plantIsAdded.plantId);
        
        } 
      } catch (error) {
        throw new Error(`Failed adding new plant: ${error}`);
      } finally {
        setTimeout(() => {
          navigate('/all-plants');
        }, 1000);
      }
    }

    const updatePlantWrapper = async (newImage: Image) => {
      console.log(`Updating plant with ${newImage.imageId} and ${newImage.imageUrl} `);
      
      try {
        const plantIsUpdated = await updatePlantReq(newImage, plant.plantId, plant?.name, plant?.dateCreated);
        if (plantIsUpdated) {
          dispatch(updatePlant({
            plantId: plant.plantId,
            image: {...plantIsUpdated.image},
          }));

          
          
        } else {
          dispatch(setMessageWithTimeout(plantIsUpdated.Flash));
        }
      } catch (error) {
        throw new Error(`Failed updating plant: ${error}`);
      } finally {
        setTimeout(() => {
          navigate('/all-plants');
        }, 1000);
      }
    }
    
  
    return (
      <>
      {!error ? <Message /> : error}
      <form onSubmit={handleSubmit}>
         {formMode === 'ADD' &&
         ( <>
            <label htmlFor='plant-name'>Plant name:</label>
            <input id="plant-name" 
              name="name" 
              type="text" 
              value={inputData.name} 
              onChange={handleChange}
              required />

            <br />
         </>
        )}

          <label htmlFor='plant-image'>Plant image:</label>
          <input id="plant-image" 
            name="image" 
            type="file" 
            onChange={handleChange}
            required />

          <SubmitButton text={loading ? 'Uploading...' : 'Upload'}/> 
          <ImageContainer alt="Preview" src={file ? file : plant?.image.imageUrl} />
      </form>
  
  </>
  )
}

export default PlantForm;