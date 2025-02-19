import React from "react";
import './Profile.css';

const API_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:8080'
    : 'https://parkers-smartbrain-api.fly.dev';
// Displays profile information where user can update name, email, and pronouns
class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.user.name,
            email: this.props.user.email,
            pronouns: this.props.user.pronouns,
        }
        this.fileInputRef = React.createRef();
    }

    componentDidMount() {
        const API_URL = window.location.hostname === 'localhost'
        ? 'http://localhost:8080'
        : 'https://parkers-smartbrain-api.fly.dev';
        fetch(`${API_URL}/get-user-profile?userId=${this.props.userId}`)
            .then(response => response.json())
            .then(data => {
                if (data.profilePicUrl) {
                    this.setState({ profilePic: data.profilePicUrl });
                }
            })
            .catch(err => console.error("Error fetching profile picture:", err));
    }

    handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
    
        try {
          // Request a pre-signed URL from the backend
          const API_URL = window.location.hostname === 'localhost'
            ? 'http://localhost:8080'
            : 'https://parkers-smartbrain-api.fly.dev';
          const response = await fetch(
            `${API_URL}/get-upload-url?fileName=${encodeURIComponent(file.name)}&fileType=${file.type}`
          );
          const data = await response.json();
    
          // Upload the file to S3 using the pre-signed URL
          await fetch(data.url, {
            method: "PUT",
            body: file,
            headers: { "Content-Type": file.type },
        });
    
          // Update the profile picture state with the public S3 URL
          const s3Url = data.url.split("?")[0]; // Extract public S3 URL

          const userId = this.props.userId;
          await fetch(`${API_URL}/update-profile-pic`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, profilePicUrl: s3Url }),
        });

          this.setState({ profilePic: s3Url });
          this.props.handleProfilePicUpdate(s3Url);
        } catch (err) {
          console.error("Error uploading file:", err);
        }
      };

      triggerFileInput = () => {
        if (this.fileInputRef.current) {
            this.fileInputRef.current.click();
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
        fetch(`${API_URL}/profile/${this.props.user.id}`, {
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
                    <div className="profile-picture-wrapper" onClick={this.triggerFileInput}>
                    <img
                            src={this.state.profilePic || 'https://plus.unsplash.com/premium_photo-1664299466090-8b508c9a7fe6?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmxhY2slMjBwdXBweXxlbnwwfHwwfHx8MA%3D%3D'}
                            class="rounded h3 w3 dib" alt="avatar" />
                         <div className="edit-icon">
                         <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0,0,256,256">
                            <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none"><g transform="scale(8.53333,8.53333)"><path d="M22.82813,3c-0.51175,0 -1.02356,0.19544 -1.41406,0.58594l-2.41406,2.41406l5,5l2.41406,-2.41406c0.781,-0.781 0.781,-2.04713 0,-2.82812l-2.17187,-2.17187c-0.3905,-0.3905 -0.90231,-0.58594 -1.41406,-0.58594zM17,8l-11.74023,11.74023c0,0 0.91777,-0.08223 1.25977,0.25977c0.342,0.342 0.06047,2.58 0.48047,3c0.42,0.42 2.64389,0.12436 2.96289,0.44336c0.319,0.319 0.29688,1.29688 0.29688,1.29688l11.74023,-11.74023zM4,23l-0.94336,2.67188c-0.03709,0.10544 -0.05623,0.21635 -0.05664,0.32813c0,0.55228 0.44772,1 1,1c0.11177,-0.00041 0.22268,-0.01956 0.32813,-0.05664c0.00326,-0.00128 0.00652,-0.00259 0.00977,-0.00391l0.02539,-0.00781c0.00196,-0.0013 0.00391,-0.0026 0.00586,-0.00391l2.63086,-0.92773l-1.5,-1.5z"></path></g></g>
                        </svg>
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={this.handleFileChange}
                            style={{ display: "none" }}
                            ref={this.fileInputRef} 
                        />
                    </div>
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