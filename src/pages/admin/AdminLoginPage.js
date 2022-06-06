import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseURL } from "../../utils/api/baseURL";
import { encryptData } from "../../utils/crypto-js/crypto-js";

const AdminLoginPage = () => {
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
        `employeeLogin?Email=${loginFormValue.email}&Password=${loginFormValue.password}`,
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
        const { status, employeeData } = res;
        // console.log("api called", res);
        if (status === 400) {
          setLoginMsg("Invalid Credentials");
          return;
        }
        if (status === 200) {
          const originalID = {
            userData: employeeData,
            auth: true,
          };
          const salt =
            process.env.SALT || "6d090796-ecdf-11ea-adc1-0242ac112345";
          const encryptedData = encryptData(originalID, salt);
          localStorage.setItem("adminuser", encryptedData);
          window.location.pathname = "/e/dashboard/home";
        } else {
          setTimeout(() => {
            setLoginFormErrors({});
            setIsSubmit(false);
          }, 2000);
        }
      })
      .catch((error) => {
        // console.log(error);
      });
    setIsSubmit(false);
  };

  return (
    <section className="login">
      <div className="login-content flex flex-aic flex-jcc">
        <div className="login-content-name">
          <h1 className="logo" style={{ fontSize: "40px" }}>
            Employee DayCare
          </h1>
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
            <Link to="/admin/signup">Create New Account</Link>
          </button>
        </form>
      </div>
    </section>
  );
};

export default AdminLoginPage;
