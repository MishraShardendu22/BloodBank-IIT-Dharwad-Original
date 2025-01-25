import { Route, Routes } from "react-router-dom";
import "./index.css"
import Landing from "./Pages/Landing";
import NotFound from "./Pages/NotFound";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
