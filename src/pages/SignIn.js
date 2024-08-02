import React, { useEffect, useState } from "react";
import "../App.css";
import { CgProfile } from "react-icons/cg";
import { LuUser2 } from "react-icons/lu";
import { MdLock } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import PopUp from "../components/PopUp";

const SignIn = () => {
  const REGEX_EMAIL =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [iconSize, setIconSize] = useState(22);
  const [modalShow, setModalShow] = useState(false);
  useEffect(() => {
    if (window.innerWidth > 800) {
      setIconSize(19);
    } else {
      setIconSize(15);
    }
  }, []);
  const handleClose = () => {
    setModalShow(false);
  };
  const handleOpen = () => {
    setModalShow(true);
  };
  const login = () => {
    if (REGEX_EMAIL.test(email) && password.length >= 8) {
      fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((res) => {
          if (res.status === 401) {
            return alert("Your email or password was incorrect!");
          } else {
            navigate("/");
          }
          return res.json();
        })
        .then((res) => {
          if (res.token && res.userId) {
            localStorage.setItem("token", res.token);
            localStorage.setItem("userId", res.userId);
            const remainingMilliseconds = 1000 * 60 * 60 * 2;
            const expiryDate = new Date(
              new Date().getTime() + remainingMilliseconds
            );
            localStorage.setItem("expiryDate", expiryDate.toISOString());
            console.log(res);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div>
      <div className="form-container">
        <form
          id="login-form-box"
          className="form-box"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="form-title-container">
            <CgProfile size={150} color="#0082c8" />
          </div>
          <div className="inputs-container">
            <div className="single-input-container">
              <input
                id="email"
                type="text"
                autoComplete="off"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label htmlFor="email" className="input-icon">
                <LuUser2 color="black" size={iconSize} />
              </label>
              <span
                className="helper-alerts"
                style={{
                  display:
                    REGEX_EMAIL.test(email) || email.length === 0
                      ? "none"
                      : "initial",
                }}
              >
                Your email looks invalid!
              </span>
            </div>
            <div className="single-input-container">
              <input
                type="password"
                autoComplete="off"
                placeholder="Password"
                id="password"
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
                Your password looks too short!
              </span>
            </div>
            <div className="suggestions-container">
              <span onClick={handleOpen}>Forgot Password ?</span>
            </div>
            <button
              className="authentication-btn"
              type="submit"
              style={{
                color:
                  REGEX_EMAIL.test(email) && password.length >= 8
                    ? "white"
                    : "#396afc",
                backgroundColor:
                  REGEX_EMAIL.test(email) && password.length >= 8
                    ? "#396afc"
                    : "white",
              }}
              onClick={() => {
                login();
                setTimeout(() => {
                  setEmail("");
                  setPassword("");
                }, 100);
              }}
            >
              Login
            </button>
          </div>
          <div className="suggestions-container">
            <span
              onClick={() => {
                navigate("/sign-up");
              }}
            >
              Don't have an account ? Register
            </span>
          </div>
        </form>
      </div>
      <PopUp show={modalShow} handleClose={handleClose} />
    </div>
  );
};

/**
 * TODO need to check everything, simplify the code and everything
 */

export default SignIn;
