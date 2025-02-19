import React from "react";
import './Navigation.css';
import ProfileIcon from "../Profile/ProfileIcon";

// Navigation component - displays sign out if signed in, register and sign in if logged out
const Navigation = ({ onRouteChange, isSignedIn, toggleModal, profilePic, handleProfilePicUpdate }) => {
        if(isSignedIn) {
        return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <ProfileIcon onRouteChange={onRouteChange} toggleModal={toggleModal} profilePic={profilePic} handleProfilePicUpdate={handleProfilePicUpdate}/>
        </nav>
        );
        } else {
         return (
            <nav className="nav-buttons">
            <button onClick={() => onRouteChange('signin')} className='rounded b input-reset white grow pointer f5 dib signin'>Sign In</button>
            <button onClick={() => onRouteChange('register')} className='rounded b input-reset white grow pointer f5 dib signin'>Register</button>
            </nav>
         );
        }
}

export default Navigation;