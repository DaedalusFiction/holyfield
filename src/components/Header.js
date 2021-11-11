import React from 'react'
import {Link} from 'react-router-dom'

const Header = ({ header, subtext }) => {
    return (
        <div className="flex flex-vertical header">
            <Link to="/">
                <h1>{header}</h1>
            </Link>
            <p>{subtext}</p>
        </div>
    )
}

export default Header
