import React from 'react'
import LoginButton from './LoginButton'


const Home = ({onClick, currentUser}) => {
    return (
        <div className='home'>
            <div className="container">
                <p>Welcome to Holyfield Farms! Located in beautiful Central Virginia, Holyfield farms is the greatest place on Earth!</p>
                <LoginButton onClick={onClick} />
            </div>
        </div>
    )
}

export default Home
