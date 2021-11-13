import React from 'react'
import { useState } from 'react'
import {db, app, fileStorage, trialWrite, trialGet} from '../firebase.js'
import {useStorage} from '../hooks/useStorage.js'


const UploadForm = () => {
    const [file, setFile] = useState(null);
    const allowedTypes = ['image/png', 'image/jpeg']
    const [err, setErr] = useState('')

    const changeHandler = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && allowedTypes.includes(selectedFile.type)) {
            setFile(selectedFile);
            console.log('success')
            console.log(selectedFile.type)
            setErr(null)
        } else {
            setFile(null);
            setErr("Please select a png or jpeg file")
        }
        
    }

    const clickHandler = (e) => {
        console.log("clicked")
    }
    return (
        <div>
            <input type="file" onChange={changeHandler} />
            <button onClick={useStorage(file)}>Upload Picture </button>
            {err && <p>{err}</p>}
            {file && <p>{file.name}</p>}
        </div>
    )
}

export default UploadForm
