import React from 'react'
import PhotoGallery from './PhotoGallery'

const Farm = ({largePhoto, setLargePhoto}) => {
    return (
        <div>
           <PhotoGallery page="farm" largePhoto={largePhoto} setLargePhoto={setLargePhoto}/>
        </div>
    )
}

export default Farm