import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useRedirectAfterTimeout } from '../../app/hooks';
import SubmitButton from '../../components/SubmitButton';
import Message from '../message/Message';
import { useInputData } from '../../app/hooks';
import { addNewPlant, updatePlant } from './plantSlice';
import { addNewPlantReq, updatePlantReq } from './fetchPlant';
import { setMessageWithTimeout } from '../message/messageSlice';


type Props = {
  formMode: string, 
  plantId?: string,
}

export type PlantData = {
  name: string,
  image: File | undefined,
}

const PlantForm = ({ formMode, plantId }: Props) => {
  useEffect(() => {
    console.log(`Current form type: ${formMode}`);
}, []);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const initialState: PlantData = {name: '', image: undefined}; 
    // useInputData hook takes initialState and a callback function as arguments
    const { inputData, handleChange, handleSubmit } = useInputData(
        initialState, 
        (plantData) => appendPlantData(plantData) 
    );

    const appendPlantData = (plantData: PlantData) => {
      const formData = new FormData();
      formData.append('name', plantData.name);
      formData.append('image', plantData.image);

      formMode === 'ADD' ?
      addNewPlantWrapper(formData, plantData.name) :
      updatePlantWrapper(formData, plantData.name)
    }

    const addNewPlantWrapper = (plantData: FormData, plantName: string) =>  {
      console.log(`Adding new plant: ${plantName}`);
      try {
        const plantIsAdded = addNewPlantReq(plantData, plantName);
        if(plantIsAdded) {
          dispatch(setMessageWithTimeout(plantIsAdded.Flash));
          dispatch(addNewPlant(plantIsAdded));

          setTimeout(() => {
            navigate('/all-plants');
          }, 1000);
        } 
      } catch (error) {
        throw new Error(`Failed adding new plant: ${error}`);
      }
    }

    const updatePlantWrapper = (plantData) => {
      console.log(`Updating plant: ${plantData}`);
    
      try {
        const plantIsUpdated = updatePlantReq(formData, plantId);
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

          <SubmitButton /> 
      </form>
  
  </>
  )
}

export default PlantForm;