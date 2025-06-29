import React, { useState } from 'react';
import './LoginOrSignUp.css';
import serialize from 'form-serialize';
import { Meteor } from 'meteor/meteor';


const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [showLogin, setShowLogin] = useState(true);
    const [showSignup, setShowSignup] = useState(false);
    const [showForgot, setShowForgot] = useState(false);

    // Client-side code
    const handleSignup = (e) => {
        e.preventDefault();
        const formData = serialize(document.getElementById('user-signUp'), { hash: true });
        console.log("signup",formData);
    
        const {password, confirmPassword } = formData;
        if (password !== confirmPassword) {
            alert('The password should be the same.');
            return;
        }
    
        // Call server-side method to check if the email exists in the database
        Meteor.call('user.signup', { data: formData }, (error, result) => {
            if (error) {
              console.error('Error signing up:', error.reason);
            } else {
              console.log('User signed up successfully! User ID:', result);
              alert('User signed up successfully!');
              // Handle successful signup (redirect, show success message, etc.)
            }
          });
       
    };
    

    const handleLogin = async (e) => {
        e.preventDefault();
        const form = document.getElementById('user-login');
        const formData = serialize(form, { hash: true });
      
        const { email, password } = formData; // Extract email and password from form data

        Meteor.loginWithPassword(email, password, (error) => {
            if (error) {
              console.error('Login failed:', error.reason);
              // Handle login failure (show error message, redirect, etc.)
            } else {
              onLogin(email,password)
              // Handle successful login (redirect, show success message, etc.)
            }
          });
      };
    
    

    const handleForgottenSubmit = (event) => {
        event.preventDefault();
        // Here you can implement logic to handle the forgotten password functionality,
        // such as sending a reset link to the provided email address.
        // For demonstration purposes, let's just show a message upon form submission.
        setSubmitted(true);
    };

    const toggleLoginForm = () => {
        setShowLogin(!showLogin);
        setShowSignup(false);
        setShowForgot(false);
    };

    const toggleSignupForm = () => {
        setShowSignup(!showSignup);
        setShowLogin(false);
        setShowForgot(false);
    };

    const toggleForgotForm = () => {
        setShowForgot(!showForgot);
        setShowLogin(false);
        setShowSignup(false);
    }

    return (
        <><div className="container" style={{ background: 'white' }}>
            <div style={{ backgroundColor: 'white', minHeight: '118vh', display: 'flex' }}>
                <div className="User">
                    <img src="/retakeLogin.jpg" className="login-image" />
                    <div className="User-Login" style={{ display: showLogin ? 'block' : 'none' }}>
                        <h1 className="hhh">Login</h1>
                        <form id='user-login' className="form" onSubmit={handleLogin}>
                            <input
                                className="input"
                                type="text"
                                name="email"
                                placeholder="Enter Email"
                            />
                            <input
                                className="input"
                                type="password"
                                name="password"
                                placeholder="Enter password"
                            />
                            <div className='links'>
                                <a className="link" onClick={toggleForgotForm}>
                                    Forgotten Password?
                                </a>
                            </div>
                            <button className="button" type="submit">Login</button><br />
                            <a className="link" onClick={toggleSignupForm}>
                                Don't have an account? Click to Sign-Up
                            </a>
                        </form>
                    </div>
                    <div className='User'>
                        <div className='User-Login' style={{ display: showSignup ? 'block' : 'none' }}>
                            <form id='user-signUp' className="form" onSubmit={handleSignup}>
                                <h1 className="hhh">Sign-Up</h1>
                                <input
                                    className="input"
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                />
                                <input
                                    className="input"
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                />
                                <input
                                    className="input"
                                    type="email"
                                    name="email"
                                    placeholder="Enter Email"
                                />
                                <input
                                    className="input"
                                    type="password"
                                    name="password"
                                    placeholder="Enter password"
                                />
                                <input
                                    className="input"
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm password"
                                />
                                <label className='dob'>Date of birth ?</label>
                                <div className='field'>
                                    <input
                                        className="input date-input" // Apply custom CSS classes
                                        type="date"
                                        name="dob"
                                    // Call handleDateChange function on input change
                                    />
                                    <select
                                        style={{

                                            border: '1px solid rgb(42, 224, 5)',
                                            borderRadius: '10px',
                                            height: '27px',
                                            color: 'gray'
                                        }}
                                        className="input" name='gender' type="text"
                                    >
                                        <option value="" disabled>
                                            Select Gender
                                        </option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <button className="button" type="submit">Sign-Up</button><br />
                                <a className="link" onClick={toggleLoginForm}>
                                    Already Have an Account? Click to Login
                                </a>
                            </form>
                        </div>
                    </div>
                    <div className="User">
                        <div className="User-Login" style={{ display: showForgot ? 'block' : 'none' }}>
                            {!submitted ? (
                                <form onSubmit={handleForgottenSubmit}>
                                    <h2 className='hhh'>Forgotten Password</h2>
                                    <div>
                                        <input className='emailforgotten'
                                            type="email"
                                            id="email"
                                            placeholder='enter registered email id'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <button className='buttonforgotten' type="submit">Submit</button>
                                </form>
                            ) : (
                                <div>
                                    <p>An email has been sent to {email} with password reset instructions.</p>
                                    {/* You can provide a link to go back to the login page or any other relevant action */}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div></>
    );
};

export default Login;
