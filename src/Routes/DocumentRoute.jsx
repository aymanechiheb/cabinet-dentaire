import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import ListDocument from "../components/forms/Document/ListDocument"; 

const DocumentRoute = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/documents/:patientId" element={<ListDocument />} />
      </Route>
    </Routes>
  );
};

export default DocumentRoute;
