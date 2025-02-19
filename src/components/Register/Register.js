import React from "react";
import '../Signin/Signin.css';

// Register component - registers new users when input values are changed
class Register  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
            formError: '',
        }
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }
    onSubmitRegister = (e) => {
        e.preventDefault();
        const { email, password, name } = this.state;

        // Check for empty fields
        if (!name || !email || !password) {
            this.setState({
                formError: 'All fields are required! Please fill out the form completely.',
            });
            return;
        }

        const API_URL = window.location.hostname === 'localhost'
        ? 'http://localhost:8080'
        : 'https://parkers-smartbrain-api.fly.dev';
        fetch(`${API_URL}/register`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.user && data.token) {
                // Save token in session storage
                window.sessionStorage.setItem('token', data.token);
                this.props.loadUser(data.user);
                this.props.onRouteChange('home');
            } else {
                this.setState({
                    formError: 'Registration failed! Please check your details and try again.',
                });
            }
        })
        .catch((error) =>
            this.setState({
                formError: 'Something went wrong! Please try again later.',
            })
        );
    };

    render() {
        const { formError } =this.state;
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
            <div className="measure register">
                <form onSubmit={this.onSubmitRegister}>
                <fieldset id="sign_up" 
                className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Register</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" 
                    htmlFor="name">Name</label>
                    <input  className="rounded input pa2 hover-black input-reset ba hover-bg-black hover-white" 
                    type="text" 
                    name="name"  
                    id="name" 
                    placeholder="Enter your name"
                    onChange={this.onNameChange}
                    />
                </div>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" 
                    htmlFor="email">Email</label>
                    <input  className="rounded input pa2 hover-black input-reset ba hover-bg-black hover-white"
                    type="email" 
                    name="email"  
                    id="email" 
                    placeholder="Enter your email"
                    onChange={this.onEmailChange}
                    />
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" 
                    htmlFor="password">Password</label>
                    <input className="rounded input hover-black pa2 input-reset ba hover-bg-black hover-white"
                    type="password" 
                    name="password"  
                    id="password" 
                    placeholder="Enter your password"
                    onChange={this.onPasswordChange}
                    />
                </div>
                </fieldset>
                {formError && (
                            <div className="rounded dib bg-red white ma3 pa2 f5 shadow-2 br2 lh-copy" style={{ marginTop: '-0.5rem' }}>
                                {formError}
                            </div>
                )}
                <div>
                <input 
                onClick={this.onSubmitRegister}
                className="rounded signin b ph3 pv2 input-reset ba b--black white grow pointer f4 dib" 
                type="submit" 
                value="Register" 
                />
                </div>
                </form>
            </div>
            </main>
            </article>
        );
    }
}

export default Register;