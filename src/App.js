import LeftBar from "./LeftBar";
import RightBar from "./RightBar";
import "./assets/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="puthu-words">
      <LeftBar/>
      <Router>
        <Routes>
          <Route path="/" element={<RightBar/>}/>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
