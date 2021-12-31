import React from 'react'
import LoginButton from './LoginButton'


const Login = ({onClick, currentUser}) => {
    

    const getInfo = () => {
        console.log(currentUser);
    }

    return (
        <div className='login'>
            <div className="container">
                <h2>Log-in page</h2>
                <LoginButton onClick={onClick} />
                <button onClick={getInfo}>get info</button>
            </div>
        </div>
    )
}

export default Login
