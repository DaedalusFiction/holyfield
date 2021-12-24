import React from 'react'
import { useState } from 'react'
import UploadPhotoButton from './UploadPhotoButton';
import underline from '../underline.png'


const UploadPhotos = () => {
    const [file, setFile] = useState(null);
    
    const changeHandler = (e) => {
        const selected = e.target.files[0];
        setFile(selected);
    }

    return (
        <div className="container">
            <form className='file-input-form'>
                <h1>Upload Files</h1>
                <img src={underline} className='underline' alt="decorative underline" />
                <div className='file-input-button'><label htmlFor='file-input' >Select File to Upload</label></div>
                <input type="file" id='file-input' className='file-input' onChange={changeHandler}/>
                {file && <p>{file.name}</p>}
                {file && <UploadPhotoButton file={file} setFile={setFile} />}
            </form>
        </div>
    )
}

export default UploadPhotos
