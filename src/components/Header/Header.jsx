import React, { useState } from "react";
import "./Header.css";
import zomato from "../../utils/images/zomato.png";
import { Link } from "react-router-dom";
import { HiOutlineMenu, HiLocationMarker, HiShoppingCart } from "react-icons/hi";
import { HiXMark } from "react-icons/hi2";
import { AiFillCaretDown } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { createPortal } from "react-dom";
import { restaurants } from "../../utils/restaurants/restaurants";
import GenerateSearchBarItem from "../GenerateSearchBarItem/GenerateSearchBarItem";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import { logout } from "../Redux/loginUserSlice";
import { clearCart } from "../Redux/cartItemSlice";

const Header = () => {
  const [displayBar, setDisplayBar] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchBarItems, setSearchBarItems] = useState([]);
  const [logIn, setLogIn] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [displayLogOut, setDisplayLogout] = useState(false);

  const cartItems = useSelector((state) => state.cart_items.items);
  const loginUser = useSelector((state) => state.login_user.user);
  const dispatch = useDispatch();

  const searchBarHandler = (e) => {
    let value = e.target.value;
    setSearchValue(value);
    value = value.trim();

    let regexValue;
    try {
      regexValue = new RegExp(value, "i");
    } catch {
      regexValue = new RegExp("", "i");
      value = "";
    }

    const matchRestaurants = restaurants.filter((restaurant) => {
      return (
        regexValue.test(restaurant.info.name) ||
        regexValue.test(restaurant.info.cuisine.map((cuisineName) => cuisineName.name))
      );
    });
    if (value == "") {
      setSearchBarItems([]);
    } else {
      setSearchBarItems(matchRestaurants.slice(0, 10));
    }
  };

  const userHandler = () => {
    setDisplayLogout(!displayLogOut);
  };

  const logoutHandler = async() => {
      dispatch(logout());
      dispatch(clearCart());
  };

  return (
    <header className="header-container">
      <div className="header">
        <div className="bar" onClick={() => setDisplayBar(!displayBar)}>
          <span>{!displayBar ? <HiOutlineMenu /> : <HiXMark />}</span>
        </div>
        <Link to={"/"} onClick={() => setDisplayBar(false)}>
          <img id="logo" src={zomato} alt="Zomato" />
        </Link>
        {/* search bar */}
        <div className="search-container">
          <div className="location">
            <span id="location-icon">
              <HiLocationMarker />
            </span>
            <input placeholder="kolkata" readOnly />
            <span id="down-arrow-icon">
              <AiFillCaretDown />
            </span>
          </div>

          <div className="divider"></div>

          <div className="search">
            <span id="search-icon">
              <CiSearch />
            </span>
            <input
              value={searchValue}
              onChange={searchBarHandler}
              type="text"
              placeholder="Search for restaurants, dishes, or cuisines"
            />
            {searchValue && (
              <div className="search-bar-items-container">
                {searchBarItems.length > 0 ? (
                  <div className="search-bar-items">
                    {searchBarItems.map((item, index) => (
                      <GenerateSearchBarItem
                        restaurant={item}
                        key={index}
                        setSearchValue={setSearchValue}
                        setDisplayBar={setDisplayBar}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="not-match-container">
                    <p className="oops">Oops!</p>
                    <span className="text">We could not understand what you mean, try rephrasing the query.</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* cart-login-signup */}
        <div className="authentication">
          <Link to={"/checkout"} className="link">
            <span className="cartIcon-total">
              <HiShoppingCart style={{ color: Object.keys(cartItems).length && "green" }} />
              <span className="cartItem-total" style={{ color: Object.keys(cartItems).length && "white" }}>
                {Object.keys(cartItems).length}
              </span>
            </span>
            Cart
          </Link>
          {!loginUser ? (
            <>
              <span className="link" onClick={() => setLogIn(true)}>
                Login
              </span>
              <span className="link" onClick={() => setSignUp(true)}>
                Sign Up
              </span>
            </>
          ) : (
            <span className="link login-user" onClick={userHandler}>
              <FaUserAlt />
              <span className="name" title={loginUser?.data?.user?.name}>
                {loginUser?.data?.user?.name}
              </span>
              <MdKeyboardArrowDown style={{ rotate: displayLogOut && "180deg" }}/>
              <span className="logout" style={{ display: displayLogOut && "block" }} onClick={logoutHandler}>
                Log out
              </span>
            </span>
          )}
        </div>
      </div>

      {/* bar */}
      <div  className="bar-options" style={{ opacity: !displayBar && 0, zIndex: !displayBar && -1 }}>
        <Link to={"/checkout"} className="link" onClick={() =>setDisplayBar(false)}>
          <span className="cartIcon-total">
            <HiShoppingCart style={{ color: Object.keys(cartItems).length && "green" }} />
            <span className="cartItem-total" style={{ color: Object.keys(cartItems).length && "white" }}>
              {Object.keys(cartItems).length}
            </span>
          </span>
          Cart
        </Link>
        {!loginUser ? (
          <>
            <span
              className="cart" onClick={() => {
                setDisplayBar(false);
                setLogIn(true);
              }}
            >
              Login
            </span>
            <span className="cart" onClick={() => {
                setDisplayBar(false);
                setSignUp(true);
              }}
            >
              Sign Up
            </span>
          </>
        ) : (
          <span className="link login-user" onClick={userHandler}>
            <FaUserAlt />
            <span className="name" title={loginUser?.data?.user?.name}>
              {loginUser?.data?.user?.name}
            </span>
            <MdKeyboardArrowDown style={{ rotate: displayLogOut && "180deg" }}/>
            <span className="logout" style={{ display: displayLogOut && "block" }} onClick={logoutHandler}>
              Log out
            </span>
          </span>
        )}

        <div className="search-container">
          <div className="location">
            <span id="location-icon">
              <HiLocationMarker />
            </span>
            <input placeholder="kolkata" readOnly />
            <span id="down-arrow-icon">
              <AiFillCaretDown />
            </span>
          </div>

          <div className="divider"></div>

          <div className="search">
            <span id="search-icon">
              <CiSearch />
            </span>
            <input type="text" placeholder="Search for restaurants, dishes, or cuisines" />
            {searchValue && (
              <div className="search-bar-items-container">
                {searchBarItems.length > 0 ? (
                  <div className="search-bar-items">
                    {searchBarItems.map((item, index) => (
                      <GenerateSearchBarItem
                        restaurant={item}
                        key={index}
                        setSearchValue={setSearchValue}
                        setDisplayBar={setDisplayBar}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="not-match-container">
                    <p className="oops">Oops!</p>
                    <span className="text">We could not understand what you mean, try rephrasing the query.</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {signUp && createPortal(<Signup setLogIn={setLogIn} setSignUp={setSignUp} />, document.getElementById("portal"))}
      {logIn && createPortal(<Login setLogIn={setLogIn} setSignUp={setSignUp} />, document.getElementById("portal"))}
    </header>
  );
};

export default Header;
