import React from 'react'
import { uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage'
import { storage } from '../firebase'
import { db } from '../firebase'
import { addDoc} from 'firebase/firestore'
import { collection } from 'firebase/firestore'
import { useState } from 'react'



const UploadPhotoButton = ({file, setFile}) => {
    const categories = ["family", "home", "projects"];
    const [checkedState, setCheckedState] = useState(
        new Array(categories.length).fill(false)
        );
    
    const handleChange = (position) => {
        const newCheckedState = checkedState.map((item, index) => 
            position === index ? !item : item
            );
        setCheckedState(newCheckedState);
    }

    const handleClick = async (e) => {
        e.preventDefault();
        const storageRef = ref(storage, file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        getDownloadURL(uploadTask.snapshot.ref)
        .then((downloadURL) => {
            console.log('File available at', downloadURL);
            addDoc(collection(db, "food"), {
            URL: downloadURL,
            family: false,
            food: true,
            stateArray: checkedState
          });
        });
        
          
          
        setFile(null);

    }
    
    return (
        <div>
            {categories.map((category) => {
                return <div>
                            <input type="checkbox" id={category} name={category} key={category} onChange={handleChange}/>
                            <label htmlFor={category}>{category}</label>
                        </div>
            })}
            <button onClick={handleClick}>upload</button>
        </div>
    )
}

export default UploadPhotoButton
