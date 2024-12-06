import React from "react";
import Tilt from 'react-parallax-tilt';
import './Logo.css'
import brain from './brain.png'

// Logo component
const Logo = () => {
    return (
        <div className='ma4' style={{ position: 'relative', top: '-100px' }}>
            <Tilt className='Tilt br2 shadow-2' style={{ height: '150px', width: '150px', backgroundColor: 'blue' }}>
            <div className='Tilt-inner pa3' options={{ max: 55 }}>
                <img style={{ paddingTop: '5px' }} src={brain} alt='logo'/>
            </div>
            </Tilt>
        </div>
    );
}

export default Logo;