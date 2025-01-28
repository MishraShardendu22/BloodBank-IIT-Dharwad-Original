import { Route, Routes } from "react-router-dom";
import NotFound from "./Pages/NotFound";
import Protected from "./components/Routes/ProtectedRoute.tsx"
import UnProtected from "./components/Routes/UnProtectedRoute.tsx";
import DonorRegister from "./Pages/DonorPages/DonorAuth/register.tsx";
import DonorLogin from "./Pages/DonorPages/DonorAuth/login.tsx";
import Landing from "./Pages/Landing";
import "./index.css"


const App = () => {
  return (
    <Routes>
      {/* <Route
        path="/donor"
        element={
          <Protected>
            <Donor />
          </Protected>
        }
      />
      <Route path="/organisation" element={
        <Protected>
          <Inventory />
        </Protected>
      
      }/> */}
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
