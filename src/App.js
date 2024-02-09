import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";
import HomePage from './pages/homePage';
import BarChartsPage from './pages/barChartsPage';
import HistorgramsPage from './pages/histogramsPage';
import ScatterplotsPage from './pages/scatterplotsPage';

function App() {
  return (
    <Routes>
      <Route
        exact path="/"
        element={<HomePage />}
      />
      <Route
        exact path="/barChartsPage"
        element={<BarChartsPage />}
      />
      <Route
        exact path="/histogramsPage"
        element={<HistorgramsPage />}
      />
      <Route
        exact path="/scatterplotsPage"
        element={<ScatterplotsPage />}
      />
    </Routes>
  );
}

export default App;
