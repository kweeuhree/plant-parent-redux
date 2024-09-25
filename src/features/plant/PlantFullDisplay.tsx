import ImageContainer from '../image/ImageContainer';
import { useAppSelector, useMessageWithTimeOut, useNavigateToPath } from '../../app/hooks';
import { selectSpecificPlant } from './plantSlice';

// import type { Plant } from './plantSlice'

const PlantFullDisplay = () => {
    const plant = useAppSelector(selectSpecificPlant);
    const navigate = useNavigateToPath();
    const setMessage = useMessageWithTimeOut();

    if(!plant) {
        setMessage('Nothing to display. Redirecting...');
        navigate('/all-plants', 1000);
        return;
    }

    const { plantId, dateCreated, name, image: {imageId, imageUrl} } = plant;
     

    const handleEdit = () => {
        navigate(`/update-plant/${plantId}`); 
    }

    return (
        <div className="full">
            {name}
            <ImageContainer src={imageUrl} alt={name} />
            {dateCreated.toLocaleString()}
            <button onClick={handleEdit}>Edit</button> 
         </div>
    )
}

export default PlantFullDisplay;