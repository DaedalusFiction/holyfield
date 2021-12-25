
import './App.css';

import underline from './underline.png';
import pattern1 from './pattern2.jpg';
import Home from './components/Home'
import Family from './components/Family';
import Farm from './components/Farm';
import Holidays from './components/Holidays';
import Projects from './components/Projects';
import Food from './components/Food';
import Misc from './components/Misc';
import UploadPhotos from './components/UploadPhotos';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


function App() {
  // const photoCollection = collection(db, 'photos');
  // const getPhotos = async () => {
  //   const photosSnapshot = await getDocs(photoCollection);
  //   const photos = photosSnapshot.docs.map(doc => doc.data());
  //   console.log(photos)
  //   return photos;
  // }

  return (
    <div className="App">
      <Router>
      <div className='hero'>
        <div className="title-wrapper">
          <img className='underline underline-inverted' src={underline} alt="decorative overline" />
          <Link to="/" className='title-first'>HOLYFIELD</Link>
          <Link to="/" className='title-second'>farms</Link>
          <img className='underline' src={underline} alt="decorative underline" />
        </div>
      </div>
      <div className='page-menu container'>
            <Link to="/family">Family</Link>
            <Link to="/farm">Farm</Link>
            <Link to="/holidays">Holidays</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/food">Food</Link>
            <Link to="/misc">Misc</Link>
            <Link to="/upload">Upload</Link>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/family" element={<Family />} />
          <Route path="/farm" element={<Farm />} />
          <Route path="/holidays" element={<Holidays />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/food" element={<Food />} />
          <Route path="/misc" element={<Misc />} />
          <Route path="/upload" element={<UploadPhotos />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
