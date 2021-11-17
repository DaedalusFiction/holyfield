import React from 'react'
import UploadForm from './UploadForm';
import { useState } from 'react';
import { getDownloadURL, ref } from "firebase/storage"
import { fileStorage } from '../firebase';
import ImageGrid from './ImageGrid';

const PhotoPage = ({page}) => {
    const [photos, setPhotos] = useState(null)
    

    const downloadPhoto = async () => {
        const testPhoto = await getDownloadURL(ref(fileStorage, 'Plato.jpg'))
            .then((url) => {
                const xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = (event) => {
                    const blob = xhr.response;
                };
                xhr.open('GET', url);
                xhr.send();
            });
            setPhotos(testPhoto);
    }
    
    return (
        <div>
            <h2>{page} page</h2>
            <ImageGrid />
            <UploadForm />
            <button onClick={downloadPhoto}>Download Photo</button>
        </div>
    )
}

export default PhotoPage
