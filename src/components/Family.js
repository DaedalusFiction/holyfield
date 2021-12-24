import React from 'react'
import PhotoGallery from './PhotoGallery'
import { storage } from '../firebase'

const Family = () => {
    return (
        <div className='container'>
            <h2>Family Photos</h2>
            <PhotoGallery page="family" />
        </div>
    )
}

export default Family
