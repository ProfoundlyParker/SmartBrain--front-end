import React from "react";
import './FaceRecognition.css';

// Face Recognition component -- maps detected faces using API data
const FaceRecognition = ({ imageUrl, boxes, errors }) => {
    return (
      <div className="facerec center ma">
        <div className="image-container">
          <img 
            id="inputimage" 
            src={imageUrl} 
            alt='' 
            className={`bg-white shadow-5 ${errors ? 'b--red' : 'b--yellow'}`}
          />
          {boxes &&
            boxes.map((box, i) => (
              <div
                key={`box${i}`}
                className="bounding-box"
                style={{
                  top: `${box.topRow}px`,
                  right: `${box.rightCol}px`,
                  bottom: `${box.bottomRow}px`,
                  left: `${box.leftCol}px`
                }}
              />
            ))}
        </div>
      </div>
    );
  };  

export default FaceRecognition;