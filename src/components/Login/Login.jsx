import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { HiOutlineX, HiCheck } from "react-icons/hi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import "./Login.scss";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/loginUserSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setLogIn }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [displayPassword, setDisplayPassword] = useState(false);
  const [disableLogin, setDisableLogin] = useState(false);
  const [unknownError, setUnknownError] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [removeScale, setRemoveScale] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.login_user.user);

  const onSubmit = async (data) => {
    setDisableLogin(true);
    setUnknownError(false);
    try {
      const response = await axios.post("http://localhost:5000/api/login", data);
      dispatch(login(response.data));
      setLoginSuccess(true);
      setLogIn(data.email);
    } catch (error) {
      console.log(error);
      setUnknownError(true);
    } finally {
      setDisableLogin(false);
    }
  };

  useEffect(() => {
    setRemoveScale(true);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

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
                <section className="input-container">
                  <input
                    {...register("email", {
                      required: true,
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email format",
                      },
                    })}
                    id="email"
                    type="email"
                    onFocus={(e) => e.target.parentNode.querySelector("label").classList.add("label-style")}
                    onBlur={(e) => {
                      if (!e.target.value) e.target.parentNode.querySelector("label").classList.remove("label-style");
                    }}
                    autoComplete="off"
                  />
                  <label htmlFor="email">Email</label>
                </section>
                {errors.email && <span className="wrong-message">{errors.email.message}</span>}
              </div>

              {/* Password */}
              <div className="password">
                <section className="input-container">
                  <input
                    {...register("password", { required: "Password is required" })}
                    id="password"
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

              {/* submit button */}
              <button className="submit-btn" disabled={disableLogin}>
                {disableLogin ? "Processing..." : "Login"}
              </button>

              {/* ... rest of your form elements */}
              <hr />

              {/* go to sign up */}
              {!disableLogin ? (
                <section className="alternate">
                  {"New to Zomato Clone? "}
                  <span
                    className="text-link"
                    onClick={() => {
                      setLogIn(false);
                      setSignUp(true);
                    }}
                  >
                    Create account
                  </span>
                </section>
              ) : (
                <span className="disclaimer">If form didn't work within 30 seconds, go back and try again</span>
              )}
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

          <p className="message">Something went wrong, please fill the correct credentials and try again</p>
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
