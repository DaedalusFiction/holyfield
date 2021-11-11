
import './App.css';
import Header from './components/Header';
import PhotoMenu from './components/PhotoMenu';
import Slideshow from './components/Slideshow';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import PhotoPage from './components/PhotoPage';


function App() {
  
  return (
    <div className="App container">
      <Router>
        <Header header="Holyfield Farms" subtext="est. 1865"/>
        
        <Routes>
          <Route path="/farm" element={<PhotoPage page="farm" />} />
          <Route path="/family" element={<PhotoPage page="family" />} />
          <Route path="/animals" element={<PhotoPage page="animals" />} />
          <Route path="/projects" element={<PhotoPage page="projects" />} />
          <Route path="/holidays" element={<PhotoPage page="holidays" />} />
          <Route path="/misc" element={<PhotoPage page="misc" />} />
          <Route path="/" element={<PhotoMenu />} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
