import React from 'react'
import PhotoGallery from './PhotoGallery'

const Holidays = ({largePhoto, setLargePhoto}) => {
    return (
        <div>
            <PhotoGallery page="holidays" largePhoto={largePhoto} setLargePhoto={setLargePhoto} />
        </div>
    )
}

export default Holidays
