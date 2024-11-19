// frontend/src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { Footer } from "./components/Layout/Footer";
import { Navbar } from "./components//Layout/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { Home } from "./pages/HomePage";
import { DisplayEventsPage } from "./pages/FetchEventsPage";
import { CreateEventPage } from "./pages/EventCreationFormPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/create-event" element={<CreateEventPage />} />
        <Route path="/events" element={<DisplayEventsPage />} />
        <Route path="/events/:id" element={<DisplayEventsPage />} />
        {/* Ajoutez d'autres routes selon les besoins */}
      </Routes>
      <Footer />
      <ToastContainer />
    </Router>
  );
};

export default App