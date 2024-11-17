// frontend/src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { Footer } from "./components/Layout/Footer";
import { Navbar } from "./components//Layout/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { Home } from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import { EventPage } from "./pages/EventPage";
import { CreateEventPage } from "./pages/EventPage";
import { AdminPage } from "./pages/AdminPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <EventPage />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Home />} />
        <Route path="/create-event" element={<CreateEventPage />} />
        <Route path="/events/:id" element={<EventPage />} />
        {/* Ajoutez d'autres routes selon les besoins */}
      </Routes>
      <Footer />
      <ToastContainer />
    </Router>
  );
};

export default App;
