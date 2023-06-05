import React from "react";

// Navigation component - displays sign out if signed in, register and sign in if logged out
const Navigation = ({ onRouteChange, isSignedIn, onSignOut }) => {
        if(isSignedIn) {
        return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p onClick={onSignOut} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
        </nav>
        );
        } else {
         return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign In</p>
            <p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
            </nav>
         );
        }
}

export default Navigation;