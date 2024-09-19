import "./App.css"
import { Route, Routes, Navigate } from 'react-router-dom';
import SignUpLoginForm from "./features/user/SignUpLoginForm";
import ProtectedRoute from "./features/user/ProtectedRoute";
import AllPlantsDisplay from "./features/plant/AllPlantsDisplay";
import PlantDisplay from "./features/plant/PlantDisplay";
import PlantForm from "./features/plant/PlantForm";
import Profile from "./features/user/Profile";
import { useAppSelector } from "./app/hooks";
import { selectPlants } from "./features/plant/plantSlice";

const App = () => {

  const userPlants = useAppSelector(selectPlants);

  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} /> 
          <Route path="/login" element={<SignUpLoginForm formMode="LOGIN" />} /> 
          <Route path="/signup" element={<SignUpLoginForm formMode="SIGNUP" />} />
          <Route path="/all-plants" element={<ProtectedRoute element={AllPlantsDisplay} plants={userPlants} />} />
          <Route path="/all-plants/plant/:id" element={<ProtectedRoute element={PlantDisplay} display="full" />} />
          <Route path="/add-new-plant" element={<ProtectedRoute element={PlantForm} formMode="ADD" />} />
          <Route path="/update-plant/:id" element={<ProtectedRoute element={PlantForm} formMode="UPDATE" />} />
          <Route path="/profile" element={<ProtectedRoute element={Profile} />} />
      </Routes>
    </div>
  )
}

export default App
