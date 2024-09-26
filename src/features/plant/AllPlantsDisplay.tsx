import { useMemo } from "react"
// plant slice imports
import PlantPreview from "./PlantPreview"
import type { Plant } from './plantSlice'
// components
import PlantForm from "./PlantForm"
import DefaultLayout from "../../layouts/DefaultLayout"

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
        <DefaultLayout>
        <ul>
          {plantsList}
        </ul>
        </DefaultLayout>
      ) : (
        <>
        <p>no plants to display</p>
        <PlantForm formMode="ADD" />
        </>
      )
    }
   </>
  )
}

export default AllPlantsDisplay;