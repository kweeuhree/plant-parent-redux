import { useMemo } from "react";

import { PlantForm, PlantPreview, type Plant } from "./";
import DefaultLayout from "../../layouts/DefaultLayout";

type Props = {
  plants: Plant[];
};

const AllPlantsDisplay = ({ plants }: Props) => {
  const plantsList = useMemo(
    () =>
      plants.map(plant => <PlantPreview key={plant.plantId} plant={plant} />),
    [plants],
  );

  return (
    <>
      {plants.length ? (
        <DefaultLayout>
          <ul>{plantsList}</ul>
        </DefaultLayout>
      ) : (
        <>
          <p>no plants to display</p>
          <PlantForm formMode="ADD" />
        </>
      )}
    </>
  );
};

export default AllPlantsDisplay;
