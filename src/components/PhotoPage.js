import React from 'react'
import {Route} from 'react-router-dom';
import UploadForm from './UploadForm';

const PhotoPage = ({page}) => {
    return (
        <div>
            <h2>{page} page</h2>
            <UploadForm />
        </div>
    )
}

export default PhotoPage
