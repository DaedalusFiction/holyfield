
import './App.css';

import underline from './underline.png';
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
import { useState } from 'react';
import { auth, provider } from './firebase'
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth'


function App() {
  const [currentUser, setCurrentUser] = useState(auth.currentUser);

    const login = () => {
        console.log("attempting login");
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                console.log(token);
                // The signed-in user info.
                const user = result.user;
                setCurrentUser(user);
                console.log(user);
                // ...
            }).catch((error) => {
                // Handle Errors here.
                // const errorCode = error.code;
                // const errorMessage = error.message;
                // The email of the user's account used.
                // const email = error.email;
                // The AuthCredential type that was used.
                // const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    };

    const logout = (e) => {
      e.preventDefault();
      signOut(auth).then(() => {
        setCurrentUser(null);
        console.log("signed out")
      }).catch((error) => {
        console.log("error signing out")
      });
    }

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // const newUid = user.uid;
        setCurrentUser(user);
        console.log(user);

        // ...
      } else {
        // User is signed out
        // ...
      }
    });

  return (
    <div className="App">
      <Router>
      <div className='hero' id="hero">
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
          <Route path="/upload" element={<UploadPhotos currentUser={currentUser} login={login} logout={logout}/>} />
        </Routes>
      </Router>
      <div className="footer flex">
        <p>2021 Holyfield Farms. All rights reserved.</p>
        <a href="#hero">Back to Top</a>
      </div>
    </div>
  );
}

export default App;
