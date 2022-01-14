import React from 'react'
import PhotoGallery from './PhotoGallery'

const Projects = ({largePhoto, setLargePhoto, }) => {
    return (
        <div>
            <PhotoGallery page="projects" largePhoto={largePhoto} setLargePhoto={setLargePhoto}/>
        </div>
    )
}

export default Projects
