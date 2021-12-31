import React from 'react'
import { useState } from 'react'
import UploadPhotoButton from './UploadPhotoButton';
import underline from '../underline.png'
import LoginButton from './LoginButton';



const UploadPhotos = ( currentUser, login, logout ) => {
    const [file, setFile] = useState(null);
    const [fileTypeError, setFileTypeError] = useState(false);
    const acceptedTypes = ["image/png", "image/jpeg"];
    
    const changeHandler = (e) => {
        if (e.target.files[0] == null) {return}
        const selected = e.target.files[0];
        console.log(acceptedTypes.includes(selected.type));
        if (acceptedTypes.includes(selected.type)) {
            setFileTypeError(false);
            setFile(selected);
        } else {
            setFileTypeError(true);
            setFile(null);
        }
    }

    return (
        <div className="container">
            <form className='file-input-form'>
                <h1>Upload Files</h1>
                <img src={underline} className='underline' alt="decorative underline" />
                {!currentUser && <LoginButton login={login}/>}
                {currentUser && <label htmlFor='file-input' className='file-input-button'>Select File</label>}
                <input type="file" id='file-input' className='file-input' accept="image/png, image/jpeg" onChange={changeHandler}/>
                {file && <p>{file.name}</p>}
                {file && <UploadPhotoButton file={file} setFile={setFile} />}
                {fileTypeError && <p>Please select a .jpeg or .png file</p>}
            </form>
        </div>
    )
}

export default UploadPhotos
