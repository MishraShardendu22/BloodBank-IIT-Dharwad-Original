import {NotFound, DonorRegister, DonorLogin, Landing, } from "./Pages/page"
import Unprotected from "./components/Routes/UnProtectedRoute";
import { Route, Routes } from "react-router-dom";
import "./index.css"

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
        path="/login"
        element={
          <Unprotected>
            <DonorLogin />
          </Unprotected>
        }
      />
      <Route
        path="/register"
        element={
          <Unprotected>
            <DonorRegister />
          </Unprotected>
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
