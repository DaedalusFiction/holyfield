import React from 'react'
import { useState } from 'react'
import UploadPhotoButton from './UploadPhotoButton';
import UploadRecipeButton from './UploadRecipeButton';
import underline from '../underline.png'
import LoginButton from './LoginButton';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';





const UploadPhotos = ( currentUser, login, loginError ) => {
    const [file, setFile] = useState(null);
    const [recipePhoto, setRecipePhoto] = useState(null);
    const [fileTypeError, setFileTypeError] = useState(false);
    const [fileExistsError, setFileExistsError] = useState(false);
    const acceptedTypes = ["image/png", "image/jpeg"];
    const [uploadProgress, setUploadProgress] = useState(0);
    
    const changeHandler = async (e) => {
        if (e.target.files[0] == null) {return}
        const selected = e.target.files[0];
        const folder = e.target.id === "file-input" ? "photos" : "recipes";
        const otherFolder = e.target.id === "file-input" ? "recipes" : "photos";
        
        const fileRef = doc(db, folder, selected.name);
        const otherFileRef = doc(db, otherFolder, selected.name);
        const docSnap = await getDoc(fileRef);
        const otherDocSnap = await getDoc(otherFileRef);
        
        //check if photo already exists in either photos or recipes databasees
        if (docSnap.exists() || otherDocSnap.exists()) {
            setFile(null);
            setRecipePhoto(null);
            setFileExistsError(true);
        } else if (!acceptedTypes.includes(selected.type)) {
            setFileTypeError(true);
        } else if (folder === "photos") {
            setFile(selected);
            setFileExistsError(false);
            setFileTypeError(false);
        } else {
            setRecipePhoto(selected);
            setFileExistsError(false);
            setFileTypeError(false);
        }
    }

    
    //will show only appropriate form depending on which upload button (photo or recipe) is selected
    return (
        <div className="container">
            <form className='file-input-form'>
                <h1>Upload Files</h1>
                <img src={underline} className='underline' alt="decorative underline" />
                {!currentUser && <LoginButton login={login}/>}
                {loginError && <p>There was an error logging in</p>}
                <div>
                    {!recipePhoto && <div className="photo-upload-form">
                        {currentUser && <label htmlFor='file-input' className='file-input-button'>Select Photo</label>}
                        <input type="file" id='file-input' className='file-input' accept="image/png, image/jpeg" onChange={changeHandler}/>
                        {file && <p>{file.name}</p>}
                        {file && <UploadPhotoButton file={file} setFile={setFile} setUploadProgress={setUploadProgress} />}
                        
                    </div>}
                    {!file && <div className="recipe-upload-form">
                        {currentUser && <label htmlFor='recipe-input' className='file-input-button'>Select Recipe</label>}
                        <input type="file" id='recipe-input' className='file-input' accept="image/png, image/jpeg" onChange={changeHandler}/>
                        {recipePhoto && <p>{recipePhoto.name}</p>}
                        {recipePhoto && <UploadRecipeButton recipePhoto={recipePhoto} setRecipePhoto={setRecipePhoto} setUploadProgress={setUploadProgress}/>}
                        
                    </div>}
                    
                    {fileTypeError && <p>Please select a .jpeg or .png file</p>}
                    {fileExistsError && <p>A file with that name already exists</p>}
                    {uploadProgress > 0 && <p>Upload Progress: {uploadProgress.toFixed(2)}%</p>}
                </div>
            </form>
        </div>
    )
}

export default UploadPhotos
