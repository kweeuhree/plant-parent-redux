import PlantDisplay from "./PlantDisplay"
import type { Plant } from './plantSlice'
import { useNavigate } from 'react-router-dom'

type Props = {
  plants: Plant[],
}

const AllPlantsDisplay = ( { plants }: Props ) => {
  const navigate = useNavigate();
  
  const handleClick = (plantId: number) => {
    navigate(`/plant/${plantId}`);
  }

  const plantsList = plants?.map((plant) => (
    <PlantDisplay  
      key={plant.plantId} 
      plant={plant}
      onClick={()=> handleClick(plant.plantId)} 
      display="preview" />
  ))


  return (
    <>
    {
      plants.length ? (
        <ul>
          {plantsList}
        </ul>
      ) : (
        navigate('/add-plant')
      )
    }
    </>
  )
}

export default AllPlantsDisplay;