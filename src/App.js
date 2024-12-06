import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Modal from './components/Modal/Modal';
import ParticlesBg from 'particles-bg';
import Profile from './components/Profile/Profile';

const initialState = {
      input: '', // search form
      imageUrl: '', // image url
      boxes: [], // face boxes
      route: 'signin', // default route
      isSignedIn: false, // logged out
      isProfileOpen: false,
      status: '', // status messages
      errors: '', // error messages
      user: { // user details
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: '',
        pronouns: '',
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentDidMount() {
    const token = window.sessionStorage.getItem('token');
    if (token) {
      const API_URL = window.location.hostname === 'localhost'
        ? 'http://localhost:3001'
        : 'https://parkers-smartbrain-api.fly.dev';
      fetch(`${API_URL}/signin`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
      .then(resp => resp.json())
      .then(data => {
        if (data && data.id) {
          return fetch(`${API_URL}/profile/${data.id}`, {
            method: 'get',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            }
          })
          .then(resp => resp.json())
          .then(user => {
            if (user && user.email) {
              this.loadUser(user)
              this.onRouteChange('home')
            } else {
              console.error('User profile is invalid:', user);
              window.sessionStorage.removeItem('token'); // Clear invalid token
              this.onRouteChange('signin'); // Redirect to sign-in
            }
          })
        } else {
          console.error('Signin response invalid:', data);
          window.sessionStorage.removeItem('token'); // Clear invalid token
          this.onRouteChange('signin'); // Redirect to sign-in
        }
      })
      .catch(err => {
        console.error('Error during authentication:', err);
        window.sessionStorage.removeItem('token'); // Clear invalid token
        this.onRouteChange('signin'); // Redirect to sign-in
      });
    }
  }
// Logged in user details
  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
        pronouns: data.pronouns
  }})
  }

  // Face API bounding box
  calculateFaceLocation = (data) => {
    console.log('API response for face detection:', data);
      const image = document.getElementById('inputimage'); // get image dimension
      const width = Number(image.width); // image width
      const height = Number(image.height); // image height
      const boxData = data?.outputs[0]?.data?.regions;

      if (boxData) { // if boxData not empty
        this.setState({status: `${boxData.length} human face(s) detected`});
        return boxData.map(face => {
          const clarifaiFace = face.region_info.bounding_box;
          return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)
          }
        });
      } else { // if boxData empty
        this.setState({errors: (`No human face(s) detected, please try another image`)});
  }}

    // Display face boxes
  displayFaceBox = (boxes) => {
    if (boxes) {
      this.setState({boxes: boxes});
    }
  }

  // ImageLinkForm
 onInputChange = (event) => {
    this.setState({input: event.target.value}); // get value from form input
  }

  // reset all form values
  onSubmitReset = () => {
    this.setState({imageUrl: this.state.input});
    this.setState({input: ''}); // clear input form value after submit to avoid duplicate submit
    this.setState({boxes: []}); // reset box data
    this.setState({status: ''}); // reset status
    this.setState({errors: ''}); // reset errors
  }

   // Signout function
   onSignOut = () => {
    window.sessionStorage.removeItem('token');
    this.onSubmitReset(); // reset all values for image form
    this.onRouteChange('signin');
}

  onRegister = (userDetails) => {
    const API_URL = window.location.hostname === 'localhost'
      ? 'http://localhost:3001'
      : 'https://parkers-smartbrain-api.fly.dev';
    
    fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userDetails)
    })
    .then(response => response.json())
    .then(data => {
      if (data.token) {
        window.sessionStorage.setItem('token', data.token); // Store token
        this.loadUser(data.user); // Load user details
        this.onRouteChange('home'); // Redirect to home
      } else {
        this.setState({ errors: 'Registration failed. Please try again.' }); // Handle error
      }
    })
    .catch(err => this.setState({ errors: 'Something went wrong. Please try again.' }));
  };


// Submit Input Button - Activates API Response
onPictureSubmit = (event) => {
  event.preventDefault();

  // Reset only input-related state initially
  this.setState({
    imageUrl: this.state.input,
    errors: '',
    status: ''
  });

  // Validate input
  if (!this.state.input) {
    this.setState({ errors: 'Please paste an image link into the field to test' });
    return;
  }

  const API_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:3001'
    : 'https://parkers-smartbrain-api.fly.dev';

  // Call imageurl API
  fetch(`${API_URL}/imageurl`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': window.sessionStorage.getItem('token') || ''
    },
    body: JSON.stringify({ input: this.state.input })
  })
    .then(response => response.json())
    .then(response => {
      if (!response || !response.outputs || response.outputs.length === 0) {
        throw new Error('Invalid face detection response');
      }

      // Update the face boxes
      const boxes = this.calculateFaceLocation(response);
      this.displayFaceBox(boxes);

      // Update the entry count
      return fetch(`${API_URL}/image`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': window.sessionStorage.getItem('token') || ''
        },
        body: JSON.stringify({ id: this.state.user.id })
      });
    })
    .then(response => response.json())
    .then(entries => {
      // Update user entries
      this.setState(Object.assign(this.state.user, { entries: entries }));
    })
    .catch(error => {
      // Handle errors
      console.error('Error:', error);
      this.setState({
        errors: 'An error occurred while processing your request. Please try again.'
      });
    });
};



// Route change function
    onRouteChange = (route) => {
      if (route === 'signout') {
       window.sessionStorage.removeItem('token');
       return this.setState(initialState)
      } else if (route === 'home') {
        this.setState({isSignedIn: true})
      }
      this.setState({route: route});
    }

    toggleModal = () => {
      this.setState(prevState => ({
        ...prevState,
        isProfileOpen: !prevState.isProfileOpen
      }))
    }

    // App render
    render() {
      const { isSignedIn, imageUrl, route, boxes, isProfileOpen, user } = this.state;
      return (
        <div className="App">
          <ParticlesBg color="#118DFF" num={150} type="cobweb" bg={true} /> 
          <Navigation isSignedIn={isSignedIn} 
          onSignOut={this.onSignOut}
          onRouteChange={this.onRouteChange}
          toggleModal={this.toggleModal} />
           { isProfileOpen && 
          <Modal>
            <Profile
            user={user}
            isProfileOpen={isProfileOpen} 
            toggleModal={this.toggleModal}
            loadUser={this.loadUser}
            >
            </Profile>
          </Modal>
          }
          <Logo />
          { route === 'home' 
            ? <div>
              <Rank name={this.state.user.name}
              entries={this.state.user.entries}
              />
              <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onPictureSubmit={this.onPictureSubmit}
              input={this.state.input}
              status={this.state.status}
              errors={this.state.errors}
              name={this.state.user.name}
              entries={this.state.user.entries}
              />
              <FaceRecognition boxes={boxes} 
              imageUrl={imageUrl}
              loading={this.state.loading}
              errors={this.state.errors}
              />
              </div>
            : (
              route === 'signin' 
              ? <Signin loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
              />
              : <Register
              onRegister={this.onRegister}
              loadUser={this.loadUser} 
              onRouteChange={this.onRouteChange}
              />
          )}
        </div>
      );
    };
  }

  

export default App;
