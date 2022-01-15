
import './App.css';

import underline from './underline.png';
import Home from './components/Home'
import Family from './components/Family';
import Farm from './components/Farm';
import Holidays from './components/Holidays';
import Projects from './components/Projects';
import Food from './components/Food';
import Recipes from './components/Recipes';
import Misc from './components/Misc';
import UploadPhotos from './components/UploadPhotos';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { useState, useEffect, useCallback } from 'react';
import { auth, provider } from './firebase'
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth'
import { db } from './firebase';
import { setDoc, doc, getDoc } from 'firebase/firestore';

function App() {
  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  const [largePhoto, setLargePhoto] = useState(null);
  const [loginError, setLoginError] = useState(false);

  const resetGallery = useCallback(() => {
    if (largePhoto != null) {
          setLargePhoto(null)}
        }, [largePhoto])

    const login = () => {
        signInWithPopup(auth, provider)
            .then(async (result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                GoogleAuthProvider.credentialFromResult(result);
                // const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                setCurrentUser(user);
                const userRef = doc(db, "users", result.user.uid);
                const userRefSnap = await getDoc(userRef);
                if (!userRefSnap.exists()) {
                  //creates new user info in firestore database
                  //admin must be set to true in database to allow uploading of recipes and photos
                  setDoc(doc(db, "users", result.user.uid), {
                    UID: result.user.uid,
                    name: user.displayName,
                    admin: false
                  });
                }



                // ...
            }).catch((error) => {
                setLoginError(true);
            });
    };

    //TODO: logging out currently doesn't work as I think cached data automatically logs user back in

    // const logout = (e) => {
    //   e.preventDefault();
    //   signOut(auth).then(() => {
    //     setCurrentUser(null);
    //   }).catch((error) => {
    //     console.log("error signing out");
    //     console.log(error);
    //   });
    // }

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } 
    });

    useEffect(() => {
      function initiate() {
        //adds listener so that enlarged photos will reset on scroll
        window.addEventListener("scroll", resetGallery);
      }
      initiate();
      return function cleanup() {window.removeEventListener("scroll", resetGallery)}
      
    }, [resetGallery]);

    

  return (
    <div className="App" onClick={resetGallery} onScroll={resetGallery}>
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
            <Link to="/recipes">Recipes</Link>
            <Link to="/upload">Upload</Link>
        </div>
        <Routes>
          <Route path="/" element={<Home largePhoto={largePhoto} currentUser={currentUser} onClick={login} loginError={loginError} setLoginError={setLoginError} setLargePhoto={setLargePhoto}/>} />
          <Route path="/family" element={<Family largePhoto={largePhoto} setLargePhoto={setLargePhoto}/>} />
          <Route path="/farm" element={<Farm largePhoto={largePhoto} setLargePhoto={setLargePhoto}/>} />
          <Route path="/holidays" element={<Holidays largePhoto={largePhoto} setLargePhoto={setLargePhoto}/>} />
          <Route path="/projects" element={<Projects largePhoto={largePhoto} setLargePhoto={setLargePhoto}/>} />
          <Route path="/food" element={<Food largePhoto={largePhoto} setLargePhoto={setLargePhoto}/>} />
          <Route path="/misc" element={<Misc largePhoto={largePhoto} setLargePhoto={setLargePhoto}/>} />
          <Route path="/recipes" element={<Recipes largePhoto={largePhoto} setLargePhoto={setLargePhoto} />} />
          <Route path="/upload" element={<UploadPhotos currentUser={currentUser} login={login} loginError={loginError} setLoginError={setLoginError} />} />
        </Routes>
      </Router>
      <div className="footer flex">
        {currentUser ? <p>Logged in as {currentUser.displayName}</p> : <p>Logged out</p>}
        <a href="#hero">Back to Top</a>
      </div>
    </div>
  );
}

export default App;
