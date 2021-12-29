import React from 'react'
import { uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage'
import { storage, db } from '../firebase'
import { doc, Timestamp, setDoc } from 'firebase/firestore'
import { useState } from 'react'



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
    const [comment, setComment] = useState("");
    const [title, setTitle] = useState("")
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
        const storageRef = ref(storage, file.name);
        console.log("file name: " + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', 
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            }, 
            (error) => {
                console.log(error);
            }, 
            () => {
                // creates firestore database entry
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        setDoc(doc(db, "photos", file.name), {
                        URL: downloadURL,
                        uploaded: Timestamp.fromDate(new Date(Date.now())),
                        title: title,
                        categories: checkedState,
                        comment: comment
                    });
                    });
                });
        setFile(null);
    }
    
    return (
        <div>
            <div className='flex categories-list'>
                {categories.map((category) => {
                    return <label className='checkbox' key={category}>
                                <input type="checkbox" id={category} name={category} key={category} onChange={handleChange}/>
                                <span htmlFor={category}>{category}</span>
                            </label>
                })}
                <input type="text" onChange={updateTitle} placeholder='Enter Title (optional)' />
                <input type="text" onChange={updateComment} placeholder='Enter Description (optional)'/>
            </div>
            <button className="upload-button" onClick={handleClick}>Upload</button>
        </div>
    )
}

export default UploadPhotoButton
