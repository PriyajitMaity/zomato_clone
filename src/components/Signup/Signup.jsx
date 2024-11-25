import React, { useRef, useState } from "react";
import "../Login/Login.scss";
import { HiCheck, HiOutlineX } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Signup = ({ setSignUp, setLogIn }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [unknownError, setUnknownError] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [disableSignup, setDisableSignup] = useState(false);
  const [displayPassword, setDisplayPassword] = useState(false);
  const [emailExist, setEmailExist] = useState(false);
  const [checked, setChecked] = useState(false);
  const [removeScale, setRemoveScale] = useState(false);
  const [userData, setUserData] = useState({});
  const [valueState, setValueState] = useState({ fullName: "", email: "", password: "" });
  const [errorState, setErrorState] =useState({ fullName: false, email: false, password: false });
  const [focusState, setFocusState] = useState({ fullName: false, email: false, password: false });

  const fullNameRef = useRef();
  const dispatch = useDispatch();

  const inputChangeHandler = (e) => {
    let key = e.target.id;
    let value = e.target.value;
    if (key === "email") {
      value = value.toLocaleLowerCase();
      setEmailExist(false);
    }
    setValueState({ ...valueState, [key]: value });
  };

  const inputBlurHandler = (e) => {
    let key = e.target.id;
    setFocusState({ ...focusState, [key]: false });
  };

  const inputFocusHandler = (e) => {
    let key = e.target.id;
    setFocusState({ ...focusState, [key]: true });
  };

  const loginHandler =() =>{}

  const onSubmit =async(data) => {
    try {
      
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <div className="blur-background" onClick={() => setSignUp(false)}>
      {!unknownError ? (
        <form
          className="sign-up-form"
          onClick={(e) => e.stopPropagation()}
          onSubmit={handleSubmit(onSubmit)}
          style={{ transform: removeScale && "scale(1)" }}
        >
          {!signupSuccess ? (
            <>
              <section className="top-section">
                <h2 className="heading">Sign Up</h2>
                <span className="cross-btn" onClick={() => setSignUp(false)}>
                  <HiOutlineX />
                </span>
              </section>

              {/* Fullname */}
              <div className="full-name">
                <section className={`input-container ${valueState.fullName && focusState.fullName && 'green'} ${errors.fullName && 'red'}`}>
                  <input
                    {...register("fullName", {
                      minLength: { value: 5, message: "full name must have a 5 letters" },
                      maxLength: { value: 20, message: "your name reached maximum limit" },
                    })}
                    required
                    id="fullName"
                    type="text"
                    onFocus={inputFocusHandler}
                    onBlur={inputBlurHandler}
                    value={valueState.fullName}
                    onChange={inputChangeHandler}
                    autoComplete="off"
                    ref={fullNameRef}
                  />
                  <label
                    htmlFor="fullName"
                    className={
                      (focusState.fullName || valueState.fullName) &&
                      `label-style ${valueState.fullName && focusState.fullName && "green"} ${errors.fullName && "green"}}`
                    }
                  >
                    Full Name
                  </label>
                  {valueState.fullName && (
                    <span className="cross" onClick={() => setValueState({ ...valueState, fullName: "" })}>
                      <HiOutlineX />
                    </span>
                  )}
                </section>
                <span className="wrong-message">{errors.fullName && errors.fullName.message}</span>
              </div>

              {/* Email */}
              <div className="email">
                <section className={`input-container ${valueState.email && focusState.email && 'green'} ${errors.email && 'red'}`}>
                  <input
                    {...register("email", {
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email format",
                      },
                    })}
                    required
                    id="email"
                    type="text"
                    value={valueState.email}
                    onFocus={inputFocusHandler}
                    onBlur={inputBlurHandler}
                    onChange={inputChangeHandler}
                    autoComplete="off"
                  />
                  <label
                    htmlFor="email"
                    className={
                      (focusState.email || valueState.email) &&
                      `label-style ${valueState.email && focusState.email && "green"}`
                    }
                  >
                    Email
                  </label>
                  {valueState.email && (
                    <span className="cross" onClick={() => setValueState({ ...valueState, email: "" })}>
                      <HiOutlineX />
                    </span>
                  )}
                </section>
                <span className="wrong-message">{errors.email && errors.email.message}</span>
              </div>

              {/* Password */}
              <div className="password">
                <section className={`input-container ${valueState.password && focusState.password && 'green'} ${errors.password && 'red'}`}>
                  <input
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 6, message: "Password must be at least 6 characters" },
                      validate: {
                        hasNumber: (value) => /\d/.test(value) || "Password must include a number",
                        hasUppercase: (value) =>
                          /[A-Z]/.test(value) || "Password must include an uppercase letter",
                      },
                    })}
                    required
                    id={displayPassword ? 'text' : 'password'}
                    type="text"
                    value={valueState.password}
                    onFocus={inputFocusHandler}
                    onBlur={inputBlurHandler}
                    onChange={inputChangeHandler}
                    autoComplete="off"
                  />
                  <label
                    htmlFor="password"
                    className={
                      (focusState.password || valueState.password) &&
                      `label-style ${valueState.password && focusState.password && "green"}`
                    }
                  >
                    Password
                  </label>
                  <span className="eye">
                    {displayPassword ? (
                      <AiFillEyeInvisible onClick={() => setDisplayPassword(false)} />
                    ) : (
                      <AiFillEye onClick={() => setDisplayPassword(true)} />
                    )}
                  </span>
                </section>
                <span className="wrong-message">{errors.password && errors.password.message}</span>
              </div>

              {/* terms & conditions */}
              <section className="terms-condition">
                <input type="checkbox" onChange={() =>setChecked(!checked)} checked={checked}/>
                <span className="terms">
                  I agree to Zomato's{" "}
                  <a href="https://www.zomato.com/conditions" target="_blank">
                    Terms of Service
                  </a>
                  ,{" "}
                  <a href="https://www.zomato.com/privacy" target="_blank">
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a href="https://www.zomato.com/policies" target="_blank">
                    Content Policies
                  </a>
                </span>
              </section>

              {/* submit button */}
              <button type="submit" disabled={!checked || disableSignup} className="submit-btn">{disableSignup ? "Don't go back, creating back...." : "Create account"}</button>

              <hr />

              {/* go to login */}
              {!disableSignup ? (
                <section className="alternate">
                  {"Already have an account ? "}
                  <span className="text-link"
                   onClick={() =>{
                      setLogIn(true);
                      setSignUp(false);
                  }} >Log in</span>
                </section>
              ) : (
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
                  <button className="login" onClick={loginHandler}>Yes, login</button>
                  <button className="cancel" onClick={() =>setSignUp(false)}>Cancel</button>
                </div>
              </section>
            </>
          )}
        </form>
      ) : (
        <div className="sign-up-failed" onClick={(e) =>e.stopPropagation()}>
          <section className="top-section">
            <h2 className="heading">Signup Failed</h2>
            <span className="cross-btn" onClick={() =>setSignUp(false)}>
              <HiOutlineX />
            </span>
          </section>

          <p className="message">Somthing went wrong, Please check your network and try again</p>
          <button className="try-again" onClick={() =>setUnknownError(false)}>Try again</button>
          <button className="skip" onClick={() =>setSignUp(false)}>Skip for now</button>
        </div>
      )}
    </div>
  );
};

export default Signup;
