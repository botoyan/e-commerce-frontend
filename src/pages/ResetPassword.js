import React, { useEffect, useState } from "react";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdLock } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import "../App.css";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [iconSize, setIconSize] = useState(19);
  const { userId } = useParams();
  let navigate = useNavigate();
  useEffect(() => {
    if (window.innerWidth > 800) {
      setIconSize(19);
    } else {
      setIconSize(15);
    }
  }, []);
  const changePassword = () => {
    if (
      password.length === 0 ||
      confirmPassword.length === 0 ||
      password.length < 8 ||
      password !== confirmPassword
    ) {
      return;
    }
    fetch("http://localhost:8080/auth/change-password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        userId: userId,
      }),
    });
    setTimeout(() => {
      alert(
        "You have successfully changed your password, you will be redirected to the login page!"
      );
      return navigate("/sign-in");
    }, 250);
  };
  return (
    <div>
      <div className="form-container">
        <form
          id="reset-password-form-box"
          className="form-box"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="form-title-container">
            <RiLockPasswordFill size={150} color="0082c8" />
          </div>
          <div className="inputs-container">
            <div className="single-input-container">
              <input
                id="password"
                type="password"
                autoComplete="off"
                placeholder="New Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {password ? (
                ""
              ) : (
                <label htmlFor="password" className="input-icon">
                  <MdLock color="black" size={iconSize} />
                </label>
              )}

              <span
                className="helper-alerts"
                style={{
                  display:
                    password.length >= 8 || password.length === 0
                      ? "none"
                      : "initial",
                }}
              >
                Your New Password needs to be 8 characters long!
              </span>
            </div>
            <div className="single-input-container">
              <input
                id="confirmPassword"
                type="password"
                autoComplete="off"
                placeholder="Confirm the Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
              {confirmPassword ? (
                ""
              ) : (
                <label htmlFor="confrimPassword" className="input-icon">
                  <MdLock color="black" size={iconSize} />
                </label>
              )}

              <span
                className="helper-alerts"
                style={{
                  display:
                    password === confirmPassword || confirmPassword.length === 0
                      ? "none"
                      : "initial",
                }}
              >
                Your Password needs to match!
              </span>
            </div>
            <button
              className="authentication-btn"
              type="submit"
              style={{
                color:
                  password.length >= 8 && password === confirmPassword
                    ? "white"
                    : "#396afc",
                backgroundColor:
                  password.length >= 8 && password === confirmPassword
                    ? "#396afc"
                    : "white",
              }}
              onClick={() => {
                changePassword();
                setTimeout(() => {
                  setPassword("");
                  setConfirmPassword("");
                }, 100);
              }}
            >
              Reset the Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
