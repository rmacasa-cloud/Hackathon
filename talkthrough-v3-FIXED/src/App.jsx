import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BehavioralInterview from './pages/BehavioralInterview';
import TechnicalInterview from './pages/TechnicalInterview';
import Results from './pages/Results';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/interview/behavioral" element={<BehavioralInterview />} />
        <Route path="/interview/technical" element={<TechnicalInterview />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;
