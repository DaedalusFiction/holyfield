import React from 'react'
import { useState } from 'react'
import { fileStorage, db } from '../firebase.js'
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { uploadBytes, ref, getDownloadURL } from '@firebase/storage'


const UploadForm = () => {
    const [file, setFile] = useState(null);
    const allowedTypes = ['image/png', 'image/jpeg']
    const [err, setErr] = useState('')
    const [url, setUrl] = useState('')

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


        uploadBytes(storageRef, file).then( async () => {
            const url = await getDownloadURL(storageRef);
            uploadDocumentInfo(file, url);
        })
    }

    const uploadDocumentInfo = async (file, docURL ) => {
        try {
            const docRef = await addDoc(collection(db, "photos"), {
                name: file.name,
                URL: docURL
            })
        } catch (e) {
            console.error('error writing to firestore db', e);
    }}

    
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
