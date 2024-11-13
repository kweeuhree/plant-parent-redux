import { Route, Routes, Navigate } from "react-router-dom";

import { SignUpLoginForm, ProtectedRoute, Profile } from "./features/user";
import {
  AllPlantsDisplay,
  PlantFullDisplay,
  PlantForm,
} from "./features/plant";
import { useAppSelector } from "./app/hooks";
import { selectPlants } from "./features/plant/plantSlice";

import "./App.css";

const App = () => {
  const userPlants = useAppSelector(selectPlants);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<SignUpLoginForm formMode="LOGIN" />} />
        <Route path="/signup" element={<SignUpLoginForm formMode="SIGNUP" />} />
        <Route
          path="/all-plants"
          element={
            <ProtectedRoute element={AllPlantsDisplay} plants={userPlants} />
          }
        />
        <Route
          path="/all-plants/:plantId"
          element={<ProtectedRoute element={PlantFullDisplay} />}
        />
        <Route
          path="/add-new-plant"
          element={<ProtectedRoute element={PlantForm} formMode="ADD" />}
        />
        <Route
          path="/update-plant/:plantId"
          element={<ProtectedRoute element={PlantForm} formMode="UPDATE" />}
        />
        <Route path="/profile" element={<ProtectedRoute element={Profile} />} />
      </Routes>
    </div>
  );
};

export default App;
