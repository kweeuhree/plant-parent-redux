import { useMemo } from "react"
// plant slice imports
import PlantPreview from "./PlantPreview"
import type { Plant } from './plantSlice'
// components
import NavigateToProfileButton from "../../components/NavigateToProfileButton"
import PlantForm from "./PlantForm"

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
        <>
        <p>no plants to display</p>
        <PlantForm formMode="ADD" />
        </>
        
      )
    }
    <NavigateToProfileButton />
    </>
  )
}

export default AllPlantsDisplay;