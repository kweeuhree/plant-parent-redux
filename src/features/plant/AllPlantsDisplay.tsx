import { useMemo } from "react"
// plant slice imports
import PlantPreview from "./PlantPreview"
import type { Plant } from './plantSlice'
// components
import NavigateToProfileButton from "../../components/NavigateToProfileButton"

type Props = {
  plants: Plant[],
}

const AllPlantsDisplay = ( { plants }: Props ) => {

  const plantsList = useMemo(() => plants.map((plant) => (
    <PlantPreview  
      key={plant.plantId} 
      plant={plant}
    />
  )), [plants]);


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
    <NavigateToProfileButton />
    </>
  )
}

export default AllPlantsDisplay;