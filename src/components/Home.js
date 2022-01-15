import React from 'react'
import LoginButton from './LoginButton'


const Home = ({onClick, loginError}) => {
    return (
        <div className='home'>
            <div className="container">
                <p>Welcome to Holyfield Farms! Located in beautiful Central Virginia, Holyfield farms is the greatest place on Earth!</p>
                <LoginButton onClick={onClick} />
                {loginError && <p>There was an error loggin in</p>}
            </div>
        </div>
    )
}

export default Home
