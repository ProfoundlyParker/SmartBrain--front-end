import React from "react";
import "./ImageLinkForm.css"

// Input Form -- Displays entry form and detection button, as well as error messages, if applicable
const ImageLinkForm = ({ input, onInputChange, onPictureSubmit, errors, status }) => {
    return (
        <div>
        <p className="f3">
            {'This Magic Brain will detect faces in your pictures! Paste an image link below to find faces in your images!'}
        </p>
        <div className="center">
        <div className="form pa3 shadow-5 ba bw0 b--black center">
            <input 
            id="imageupload"
            className={`f4 pa2 input-reset ba bg-white hover-bg-near-white hover-black${errors && 'ba bw2 b--red'}`}
            type="search"
            placeholder="Paste image link here" 
            onChange={onInputChange}
            value={input}
            />
            <button 
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
            onClick={onPictureSubmit}>Detect</button>
            </div>
            { errors && <p className="error bg-red white pa2 f4 shadow-1 1h-copy center tc ma4">{`${errors}`}</p>}
            { status && <p className="status bg-blue black pa2 f4 shadow-1 1h-copy center tc ma4">{`${status}`}</p>}
        </div>
        </div>
    );
}

export default ImageLinkForm;