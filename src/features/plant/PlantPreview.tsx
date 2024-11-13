import { useAppDispatch, useNavigateToPath } from "../../app/hooks";

import { ImageContainer } from "../image";
import { getPlantById, type Plant } from "./";

type Props = {
  plant: Plant;
};

const PlantPreview = ({ plant }: Props) => {
  const {
    plantId,
    name,
    image: { imageId, imageUrl },
  } = plant;
  const dispatch = useAppDispatch();
  const navigate = useNavigateToPath();

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
  );
};

export default PlantPreview;
