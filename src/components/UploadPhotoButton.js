import React from 'react'
import { uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage'
import { storage } from '../firebase'
import { db } from '../firebase'
import { addDoc} from 'firebase/firestore'
import { collection } from 'firebase/firestore'
import { useState } from 'react'
import { useEffect } from 'react/cjs/react.development'



const UploadPhotoButton = ({file, setFile}) => {
    const categories = ["family", "farm", "holidays", "projects", "food", "misc"];
    const [checkedState, setCheckedState] = useState({
        family: false,
        farm: false,
        holidays: false,
        projects: false,
        food: false,
        misc: false
    });
    
    const handleChange = (e) => {
        //updates checkedState when checkboxes are checked
        let newCheckedState = checkedState;
        for (const property in checkedState) {
            if (e.target.id === property) {
                newCheckedState[property] = !checkedState[property];
            } else {
                newCheckedState[property] = checkedState[property];
            }
        }
        
        setCheckedState(newCheckedState);
        
    }

    const handleClick = async (e) => {
        e.preventDefault();
        const storageRef = ref(storage, file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', 
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
                }
            }, 
            (error) => {
                console.log(error);
            }, 
            () => {
                // creates firestore database entry
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        addDoc(collection(db, "photos"), {
                        URL: downloadURL,
                        categories: checkedState
                    });
                    });
                });

        
        
          
          
        setFile(null);

    }
    
    return (
        <div>
            <ul>
                {categories.map((category) => {
                    return <li key={category}>
                                <input type="checkbox" id={category} name={category} key={category} onChange={handleChange}/>
                                <label htmlFor={category}>{category}</label>
                            </li>
                })}
            </ul>
            <button onClick={handleClick}>upload</button>
        </div>
    )
}

export default UploadPhotoButton
