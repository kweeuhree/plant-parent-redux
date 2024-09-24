import { useNavigateToPath } from "../../app/hooks"
// plant slice imports
import PlantPreview from "./PlantPreview"
import type { Plant } from './plantSlice'
// components
import Button from "../../components/Button"

type Props = {
  plants: Plant[],
}

const AllPlantsDisplay = ( { plants }: Props ) => {
  const navigate = useNavigateToPath('');

  const plantsList = plants?.map((plant) => (
    <PlantPreview  
      key={plant.plantId} 
      plant={plant}
       />
  ))


  return (
    <>
    {
      plants.length ? (
        <ul>
          {plantsList}
        </ul>
      ) : (
        'no plants to display'
      )
    }
    <Button onClick={() => navigate('/profile')} text="Profile" />
    </>
  )
}

export default AllPlantsDisplay;