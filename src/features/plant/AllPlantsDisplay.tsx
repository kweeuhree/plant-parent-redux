// plant slice imports
import PlantPreview from "./PlantPreview"
import type { Plant } from './plantSlice'

type Props = {
  plants: Plant[],
}

const AllPlantsDisplay = ( { plants }: Props ) => {

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
    </>
  )
}

export default AllPlantsDisplay;