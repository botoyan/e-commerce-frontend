import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import HomePage from "./pages/HomePage";
import ResetPassword from "./pages/ResetPassword";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="/reset-password/:userId" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

/**
 * TODO need to add protected routes
 * TODO need to add popups instead of alerts to make it more beautiful
 */
