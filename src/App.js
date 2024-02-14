import BarChartAndHistogramPage from 'pages/barChartAndHistogramPage';
import { Route, Routes } from "react-router-dom";
import './App.css';
import BarChartsPage from './pages/barChartsPage';
import HistorgramsPage from './pages/histogramsPage';
import HomePage from './pages/homePage';
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
        exact path="/barChartAndHistogramPage"
        element={<BarChartAndHistogramPage />}
      />
      <Route
        exact path="/scatterplotsPage"
        element={<ScatterplotsPage />}
      />
    </Routes>
  );
}

export default App;
