import React, { useEffect } from "react";
import { useNavigate } from "react-router";

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
  return (
    <div>
      <h2>HomePage</h2>
      <h4>You are authorized</h4>
    </div>
  );
}

export default HomePage;
