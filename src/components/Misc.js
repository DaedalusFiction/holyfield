import React from 'react'
import PhotoGallery from './PhotoGallery'

const Misc = ({largePhoto, setLargePhoto}) => {
    return (
        <div>
            <PhotoGallery page="misc" largePhoto={largePhoto} setLargePhoto={setLargePhoto}/>
        </div>
    )
}

export default Misc
