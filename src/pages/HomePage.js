import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import "../App.css";

function HomePage() {
  let navigate = useNavigate();
  useEffect(() => {
    if (
      new Date(localStorage.getItem("expiryDate")).getTime() <
      new Date().getTime()
    ) {
      navigate("/sign-in");
    }
  });
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expiryDate");
    navigate("/sign-in");
  };
  return (
    <div>
      <h2>HomePage</h2>
      <h4>You are authorized</h4>
      <div style={{ width: "40%", float: "left", minWidth: "250px" }}>
        <button className="logout" onClick={logout}>
          Log out
        </button>
      </div>
    </div>
  );
}

export default HomePage;

/**
 * TODO need to add a lot of things
 */
