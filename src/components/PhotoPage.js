import React from 'react'
import UploadForm from './UploadForm';
import { useState } from 'react';
import { getStorage, ref } from "firebase/storage"

const PhotoPage = ({page}) => {
    const [photos, setPhotos] = useState([1, 2])

    return (
        <div>
            <h2>{page} page</h2>
            <div className="grid grid-3">
                { photos.map(photo => (
                    <p>{photo}</p>
                ))}
            </div>
            <UploadForm />
        </div>
    )
}

export default PhotoPage
