import { Route, Routes } from "react-router-dom";
import "./index.css"
import {NotFound, DonorRegister, DonorLogin, Landing, Donor, Organisation, Patient} from "./Pages/page"
import Protected from "./components/Routes/ProtectedRoute";
import UnProtected from "./components/Routes/UnProtectedRoute";

const App = () => {
  return (
    <Routes>
      {/* <Route path="/organisation" element={
        <Protected>
          <Inventory />
        </Protected>
      
      }/>  */}
      {/* <Route path="/hospital" element={
        <Protected>
          <Hospital />
        </Protected>
      } /> */}
      {/* <Route
        path="/account"
        element={
          <Protected>
            <Account />
          </Protected>
        }
      /> */}
      <Route
        path="/"
        element={
          <UnProtected>
            <Landing />
          </UnProtected>
        }
      />
      <Route 
      path="/donor"
      element={
        <Protected>
          <Donor />
        </Protected>
      }
      />
      <Route 
      path="/organisation"
      element={
        <Protected>
          <Organisation />
        </Protected>
      }
      />
      <Route 
      path="/patient"
      element={
        <Protected>
          <Patient />
        </Protected>
      }
      />
      <Route
        path="/login"
        element={
          <UnProtected>
            <DonorLogin />
          </UnProtected>
        }
      />
      <Route
        path="/register"
        element={
          <UnProtected>
            <DonorRegister />
          </UnProtected>
        }
      />
      <Route
        path="*"
        element={
          <UnProtected>
            <NotFound />
          </UnProtected>
        }
      />
    </Routes>
  );
};
export default App;
