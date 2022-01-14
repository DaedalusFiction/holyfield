import React from 'react'
import PhotoGallery from './PhotoGallery'

const Family = ({largePhoto, setLargePhoto}) => {
    return (
        <div>
            <PhotoGallery page="family" largePhoto={largePhoto} setLargePhoto={setLargePhoto}/>
        </div>
    )
}

export default Family
