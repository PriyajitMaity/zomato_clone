import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
import { HiOutlineX } from "react-icons/hi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import "./Login.scss";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/loginUserSlice";

const Login = ({ setLogIn }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [displayPassword, setDisplayPassword] = useState(false);
  const [valueState, setValueState] = useState({ email: "", password: "" });
  const [errorState, setErrorState] = useState({ email: "", password: "" });
  const [wrongEmail, setWrongEmail] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [disableLogin, setDisableLogin] = useState(false);
  const [unknownError, setUnknownError] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [removeScale, setRemoveScale] = useState(false);

  const [focusState, setFocusState] = useState({ email: false, password: false });

  const emailRef = useRef(null);
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.login_user.user);

  const inputFocusHandler = (e) => {
    setErrorState({ ...errorState, [e.target.id]: false });
    setFocusState({ ...focusState, [e.target.id]: true });
  };

  const inputBlurHandler = (e) => {
    
    const key = e.target.id;
    setFocusState({ ...focusState, [key]: false });

    if (key === "email" && !checkEmail(valueState.email)) {
      errorState.email = true;
    } else if (key === "password" && valueState.password) {
      valueState.password = true;
    }
    setErrorState({ ...errorState });
  };

  const inputChangeHandler = (e) => {
    setValueState({ ...valueState, [e.target.id]: e.target.value });
  };

  const onSubmit = async (data) => {
    setDisableLogin(true);
    try {
      // Implement your login logic using data.email and data.password
      // Replace with your actual login API call or logic
      dispatch(login(data.user));
      console.log(data.user);
      // Assuming successful login:
      setLoginSuccess(true);
      setLogIn(data.email); // Assuming loginUser is a state variable to store user details
    } catch (error) {
      // Handle login errors
      if (error.response && error.response.data.message === "Invalid Email Id") {
        setWrongEmail(true);
      } else if (error.response && error.response.data.message === "Incorrect password") {
        setWrongPassword(true);
      } else {
        setUnknownError(true);
      }
    } finally {
      setDisableLogin(false);
    }
  };

  return (
    <div className="blur-background" onClick={() => setLogIn(false)}>
      {!unknownError ? (
        <form
          className="log-in-form"
          onSubmit={handleSubmit(onSubmit)}
          style={{ transform: removeScale && "scale(1)" }}
          onClick={(e) => e.stopPropagation()}
        >
          {!loginSuccess ? (
            <>
              <section className="top-section">
                <h2 className="heading">Log in</h2>
                <span className="cross-btn" onClick={() => setLogIn(false)}>
                  <HiOutlineX />
                </span>
              </section>

              {/* Email */}
              <div className="email">
                <section
                  className={`input-container ${valueState.email && focusState.email && "green"} ${
                    errors.email && "red"
                  }`}
                >
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email format",
                      },
                    })}
                    id="email"
                    type="text"
                    onFocus={inputFocusHandler}
                    onBlur={inputBlurHandler}
                    value={valueState.email}
                    onChange={inputChangeHandler}
                    autoComplete="off"
                    ref={emailRef}
                  />
                  <label
                    htmlFor="email"
                    className={
                      (focusState.email || valueState.email) &&
                      `label-style ${valueState.email && focusState.email && "green"} ${errors.email && "red"}`
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
                <span className="wrong-message">
                  {errors.email?.message || (wrongEmail && "Email Id dose not exits, try to sign up")}
                </span>
              </div>

              {/* Password */}
              <div className="password">
                <section
                  className={`input-container ${valueState.password && focusState.password && "green"} ${
                    errors.password && "red"
                  }`}
                >
                  <input
                    {...register("password", { required: "Password is required" })}
                    id="password"
                    type={displayPassword ? "text" : "password"}
                    onFocus={inputFocusHandler}
                    onBlur={inputBlurHandler}
                    value={valueState.password}
                    onChange={inputChangeHandler}
                    autoComplete="off"
                  />
                  <label
                    htmlFor="password"
                    className={
                      (focusState.password || valueState.password) &&
                      `label-style ${valueState.password && focusState.password && "green"} ${errors.password && "red"}`
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
                  {valueState.password && (
                    <span className="cross" onClick={() => setValueState({ ...valueState, password: "" })}>
                      <HiOutlineX />
                    </span>
                  )}
                </section>
                <span className="wrong-message">
                  {errors.password?.message || (wrongPassword && "Incorrect password")}
                </span>
              </div>

              {/* submit button */}
              <button className="submit-btn" disabled={disableLogin}>
                {disableLogin ? "Processing..." : "Login"}
              </button>

              {/* ... rest of your form elements */}
            </>
          ) : (
            // Login success section
            <>
              <section className="success-message">
                <div className="check">
                  <HiCheck />
                  <div className="moving-element"></div>
                </div>
                <h2 className="heading">Success!</h2>
                <p className="text">Welcome! {loginUser?.name}. You are successfully logged in!</p>
                <div className="buttons">
                  <button
                    className="ok"
                    onClick={() => {
                      setLogIn(false);
                      navigate("/kolkata");
                    }}
                  >
                    See Restaurant Near You
                  </button>
                </div>
              </section>
            </>
          )}
        </form>
      ) : (
        // Unknown error section
        <div className="log-in-failed" onClick={(e) => e.stopPropagation()}>
          <section className="top-section">
            <h2 className="heading">Login Failed</h2>
            <span className="cross-btn" onClick={() => setLogIn(false)}>
              <HiOutlineX />
            </span>
          </section>

          <p className="message">Something went wrong, please check your network and try again</p>
          <button className="try-again" onClick={() => setUnknownError(false)}>
            Try again
          </button>
          <button className="skip" onClick={() => setLogIn(false)}>
            Skip for now
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
