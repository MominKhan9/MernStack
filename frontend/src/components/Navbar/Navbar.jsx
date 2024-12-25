import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin, setSearchQuery }) => {
  const [menu, setMenu] = useState("menu");
  const [searchText, setSearchText] = useState(""); // Track the search input
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const clearSearch = () => {
    setSearchText(""); // Clear the input field
    setSearchQuery(""); // Reset the search query
  };

  return (
    <div className='navbar'>
      <Link to={"/"}>
        <img src={assets.logo} alt="" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link to="/" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
        <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
        <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</a>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
      </ul>
      <div className="navbar-right">
        <div className="navbar-search-icon" style={{ position: "relative" }}>
          <img
            src={assets.search_icon}
            alt="Search Icon"
            style={{ cursor: "pointer" }}
          />
          {/* Search Dropdown */}
          <div className="search-dropdown">
            <input
              type="text"
              placeholder="Search for food items..."
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value); // Update search text
                setSearchQuery(e.target.value); // Update search query in real-time
              }}
            />
            {searchText && (
              <button className="clear-btn" onClick={clearSearch}>Clear</button>
            )}
          </div>
          
        </div>
        <div className="basket">
        <Link to='/cart'>
          <img src={assets.basket_icon} alt="Basket Icon" />
        </Link>
        <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate("/myorders")} >
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
