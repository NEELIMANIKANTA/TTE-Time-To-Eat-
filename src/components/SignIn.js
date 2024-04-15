import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import './Signup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignIn() {
    const navigate = useNavigate();
    const [username, setName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [statusCode, setStatusCode] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();  
        // Prepare form data
        const formData = {
            username: username,
            password: password
        };
  
        // Make POST request using Axios
        console.log("Form data:", formData);
        axios.post('http://localhost:8181/api/user/login', formData)
            .then(response => {
                setMessage(response.data.message);
                setStatusCode(response.status);
                // Store username in session storage
                sessionStorage.setItem('username', username);
                // Redirect to home page
                navigate('/App')
            })
            .catch(error => {
                if (error.response) {
                    setMessage(error.response.data.message);
                    setStatusCode(error.response.status);
                } else {
                    setMessage("An error occurred. Please try again later.");
                    setStatusCode(null);
                }
            });
    };

    return (
        <>
            <section className="vh-100 bg-light section-2">
                <div className="container h-100" style={{ maxWidth: '100%' }}>
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{ borderRadius: '25px', minHeight: '100%' }}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-7 order-1 order-lg-1">
                                            <img src="./images/smart.jpg" height="70%" width="70%"
                                                className="img-fluid" alt="Signin"/>
                                        </div>
                                        <div className="col-md-10 col-lg-6 col-xl-5 d-flex align-items-center order-2 order-lg-2">
                                            <div>
                                                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign In</p>
                                                {message && (
                                                    <div className={statusCode === 200 ? "alert alert-success" : "alert alert-danger"}>
                                                        {message}
                                                    </div>
                                                )}
                                                <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                                                    <div className="d-flex flex-row align-items-center mb-3">
                                                        <FontAwesomeIcon icon={faUser} className='me-3'/>
                                                        <div className="form-outline flex-fill mb-0">
                                                            <input type="text" id="name" name="name" className="form-control" value={username} onChange={(e) => setName(e.target.value)} placeholder='Enter name' required/>
                                                            <label className="form-label" htmlFor="name"></label>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex flex-row align-items-center mb-3">
                                                        <FontAwesomeIcon icon={faLock} className='me-3'/>
                                                        <div className="form-outline flex-fill mb-0">
                                                            <input type="password" id="password" name="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' required/>
                                                            <label className="form-label" htmlFor="password"></label>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                        <button type="submit" className="btn btn-primary btn-lg">Register</button>
                                                    </div>
                                                </form>
                                                <div className="already-registered text-center">
                                                    <p>New User?<a href="/signup"> Signup</a></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default SignIn;
