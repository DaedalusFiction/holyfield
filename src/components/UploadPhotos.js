import React from 'react'
import useStorage from '../hooks/useStorage'
import { useState, useEffect } from 'react'


const UploadPhotos = () => {
    const [file, setFile] = useState(null);
    
    const changeHandler = () => {
        console.log("file changed")
    }

    return (
        <div className='container'>
            <h1>Upload Photos</h1>
            <input type="file" onChange={changeHandler}/>
        </div>
    )
}

export default UploadPhotos
