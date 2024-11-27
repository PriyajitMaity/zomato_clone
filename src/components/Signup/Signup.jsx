import React, { useState, useEffect } from "react";
import "../Login/Login.scss";
import { HiCheck, HiOutlineX } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { login } from "../Redux/loginUserSlice";
import axios from "axios";

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
  const [checked, setChecked] = useState(false);
  const [removeScale, setRemoveScale] = useState(false);
  const [userDetails, setUserDetails] =useState({name: "", email: "", password: ""})

  const dispatch = useDispatch();

  const loginHandler = () => {
     setSignUp(false);
     dispatch(login(userDetails));
     dispatch(cartInitialization(localStorage.getItem("cart_items") ? JSON.parse(localStorage.getItem("cart_items")) : {}));
  };
  const userRegistration = async (data) => {
    setDisableSignup(true);
    try {
      const response = await axios.post("http://localhost:5000/api/register", data);

      if (response.status ===210) {
        setUserDetails(response.data);
       }
    } catch (error) {
      setDisableSignup(false);
      setChecked(false);
      setDisplayPassword(false);
      setUserDetails({
        fullName: "", email: "", password: ""
      })
      console.log(error);
    }
  };
  const onSubmit = (data) => {
    userRegistration(data);
    setSignupSuccess(true);

  };

  useEffect(() => {
    setRemoveScale(true);
    document.body.style.overflow = "hidden";
    return () => {
        document.body.style.overflow = "auto";
    }
}, [])

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
                <h2 className="heading">Sign up</h2>
                <span className="cross-btn" onClick={() => setSignUp(false)}>
                  <HiOutlineX />
                </span>
              </section>

              {/* Full Name */}
              <div className="full-name">
                <section className="input-container">
                  <input
                    {...register("name", {
                      required: true,
                      minLength: { value: 5, message: "your name must be 5 length character" },
                      maxLength: { value: 20, message: "your name must be minimum 20 length character" },
                    })}
                    type="text"
                    onFocus={(e) => e.target.parentNode.querySelector("label").classList.add("label-style")}
                    onBlur={(e) => {
                      if (!e.target.value) e.target.parentNode.querySelector("label").classList.remove("label-style");
                    }}
                  />
                  <label htmlFor="full-name" className={`${errors.name ? "red" : "green"}`}>Full Name</label>
                </section>
                {errors.name && <span className="wrong-message">{errors.name.message}</span>}
              </div>

              {/* Email */}
              <div className="email">
                <section className="input-container">
                  <input
                    {...register("email", {
                      required: true,
                      message: "enter a valid email address",
                    })}
                    type="email"
                    onFocus={(e) => e.target.parentNode.querySelector("label").classList.add("label-style")}
                    onBlur={(e) => {
                      if (!e.target.value) e.target.parentNode.querySelector("label").classList.remove("label-style");
                    }}
                  />
                  <label htmlFor="email">Email</label>
                </section>
                {errors.email && <span className="wrong-message">{errors.email.message}</span>}
              </div>

              {/* Password */}
              <div className="password">
                <section className="input-container">
                  <input
                    {...register("password", {
                      required: true,
                      minLength: { value: 6, message: "*password must be more than 6 letter" },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                        message:
                          "*password must contain at least 6 characters, including uppercase, lowercase, number and special character",
                      },
                    })}
                    type={displayPassword ? "text" : "password"}
                    onFocus={(e) => e.target.parentNode.querySelector("label").classList.add("label-style")}
                    onBlur={(e) => {
                      if (!e.target.value) e.target.parentNode.querySelector("label").classList.remove("label-style");
                    }}
                  />
                  <label htmlFor="password">Password</label>
                  <span className="eye">
                    {displayPassword ? (
                      <AiFillEyeInvisible onClick={() => setDisplayPassword(false)} />
                    ) : (
                      <AiFillEye onClick={() => setDisplayPassword(true)} />
                    )}
                  </span>
                </section>
                {errors.password && <span className="wrong-message">{errors.password.message}</span>}
              </div>

              {/* terms conditions */}
              <section className="terms-conditions">
                <input type="checkbox" onChange={() => setChecked(!checked)} checked={checked} />
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
              <button type="submit" className="submit-btn" disabled={!checked || disableSignup}>
                {disableSignup ? "Don't go back, creating account..." : "Create Account"}
              </button>

              <hr />

              {/* go to login */}
              {!disableSignup ? (
                <section className="alternate">
                  {"Already have an account? "}
                  <span
                    className="text-link"
                    onClick={loginHandler}
                  >
                    Log in
                  </span>
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
                <p className="text">Account created successfully. Do you want to login?</p>
                <div className="buttons">
                  <button
                    className="login"
                    onClick={() => {
                      setSignUp(true);
                      setLogIn(true);
                    }}
                  >
                    Yes, Login
                  </button>
                  <button className="cancel" onClick={() => setSignUp(false)}>
                    Cancel
                  </button>
                </div>
              </section>
            </>
          )}
        </form>
      ) : (
        <div className="sign-up-failed" onClick={(e) => e.stopPropagation()}>
          <section className="top-section">
            <h2 className="heading">Signup Failed</h2>
            <span className="cross-btn" onClick={() => setSignUp(false)}>
              <HiOutlineX />
            </span>
          </section>

          <p className="message">Somthing went wrong, Please check your network and try again</p>
          <button className="try-again" onClick={() => setUnknownError(false)}>
            Try again
          </button>
          <button className="skip" onClick={() => setSignUp(false)}>
            Skip for now
          </button>
        </div>
      )}
    </div>
  );
};

export default Signup;
