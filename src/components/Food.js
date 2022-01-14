import React from 'react'
import PhotoGallery from './PhotoGallery'

const Food = ({largePhoto, setLargePhoto}) => {
    return (
        <div>
          <PhotoGallery page="food" largePhoto={largePhoto} setLargePhoto={setLargePhoto}/>
        </div>
    )
}

export default Food
