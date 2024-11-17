import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/slices/authSlice";
import "./Navbar.css";

export const Navbar: React.FC = () => {
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="navbar">
      <nav className="navbar__navigation">
        <div className="navbar-left">
          <Link to="/" className="navbar__link">
            Home
          </Link>
          <Link to="/create-event">Create Event</Link>
        </div>
        {token ? (
          <>
            <Link to="/dashboard" className="navbar__link">
              Dashboard
            </Link>
            <button onClick={handleLogout} className="navbar__button">
              Logout
            </button>
          </>
        ) : (
          <>
            <div className="navbar-right">
              <Link to="/login" className="navbar__link">
                Login
              </Link>
              <Link to="/register" className="navbar__link">
                Register
              </Link>
            </div>
          </>
        )}
      </nav>
    </header>
  );
};
