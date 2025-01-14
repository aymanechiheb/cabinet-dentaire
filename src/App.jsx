import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Stores/Store"; 
import PatientRoutes from "./Routes/PatientRoute";
import DocumentRoute from "./Routes/DocumentRoute"
import DentRoute from "./Routes/DentRoute"
import SoinRoutes from "./Routes/SoinRoute"
import Navbar from './Components/Layout/Navbar';
import UserRoutes from "./Routes/UserRoute";
import ProduitRoute from "./Routes/ProduitRoute";
import SalleConsultationRoute from "./Routes/SalleConsultationRoute";
import MachineRoute from "./Routes/MachineRoute";
import "./index.css"
import './style.css'


function App() {
  return (
    <Provider store={store}>
     
      <Router>
      <Navbar/>
        <PatientRoutes />
        <UserRoutes />
      <ProduitRoute />
        <DocumentRoute />
        <DentRoute />
        <SoinRoutes />
        <SalleConsultationRoute />
        <MachineRoute />


      </Router>
    </Provider>
  );
}

export default App;
