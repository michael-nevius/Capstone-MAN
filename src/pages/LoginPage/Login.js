import { enc } from "crypto-js";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseURL } from "../../utils/api/baseURL";
import { encryptData } from "../../utils/crypto-js/crypto-js";
import "./../../css/login.scss";

const Login = () => {
  const [loginFormErrors, setLoginFormErrors] = useState({});
  const [loginFormValue, setLoginFormValue] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isError, setIsError] = useState(false);
  const [loginMsg, setLoginMsg] = useState("");
  useEffect(() => {
    if (isSubmit) {
      callLoginApi();
    }
  }, [isSubmit]);

  const loginFormValidate = (values) => {
    const errors = {};
    const regexEmail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i;
    if (!values.email) {
      errors.email = "Please enter an email";
      setIsSubmit(false);
    } else if (!regexEmail.test(values.email)) {
      errors.email = "Invalid Email id";
      setIsSubmit(false);
    } else if (!values.password) {
      errors.password = "Please enter password";
      setIsSubmit(false);
    } else {
      errors.email = "";
      errors.password = "";
      if (!isError) {
        setIsSubmit(true);
      }
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginFormErrors(loginFormValidate(loginFormValue));
  };

  const callLoginApi = () => {
    fetch(
      baseURL +
        `login?Email=${loginFormValue.email}&Password=${loginFormValue.password}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        const { status, parentsData, eventsData } = res;
        // console.log("api called", res);
        if (status === 400) {
          setLoginMsg("Invalid Credentials");
          return;
        }
        if (status === 200) {
          const { ApprovalStatus } = parentsData;
          // console.log("ddddd", parentsData);

          // if (!ApprovalStatus) {
          //   window.location.pathname = "/pending";
          // }
          //   const { user } = data;
          const originalID = {
            userData: parentsData,
            eventData: eventsData,
          };
          const salt =
          process.env.SALT || "6d090796-ecdf-11ea-adc1-0242ac112345";
          const encryptedData = encryptData(originalID, salt);
          localStorage.setItem("loginuser", encryptedData);

          if (!ApprovalStatus) {
            window.location.pathname = "/pending";
          } else {
            window.location.pathname = "/p/dashboard/home";
          }

          const { EventId } = eventsData;
          
          
          if (localStorage.getItem("popup") == undefined) {
            if(localStorage.getItem("EventRegistereId") == EventId && localStorage.getItem("userIdLoggedIn") == originalID.userData.ParentId){
              localStorage.setItem("popup", undefined);
            }else{
              localStorage.setItem("popup", EventId);
            }              
          } else {
            if (EventId == localStorage.getItem("EventRegistereId") && localStorage.getItem("userIdLoggedIn") == originalID.userData.ParentId) {
              localStorage.setItem("popup", undefined);
            } else {
              console.log(originalID.userData.ParentId);
              localStorage.setItem("popup", EventId);
            }
          }

          localStorage.setItem("EventRegistereId",EventId);
          localStorage.setItem("userIdLoggedIn", originalID.userData.ParentId);
              
        } else {
          setTimeout(() => {
            setLoginFormErrors({});
            setIsSubmit(false);
          }, 2000);
        }
      })
      .catch((error) => {
        // console.log(error);
        console.clear();
      });
    setIsSubmit(false);
  };
  return (
    <section className="login">
      <div className="login-content flex flex-aic flex-jcc">
        <div className="login-content-name">
          <h1 className="logo">T Rex and Friends DayCare</h1>
          <p>
            Welcome to T Rex and Friends DayCare! Please log in or register for an account
          </p>
        </div>
        <form>
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => {
              setLoginFormValue({
                ...loginFormValue,
                email: e.target.value,
              });
              setLoginMsg("");
            }}
          ></input>
          <p>{loginFormErrors.email}</p>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setLoginFormValue({
                ...loginFormValue,
                password: e.target.value,
              });
              setLoginMsg("");
            }}
          ></input>
          <p>{loginFormErrors.password}</p>
          <p>{loginMsg}</p>
          <button
            className="login-content-loginBtn"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Log In
          </button>
          <a href="/signup">Don't have account?</a>
          <hr />
          <button className="login-content-create-accountBtn">
            <Link to="/signup">Create New Account</Link>
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;