import React from 'react'


const LogoutButton = ({ logout }) => {
    
    return (
        <div>
            <button onClick={logout}>Log Out</button>
        </div>
    )
}

export default LogoutButton
