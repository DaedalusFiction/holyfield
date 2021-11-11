import React from 'react'
import {
  Link
} from "react-router-dom";


const PhotoPageLink = ({value, page}) => {
    const myClass = value.toLowerCase();
    const targetPage = "/" + page;
    return (
        //TODO: make these into Links with react router DOM
        <Link to={targetPage} className="photo-link-card">
            <div className={"photo-link-card-photo " + myClass}></div>
            <p>{value}</p>
        </Link>
    )
}

export default PhotoPageLink
