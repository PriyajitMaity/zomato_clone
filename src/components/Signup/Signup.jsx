import React, { useState } from "react";
import '../Login/Login.scss';
import { HiCheck, HiOutlineX } from "react-icons/hi";

const Signup = ({setSignUp, setLogIn}) => {
  const [unknownError, setUnknownError] =useState(false);
  const [signupSuccess, setSignupSuccess] =useState(false)
  const [disableSignup, setDisableSignup] =useState(false);


  return <div className="blur-background" onClick={() =>setSignUp(false)}>
    {!unknownError ? (
        <form className="sign-up-form">
        {!signupSuccess ? (
            <>
            <section className="top-section">
              <h2 className="heading">Sign Up</h2>
              <span className="cross-btn"><HiOutlineX /></span>
            </section>
    
            {/* Fullname */}
            <div className="full-name">
              <section className="input-container">
                <input id ="fullName" type="text" />
                <label htmlFor="fullName">Full Name</label>
              </section>
              <span className="wrong-message">wrong message</span>
            </div>
            
            {/* Email */}
            <div className="email">
              <section className="input-container">
                <input id ="email" type="text" />
                <label htmlFor="emali">Email</label>
              </section>
              <span className="wrong-message">wrong message</span>
            </div>
    
            {/* Password */}
            <div className="password">
              <section className="input-container">
                <input id ="password" type="text" />
                <label htmlFor="password">Password</label>
                <span className="eye"></span>
              </section>
              <span className="wrong-message">wrong message</span>
            </div>
    
            {/* terms & conditions */}
            <section className="terms-condition">
              <input type="checkbox" />
              <span className="terms">I agree to Zomato's <a href='https://www.zomato.com/conditions' target='_blank'>Terms of Service</a>, <a href='https://www.zomato.com/privacy' target='_blank'>Privacy Policy</a> and <a href='https://www.zomato.com/policies' target='_blank'>Content Policies</a></span>
            </section>
    
            {/* submit button */}
            <button className="submit-btn">Create account</button>
    
            <hr />

            {/* go to login */}
            {!disableSignup ? (
              <section className="alternate">
                {"Already have an account ? "}
                <span className="text-link">Log in</span>
              </section>
            ):(
              <span className="disclaimer">If form didn't work within 30 seconds, go back and try again</span>
            )}
          </>
        ) : (
          <>
            <section className="success-message">
              <div className="check">
                <HiCheck />
                <div className="moving-element"></div>
              </div>
              <h2 className="heading">Success!</h2>
              <p className="text">Accoutn created successfully. Do you want to login ?</p>
              <div className="buttons">
                <button className="login">Yes, login</button>
                <button className="cancel">Cancel</button>
              </div>
            </section>
          </>
        )}
      </form>
    ) : (
      <div className="sign-up-failed">
        <section className="top-section">
          <h2 className="heading">Signup Failed</h2>
          <span className="cross-btn"><HiOutlineX/></span>
        </section>

        <p className="message">Somthing went wrong, Please check your network and try again</p>
        <button className="try-again">Try again</button>
        <button className="skip">Skip for now</button>
      </div>
    )}
    
  </div>;
};

export default Signup;
