import { Route, Routes } from "react-router-dom";
import DentList from '../Components/forms/Dent/DentList'

const DentRoute = () => {
  return (
    <Routes>
      {/* Route for viewing all dents */}
      <Route path="/dents" element={<DentList />} />

      
    </Routes>
  );
};

export default DentRoute;
