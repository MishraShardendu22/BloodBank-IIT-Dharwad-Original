import { Route, Routes } from 'react-router-dom';
import NotFound from './Pages/NotFound';
import Landing from './Pages/Landing';
import './index.css';

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
