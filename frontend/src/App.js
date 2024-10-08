import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/Home/Home";
import RouteTests from "./components/routetests/RouteTests";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/routes" element={<RouteTests />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
