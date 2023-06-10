import React from "react";

// Sign in component - signs in if user exists in Database
// If user does not exist, error message displays saying to enter correct credentials
class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: '',
            signInEmail: '',
            signInPassword: '',
            formErrors: {
                email: '',
                password: '',
                form: ''
            }
        }
    }
    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }


    onSubmitSignIn = (e) => {
        e.preventDefault();
        fetch('https://parkers-smartbrain-api.fly.dev/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user.id) {
                this.props.loadUser(user);
                this.props.onRouteChange('home');
                this.setState({form: ''}) // set form to empty
            } else {
                this.setState({form: (<>Credentials invalid!<br/>Please check your credentials and try again.</>)})
            }
        })
    }

    render() {
        const { formErrors } = this.state;
        const { onRouteChange } = this.props;
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-3 center">
            <main className="pa4 black-80">
            <div className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" 
                    htmlFor="email-address">Email</label>
                    <input className={`f5 pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100${formErrors.email && 'ba bw2 b--red'}`} 
                    type="email" 
                    name="email-address"  
                    placeholder="Enter your email"
                    id="email-address" 
                    onChange = {this.onEmailChange}
                    />
                    {formErrors.email && (
                        <div className="dib bg-red white ma3 pa2 f5 br2 shadow-2">{formErrors.email}</div>
                    )}
                </div>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" 
                    htmlFor="password">Password</label>
                    <input className={`b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100${formErrors.password && 'ba bw2 b--red'}`}
                    type="password" 
                    name="password"  
                    placeholder="Enter your password"
                    id="password" 
                    onChange = {this.onPasswordChange}
                    />
                    {formErrors.password && (
                        <div className="dib bg-red white ma3 pa2 f5 br2 shadow-2">{formErrors.password}</div>
                    )}
                </div>
                </fieldset>
                <div className="mt3 tc">
                <input 
                id="btn"
                onClick={this.onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                type="submit" 
                value="Sign In" 
                />
                </div>
                {this.state.form && (
                    <div className="dib bg-red white ma3 pa2 f5 shadow-2 br2 1h-copy">{this.state.form}</div>
                )}
                <div className="lh-copy mt3">
                <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
                </div>
            </div>
            </main>
            </article>
        );
    }
}

export default Signin;