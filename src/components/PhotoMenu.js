import React from 'react'
import PhotoPageLink from './PhotoPageLink'


const PhotoMenu = () => {
    return (
        <div className="photo-menu">
            <h2>Photo Menu</h2>
            <div className="grid grid-3">
                <PhotoPageLink page="farm" value="The Farm" />
                <PhotoPageLink page="family" value="Family" />
                <PhotoPageLink page="animals" value="Animals" />
                <PhotoPageLink page="projects" value="Projects"  />
                <PhotoPageLink page="holidays" value="Holidays" />
                <PhotoPageLink page="misc" value="Misc" />
            </div>
        </div>
    )
}

export default PhotoMenu
