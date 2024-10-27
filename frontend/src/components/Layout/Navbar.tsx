import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/slices/authSlice";
import "./Navbar.css"

export const Navbar: React.FC = () => {
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="navbar">
    <nav className="navbar__navigation">
      <Link to="/" className="navbar__link">Home</Link>
      {token ? (
        <>
          <Link to="/dashboard" className="navbar__link">Dashboard</Link>
          <button onClick={handleLogout} className="navbar__button">Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" className="navbar__link">Login</Link>
          <Link to="/register" className="navbar__link">Register</Link>
        </>
      )}
    </nav>
  </header>
  );
};
