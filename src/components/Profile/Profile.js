import React from "react";
import './Profile.css';

const Profile = ({ isProfileOpen, toggleModal, user }) => {
    return ( 
    <div className="profile-modal">
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
            <main className="pa4 black-80 w-80">
            <img
                    src="https://plus.unsplash.com/premium_photo-1664299466090-8b508c9a7fe6?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmxhY2slMjBwdXBweXxlbnwwfHwwfHx8MA%3D%3D"
                    class="h3 w3 dib" alt="avatar" />
            <h1>{user.name}</h1>
            <h4>{`Images Submitted: ${user.entries}`}</h4>
            <p>{`Member since: ${new Date(user.joined).toLocaleDateString()}`}</p>
            <hr />
            <label className="mt2 fw6" 
            htmlFor="user-name">Name: </label>
            <input className="pa2 ba w-100"
            placeholder={user.name}
            type="text" 
            name="user-name"  
            id="name" 
            />
            <label className="mt2 fw6" 
            htmlFor="user-name">Age: </label>
            <input className="pa2 ba w-100"
            placeholder={user.age}
            type="text" 
            name="user-age"  
            id="age" 
            />
            <label className="mt2 fw6" 
            htmlFor="user-name">Sibling: </label>
            <input className="pa2 ba w-100"
            placeholder={user.pet}
            type="text" 
            name="user-pet"  
            id="pet" 
            />
            <div className="mt4" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <button className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20">
                    Save
                </button>
                <button 
                className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20"
                onClick={toggleModal}>
                    Cancel
                </button>
            </div>
            </main>
            <div className="modal-close" onClick={toggleModal}>
            &times;
            </div>
            </article>
    </div>
    )
};

export default Profile;