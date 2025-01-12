import { Route, Routes } from "react-router-dom";
import ListDocument from "../components/forms/Document/ListDocument"; 

const DocumentRoute = () => {
  return (
    <Routes>
      {/* Route for viewing documents for a specific patient */}
      <Route path="/documents/:patientId" element={<ListDocument />} />

    </Routes>
  );
};

export default DocumentRoute;
