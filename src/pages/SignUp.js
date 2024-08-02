import React, { useEffect, useState } from "react";
import "../App.css";
import { LuUser2 } from "react-icons/lu";
import { MdLock, MdEmail, MdMarkEmailRead } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import PopUp from "../components/PopUp";

const SignUp = () => {
  const REGEX_EMAIL =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [iconSize, setIconSize] = useState(19);
  const createUser = () => {
    if (
      username.length >= 5 &&
      REGEX_EMAIL.test(email) &&
      password.length >= 8
    ) {
      return fetch("http://localhost:8080/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      })
        .then((res) => {
          console.log(res);
          if (res.status === 422) {
            return alert("The user with this email already exists!");
          }
          alert(
            "You have successfully created an account, You will be redirected to login page!"
          );
          navigate("/sign-in");
          return res.json();
        })
        .then((resData) => {
          console.log(resData);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    if (window.innerWidth > 800) {
      setIconSize(19);
    } else {
      setIconSize(15);
    }
  }, []);
  return (
    <div>
      <div className="form-container">
        <form
          id="signup-form-box"
          className="form-box"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="form-title-container">
            <CgProfile size={125} color="#0082c8" />
          </div>
          <div className="inputs-container">
            <div className="single-input-container">
              <input
                id="username"
                type="text"
                autoComplete="off"
                placeholder="Username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <label
                htmlFor="username"
                className="input-icon"
                style={{
                  top:
                    username.length < 5 && username.length !== 0
                      ? "20%"
                      : "25%",
                }}
              >
                <LuUser2 color="black" size={iconSize} />
              </label>
              <span
                className="helper-alerts"
                style={{
                  display:
                    username.length >= 5 || username.length === 0
                      ? "none"
                      : "initial",
                }}
              >
                Your username looks too short!
              </span>
            </div>
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
              <label
                htmlFor="email"
                className="input-icon"
                style={{
                  top:
                    REGEX_EMAIL.test(email) && email.length !== 0
                      ? "20%"
                      : "25%",
                }}
              >
                {REGEX_EMAIL.test(email) ? (
                  <MdMarkEmailRead color="black" size={iconSize} />
                ) : (
                  <MdEmail color="black" size={iconSize} />
                )}
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
                Your Email does not meet requirements for email!
              </span>
            </div>
            <div className="single-input-container">
              <input
                id="password"
                type="password"
                autoComplete="off"
                placeholder="Password"
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
                Your Password should be at least 8 characters long!
              </span>
            </div>
            <button
              style={{
                color:
                  REGEX_EMAIL.test(email) &&
                  username.length >= 5 &&
                  password.length >= 8
                    ? "white"
                    : "#396afc",
                backgroundColor:
                  REGEX_EMAIL.test(email) &&
                  username.length >= 5 &&
                  password.length >= 8
                    ? "#396afc"
                    : "white",
              }}
              className="authentication-btn"
              onClick={() => {
                if (
                  username.length >= 5 &&
                  REGEX_EMAIL.test(email) &&
                  password.length >= 8
                ) {
                  createUser();
                  setUsername("");
                  setEmail("");
                  setPassword("");
                }
              }}
            >
              Create Account
            </button>
            <div className="suggestions-container">
              <span onClick={() => navigate("/sign-in")}>
                Already have an account ? Log in
              </span>
            </div>
          </div>
        </form>
      </div>
      <PopUp />
    </div>
  );
};

export default SignUp;

/**
 *TODO need to check everything in this file, to simplify the code and everything
 */
