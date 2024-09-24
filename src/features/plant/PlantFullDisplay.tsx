import ImageContainer from '../image/ImageContainer';
import { useAppSelector } from '../../app/hooks';
import { selectSpecificPlant } from './plantSlice';
import { useNavigate } from 'react-router-dom';

// import type { Plant } from './plantSlice'

const PlantFullDisplay = () => {
    const plant = useAppSelector(selectSpecificPlant);
    const navigate = useNavigate();

    const { plantId, dateCreated, name, image: {imageId, imageUrl} } = plant;
     

    const handleEdit = () => {
        navigate(`/update-plant/${plantId}`); 
    }

    return (
        <>
        {  !plantId ? (
             "Nothing to display"
    ): (
        <div className="full">
            {name}
            <ImageContainer src={imageUrl} alt={name} />
            {dateCreated.toLocaleString()}
            <button onClick={handleEdit}>Edit</button> 
         </div>
    ) }
        </>
    )
}

export default PlantFullDisplay;