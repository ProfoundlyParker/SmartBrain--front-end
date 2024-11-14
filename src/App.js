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
      route: 'signin', // default route !!CHANGE BACK TO signin
      isSignedIn: false, // logged out !!CHANGE BACK TO false
      isProfileOpen: false,
      status: '', // status messages
      errors: '', // error messages
      user: { // user details
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: '',
        pet: '',
        age: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }
// Logged in user details
  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
  }})
  }

  // Face API bounding box
  calculateFaceLocation = (data) => {
    const image = document.getElementById('inputimage'); // get image dimension
    const width = Number(image.width); // image width
    const height = Number(image.height); // image height
    const boxData = data.outputs[0].data.regions

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
    }
    }

    // Display face boxes
  displayFaceBox = (boxes) => {
    this.setState({boxes: boxes});
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
    this.onSubmitReset(); // reset all values for image form
    this.onRouteChange('signin');
}

// Submit Input Button - Activates API Response
  onPictureSubmit = (event) => {
    event.preventDefault(event);
    this.onSubmitReset(); // call function to reset all form values
    this.setState({ imageUrl: this.state.input });

      if (this.state.input.length === 0) {
        this.setState({errors: 'Please paste an image link into the field to test'});
      } else {
          fetch('https://parkers-smartbrain-api.fly.dev/imageurl', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                  input: this.state.input
              })
            })
          .then(response => response.json())
          .then(response => {
          if (response) {
          fetch('https://parkers-smartbrain-api.fly.dev/image', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count }));
          })
          .catch(console.log) // Error handling
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
     })
     .catch(error => console.log('error', error));
    }
    };

// Route change function
    // onRouteChange = (route) => {
    //   if (route === 'signout') {
    //    return this.setState({isSignedIn: false})
    //   } else if (route === 'home') {
    //     this.setState({isSignedIn: true})
    //   } else {
    //     this.setState({isSignedIn: false})
    //   }
    //   this.setState({route: route});
    // }
    onRouteChange = (route) => {
      if (route === 'signout') {
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
            toggleModal={this.toggleModal}>
            </Profile>
          </Modal>
          }
          <Logo />
          { route === 'home' 
            ? <div>
              {/* <Logo /> */}
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
              loadUser={this.loadUser} 
              onRouteChange={this.onRouteChange}
              />
          )}
        </div>
      );
    };
  }

  

export default App;
