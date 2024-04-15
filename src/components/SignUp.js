import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faKey, faMobile } from '@fortawesome/free-solid-svg-icons';

import './Signup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {

  const navigate = useNavigate();

    const [username, setName] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatedPassword] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState(""); 

    const [message, setMessage] = useState("");
    const [statusCode, setStatusCode] = useState(null);

    if (password !== repeatPassword) {
      setMessage("Passwords do not match");
      return;
    }


    const handleSubmit = (e) => {
      e.preventDefault();  
      // Prepare form data
      const formData = {
        username: username,
         password: password,
        email: email,
        mobile: mobile,
      };
  
      // Make POST request using Axios
      console.log("Form data:", formData); // Log the form data
      axios.post('http://localhost:8181/api/user/register', formData)
      .then(response => {
        setMessage(response.data.message);
        setStatusCode(response.status);
        navigate('/signin');
    })
    .catch(error => {
      console.error("Error:", error); // Log the error object
      if (error.response) {
          console.log("Response data:", error.response.data); // Log the response data
          if (error.response.data.mobile) {
              setMessage(error.response.data.mobile);
          } else {
              setMessage(error.response.data.message);
          }
          setStatusCode(error.response.status);
      } else {
          console.log("Error message:", error.message); // Log the error message
          setMessage("An error occurred. Please try again later.");
          setStatusCode(null);
      }
  });
    };

  return (
    <>
      <section className="vh-100 bg-light section-1">
        <div className="container h-100" style={{ maxWidth: '100%'}}>
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: '25px', minHeight: '100%'}}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                      {message && (
                              <div className={statusCode === 201 ? "alert alert-success" : "alert alert-danger"}>
                                  {message}
                            </div>
                      )};
                      <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                        

                        <div className="d-flex flex-row align-items-center mb-3">
                          <FontAwesomeIcon icon={faUser} className='me-3'/>
                          <div className="form-outline flex-fill mb-0">
                            <input type="text" id="name" name="name" className="form-control" value={username} onChange={(e) => setName(e.target.value)} placeholder='Enter name' required/>
                            <label className="form-label" htmlFor="name"></label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-3">
                          <FontAwesomeIcon icon={faEnvelope} className='me-3'/>
                          <div className="form-outline flex-fill mb-0">
                            <input type="email" id="email" name="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter email' required/>
                            <label className="form-label" htmlFor="email"></label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-3">
                          <FontAwesomeIcon icon={faLock} className='me-3'/>
                          <div className="form-outline flex-fill mb-0">
                            <input type="password" id="password" name="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' required/>
                            <label className="form-label" htmlFor="password"></label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-3">
                          <FontAwesomeIcon icon={faKey} className='me-3'/>
                          <div className="form-outline flex-fill mb-0">
                            <input type="password" id="repeatPassword" name="repeatPassword" className="form-control" onChange={(e) => setRepeatedPassword(e.target.value)} placeholder='Enter confirm password' required />
                            <label className="form-label" htmlFor="repeatPassword"></label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-3">
                        <FontAwesomeIcon icon={faMobile} className='me-3'/>
                          <div className="form-outline flex-fill mb-0">
                            <input type="text" id="mobile" name="mobile" className="form-control" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder='Enter Mobile' required />
                            <label className="form-label" htmlFor="mobile"></label>
                          </div>
                        </div>

                        <div className="form-check d-flex justify-content-center mb-5">
                          <input className="form-check-input me-2" type="checkbox" id="agreeTerms" name="agreeTerms" required />
                          <label className="form-check-label" htmlFor="agreeTerms">
                            I agree all statements in <a href="#!">Terms of service</a>
                          </label>
                        </div>

                        <div className="d-flex justify-content-center mb-3">
                          <button type="submit" className="btn btn-primary btn-lg">Register</button>
                        </div>
                          <div className="already-registered text-center">
                          
                        <p>Already Signup?<a href="/signin" >Signin</a></p>  
                      </div>

                      </form>
                      

                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid" alt="Signup"/>

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

export default Signup;
