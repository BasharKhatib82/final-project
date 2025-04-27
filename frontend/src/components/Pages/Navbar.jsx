import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/check-auth", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setIsLoggedIn(data.loggedIn);
      })
      .catch((error) => {
        console.error("שגיאה בבדיקת התחברות:", error);
      });
  }, []);

  const handleLogout = () => {
    fetch("http://localhost:3000/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then(() => {
        setIsLoggedIn(false);
        navigate("/");
      })
      .catch((error) => {
        console.error("שגיאה בהתנתקות:", error);
      });
  };

  return (
    <div className="navbar">
      <div className="navbar-links">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
        >
          דף ראשי
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
        >
          אודות
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
        >
          צור קשר
        </NavLink>
      </div>
      <Link to="/">
        <img className="logo" src={logo} alt="לוגו" />
      </Link>
      {/* התחברות/התנתקות */}
      <div className="navbar-links-login-out">
        {!isLoggedIn ? (
          <NavLink
            to="/userlogin"
            className={({ isActive }) =>
              isActive ? "active-link" : "inactive-link"
            }
          >
            התחברות
          </NavLink>
        ) : (
          <button onClick={handleLogout} className="logout-button">
            התנתקות
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
