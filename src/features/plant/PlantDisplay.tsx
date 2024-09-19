import { Link } from "react-router-dom";
import ImageContainer from "./ImageContainer";
import PlantForm from "./PlantForm";
import type { Plant } from "./plantSlice";


type Props = {
    display: string,
    plant: Plant,
}

const PlantDisplay = ( {display, plant}: Props ) => {
    const { plantId, name, dateCreated } = plant;
    const imageDisplay = <ImageContainer src={plantImage.src} alt="name" />
    const handleEdit = () => {
        return <PlantForm formMode="UPDATE" plantId={plantId} />
    }
    const editButton = <button onClick={handleEdit}>Edit</button>;


    const displayPreview = () => {
        return (
            <div className="preview" >
                <Link to={`/all-plants/${plantId}`}>{name}</Link>
                {imageDisplay}

            </div>
        )
    }

    const displayFull = () => {
        return (
            <div className="full">
                {name}
                {imageDisplay}
                {dateCreated}
                {editButton}
            </div>
        )
    }

  return (
    <>
    {display === "preview" ? displayPreview() : displayFull()}
    </>
  )
}

export default PlantDisplay;