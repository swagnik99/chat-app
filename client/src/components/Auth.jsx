import React, {useState} from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import signInimage from '../assets/signup.jpg';

const initialState = {
    fullName: '',
    userName: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    avatarURL: ''
}

const cookies = new Cookies();



const Auth = () => {
    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(true);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value});

        // console.log(form);
    };
    const handleSubmit  = async (e) => {
        e.preventDefault();
       
        const {fullName, userName, password,phoneNumber,avatarURL} = form;

        const URL = 'http://localhost:5000/auth';
        
        const { data: { token, userId, hashedPassword,}} = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
            userName,password,fullName,phoneNumber,avatarURL,
        })
        cookies.set('token',token);
        cookies.set('userName',userName);
        cookies.set('fullName',fullName);
        cookies.set('userId',userId);

        if (isSignup) {
            cookies.set('phoneNumber',phoneNumber);
            cookies.set('avatarURL',avatarURL);
            cookies.set('hashedPassword',hashedPassword);
        }

        window.location.reload();

    };



    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    };

  return (
    <div className='auth__form-container'>
        <div className="auth__form-container_fields">
            <div className="auth__form-container_fields-content">
                <form onSubmit={handleSubmit}>
                <p>{isSignup ? 'Sign Up' : 'Sign In'}</p>
                { isSignup && (
                    <div className="auth__form-container_fields-content_input">
                        <label htmlFor='fullName'>Full Name</label>
                        <input name='fullName' type="text" placeholder='Full Name' onChange={handleChange} required />
                    </div>
                )}
                
                    <div className="auth__form-container_fields-content_input">
                        <label htmlFor='userName'>User Name</label>
                        <input name='userName' type="text" placeholder='User Name' onChange={handleChange} required />
                    </div>
                
                { isSignup && (
                    <div className="auth__form-container_fields-content_input">
                        <label htmlFor='phoneNumber'>Phone Number</label>
                        <input name='phoneNumber' type="text" placeholder='Phone Number' onChange={handleChange} required />
                    </div>
                )}
                { isSignup && (
                    <div className="auth__form-container_fields-content_input">
                        <label htmlFor='avatarURL'>Avatar Url</label>
                        <input name='avatarURL' type="text" placeholder='Avatar Url' onChange={handleChange} required />
                    </div>
                )}
                
                    <div className="auth__form-container_fields-content_input">
                        <label htmlFor='password'>Password</label>
                        <input name='password' type="password" placeholder='Password' onChange={handleChange} required />
                    </div>
                { isSignup && (
                    <div className="auth__form-container_fields-content_input">
                        <label htmlFor='confirmPassword'>Confirm Password</label>
                        <input name='ConfirmPassword' type="password" placeholder='Confirm Password' onChange={handleChange} required />
                    </div>
                )}
                 <div className="auth__form-container_fields-content_button">
                    <button>{isSignup ? "Sign Up" : "Sign in"}</button>
                 </div>
                </form>
                <div className="auth__form-container_fields-account">
                    <p>
                        {isSignup ? "Already have a account?" : "Dont have a Account"}
                        <span onClick={switchMode}>
                        {isSignup ? "Sign in" : "Sign up"} 
                        </span>
                    </p>
                </div>
            </div>
        </div>
        <div className="auth__form-container_image">
            <img src={signInimage} alt="sign in" />
        </div>
    </div>
  )
}

export default Auth