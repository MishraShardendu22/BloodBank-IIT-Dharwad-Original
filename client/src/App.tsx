import {
  Donor,
  Patient,
  Landing,
  NotFound,
  DonorLogin,
  Organisation,
  DonorRegister,
  PatientLogin,
  PatientRegister,
  OrganisationLogin,
  OrganisationRegister
} from "./Pages/page"
import Unprotected from "./components/Routes/UnProtectedRoute";
import { Route, Routes } from "react-router-dom";
import "./index.css"
import ProtectedDonor from "./components/Routes/Protected/DonorProtected";
import ProtectedPatient from "./components/Routes/Protected/PatientProtected";
import ProtectedOrganisation from "./components/Routes/Protected/OrganisationProtected";


const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Unprotected>
            <Landing />
          </Unprotected>
        }
      />
      <Route
        path="/donor/login"
        element={
          <Unprotected>
            <DonorLogin />
          </Unprotected>
        }
      />
      <Route
        path="/donor/register"
        element={
          <Unprotected>
            <DonorRegister />
          </Unprotected>
        }
      />
      <Route
        path="/patient/login"
        element={
          <Unprotected>
            <PatientLogin />
          </Unprotected>
        }
      />
      <Route
        path="/patient/register"
        element={
          <Unprotected>
            <PatientRegister />
          </Unprotected>
        }
      />
      <Route
        path="/organisation/login"
        element={
          <Unprotected>
            <OrganisationLogin />
          </Unprotected>
        }
      />
      <Route
        path="/organisation/register"
        element={
          <Unprotected>
            <OrganisationRegister />
          </Unprotected>
        }
      />
      <Route 
      path="/donor/dashboard"
      element={
        <ProtectedDonor>
          <Donor />
        </ProtectedDonor>
      }
      />
      <Route 
      path="/patient/dashboard"
      element={
        <ProtectedPatient>
          <Patient />
        </ProtectedPatient>
      }
      />
      <Route 
      path="/organisation/dashboard"
      element={
        <ProtectedOrganisation>
          <Organisation />
        </ProtectedOrganisation>
      }
      />
      <Route
        path="*"
        element={
          <Unprotected>
            <NotFound />
          </Unprotected>
        }
      />
    </Routes>
  );
};
export default App;
