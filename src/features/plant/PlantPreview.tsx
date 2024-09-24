import { useAppDispatch } from '../../app/hooks';
import { useNavigate } from "react-router-dom";
// image slice imports
import ImageContainer from "../image/ImageContainer";
// plant slice imports
import type { Plant } from "./plantSlice";
import { getPlantById } from './plantSlice';


type Props = {
    plant: Plant,
}

const PlantPreview = ( {plant}: Props ) => {
    const { plantId, name, image:{imageId, imageUrl} } = plant;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleClick = () => {
        console.log(`Attempting to navigate to ${plantId}`);
        dispatch(getPlantById(plantId));
        navigate(`/all-plants/${plantId}`);
    };
    

    return (
        <div onClick={handleClick}>
           <div>{name}</div>
            <ImageContainer src={imageUrl} alt={name} width="200" height="200" />
        </div>
    )
}

export default PlantPreview;