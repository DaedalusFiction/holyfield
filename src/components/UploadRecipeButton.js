import React from 'react'
import { uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage'
import { storage, db } from '../firebase'
import { doc, Timestamp, setDoc } from 'firebase/firestore'
import { useState } from 'react'



const UploadRecipeButton = ({recipePhoto, setRecipePhoto, setUploadProgress}) => {
    const categories = ["appetizer", "main", "dessert", "snack", "other"];
    
    const [checkedState, setCheckedState] = useState({
        appetizer: false,
        main: false,
        dessert: false,
        snack: false,
        other: false
    });
    const [comment, setComment] = useState("");
    const [title, setTitle] = useState("");
    const [uploadError, setUploadError] = useState(false);

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

    const updateTitle = (e) => {
        setTitle(e.target.value);
    }

    const updateComment = (e) => {
        setComment(e.target.value);
    }

    const handleClick = async (e) => {
        e.preventDefault();
        const storageRef = ref(storage, recipePhoto.name);
        console.log("file name: " + recipePhoto.name);
        const uploadTask = uploadBytesResumable(storageRef, recipePhoto);

        uploadTask.on('state_changed', 
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                 const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                 setUploadProgress(progress);
                 console.log(progress);
            }, 
            (error) => {
                setUploadError(true);
            }, 
            () => {
                // creates firestore database entry
                setRecipePhoto(null);
                setUploadProgress(0);
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        setDoc(doc(db, "recipes", recipePhoto.name), {
                        URL: downloadURL,
                        uploaded: Timestamp.fromDate(new Date(Date.now())),
                        title: title,
                        courses: checkedState,
                        comment: comment
                    });
                    });
                });
        
    }
    
    return (
        <div>
            <div className='flex categories-list'>
                <p>Please select at least one:</p>
                {categories.map((category) => {
                    return <label className='checkbox' key={category}>
                                <input type="checkbox" id={category} name={category} key={category} onChange={handleChange}/>
                                <span htmlFor={category}>{category}</span>
                            </label>
                })}
                <input type="text" onChange={updateTitle} placeholder='Enter Title (required)' required/>
                <textarea type="text" onChange={updateComment} placeholder='Enter Description (optional)'/>
            </div>
            <button className="upload-button" onClick={handleClick}>Upload Recipe</button>
            {uploadError && <p>There was an error uploading the photo</p>}
        </div>
    )
}

export default UploadRecipeButton
