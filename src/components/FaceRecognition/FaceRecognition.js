import React from "react";
import './FaceRecognition.css';

// Face Recognition component -- maps detected faces using API data
const FaceRecognition = ({ imageUrl, boxes, errors }) => {
    return (
        <div className="facerec center ma">
            <img 
            id="inputimage" 
            src={imageUrl} 
            alt='' 
            className={`bg-white shadow-5 b--solid${errors ? 'red' : 'yellow'}`}
            />
            {boxes &&
            boxes.map(box =>
            <div key={`box${box.topRow}${box.rightCol}`} 
            className="bounding-box" 
            style={{
                top: box.topRow, 
                right: box.rightCol, 
                bottom: box.bottomRow, 
                left: box.leftCol
                }}
                ></div>
                )
            }
            </div>
     );
}

export default FaceRecognition;