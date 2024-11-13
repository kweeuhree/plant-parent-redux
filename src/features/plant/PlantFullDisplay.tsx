import {
  useAppDispatch,
  useAppSelector,
  useMessageWithTimeOut,
  useNavigateToPath,
} from "../../app/hooks";
import { deletePlant, selectSpecificPlant } from "./";
import { deleteImage, ImageContainer } from "../image";
import { Button } from "../../components";

const PlantFullDisplay = () => {
  const plant = useAppSelector(selectSpecificPlant);
  const dispatch = useAppDispatch();
  const navigate = useNavigateToPath();
  const setMessage = useMessageWithTimeOut();

  if (!plant) {
    setMessage("Nothing to display. Redirecting...");
    navigate("/all-plants", 1000);
    return;
  }

  const {
    plantId,
    dateCreated,
    name,
    image: { imageId, imageUrl },
  } = plant;

  const handleEdit = () => {
    navigate(`/update-plant/${plantId}`);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this plant?")) {
      // dispatch(deleteImage(imageId));
      dispatch(deletePlant(plantId));
      navigate(`/all-plants`);
    } else {
      return;
    }
  };

  return (
    <div className="full">
      {name}
      <ImageContainer src={imageUrl} alt={name} />
      {dateCreated.toLocaleString()}

      <Button text="Edit" onClick={handleEdit} />
      <Button text="Delete" onClick={handleDelete} />
    </div>
  );
};

export default PlantFullDisplay;
