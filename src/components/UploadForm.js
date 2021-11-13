import React from 'react'
import { useState } from 'react'
import { fileStorage } from '../firebase.js'

import { uploadBytes, ref } from '@firebase/storage'


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

    const uploadFile = () => {
        const storageRef = ref(fileStorage, file.name);


        uploadBytes(storageRef, file).then((snapshot) => {
            console.log('successfully uploaded')
        })
    }

    
    return (
        <div>
            <input type="file" onChange={changeHandler} />
            <button onClick={uploadFile}>Upload Picture</button>
            {err && <p>{err}</p>}
            {file && <p>{file.name}</p>}
        </div>
    )
}

export default UploadForm
