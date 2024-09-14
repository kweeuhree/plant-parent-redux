import "./App.css"
import { Route, Routes } from 'react-router-dom';
import SignUpLoginForm from "./features/user/SignUpLoginForm";
import ProtectedRoute from "./features/user/ProtectedRoute";

const App = () => {

  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<ProtectedRoute element={AllPlantDisplay} />} />
          <Route path="/add-new-plant" element={<ProtectedRoute element={PlantForm} formType="ADD" />} />
          <Route path="/update-plant" element={<ProtectedRoute element={PlantForm} formType="UPDATE" />} />
          <Route path="/profile" element={<ProtectedRoute element={Profile} />} />
          <Route path="/" element={<SignUpLoginForm formType="LOGIN" />} /> 
      </Routes>
    </div>
  )
}

export default App
