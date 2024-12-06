import React from "react";
import './Profile.css';

// Displays profile information where user can update name, email, and pronouns
class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.user.name,
            email: this.props.user.email,
            pronouns: this.props.user.pronouns
        }
    }

    onFormChange = (event) => {
        switch(event.target.name) {
            case 'user-name': 
                this.setState({name: event.target.value})
                break;
            case 'user-email':
                this.setState({email: event.target.value})
                break;
            case 'user-pronouns':
                this.setState({pronouns: event.target.value})
                break;
            default:
                return;
        }
    }

    onProfileUpdate = (data) => {
        fetch(`http://localhost:3001/profile/${this.props.user.id}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': window.sessionStorage.getItem('token')
              },
            body: JSON.stringify({ formInput: data })
        }).then(resp => {
            if (resp.status === 200 || resp.status === 304) {
                this.props.toggleModal();
                this.props.loadUser({ ...this.props.user, ...data })
            }
        }).catch(console.log('did not work'))
    }

    render() {
        const { user } = this.props;
        const { name, email, pronouns } = this.state;
        return ( 
            <div className="profile-modal">
                <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
                    <main className="pa4 black-80 w-80">
                    <img
                            src="https://plus.unsplash.com/premium_photo-1664299466090-8b508c9a7fe6?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmxhY2slMjBwdXBweXxlbnwwfHwwfHx8MA%3D%3D"
                            class="rounded h3 w3 dib" alt="avatar" />
                    <h1>{this.state.name}</h1>
                    <h4>{`Images Submitted: ${user.entries}`}</h4>
                    <p>{`Member since: ${new Date(user.joined).toLocaleDateString()}`}</p>
                    <hr />
                    <label className="mt2 fw6" 
                    htmlFor="user-name">Name: </label>
                    <input 
                    onChange={this.onFormChange}
                    className="rounded pa2 ba w-100"
                    placeholder={user.name}
                    type="text" 
                    name="user-name"  
                    id="name" 
                    />
                    <label className="mt2 fw6" 
                    htmlFor="user-name">Email: </label>
                    <input 
                    onChange={this.onFormChange}
                    className="rounded pa2 ba w-100"
                    placeholder={user.email}
                    type="text" 
                    name="user-email"  
                    id="email" 
                    />
                    <label className="mt2 fw6" 
                    htmlFor="user-name">Pronouns: </label>
                    <input 
                    onChange={this.onFormChange}
                    className="rounded pa2 ba w-100"
                    placeholder={user.pronouns}
                    type="text" 
                    name="user-pronouns"  
                    id="pronouns" 
                    />
                    <div className="mt4" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <button 
                        onClick={() => this.onProfileUpdate({ name, email, pronouns })}
                        className="rounded b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20">
                            Save
                        </button>
                        <button 
                        className="rounded b pa2 grow pointer hover-white w-40 bg-light-red b--black-20"
                        onClick={this.props.toggleModal}>
                            Cancel
                        </button>
                    </div>
                    </main>
                    <div className="modal-close" onClick={this.props.toggleModal}>
                    &times;
                    </div>
                    </article>
            </div>
            )
    }
};

export default Profile;