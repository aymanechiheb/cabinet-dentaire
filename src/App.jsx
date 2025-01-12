import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Stores/Store"; 
import PatientRoutes from "./Routes/PatientRoute";
import DocumentRoute from "./Routes/DocumentRoute"
import DentRoute from "./Routes/DentRoute"
import SoinRoutes from "./Routes/SoinRoute"
import Navbar from './Components/Layout/Navbar';
import UserRoutes from "./Routes/UserRoute";
import './style.css'


function App() {
  return (
    <Provider store={store}>
     
      <Router>
      <Navbar/>
        <PatientRoutes />
        <UserRoutes />

        <DocumentRoute />
        <DentRoute />
        <SoinRoutes />



      </Router>
    </Provider>
  );
}

export default App;
