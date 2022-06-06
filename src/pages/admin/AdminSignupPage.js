import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseURL } from "../../utils/api/baseURL";
import { encryptData } from "../../utils/crypto-js/crypto-js";
const AdminSignupPage = () => {
  const [signupFormErrors, setSignupFormErrors] = useState({});
  const [signupFormValue, setSignupFormValue] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isError, setIsError] = useState(false);
  const current = new Date();
  const date = `${current.getDate()}-${
    current.getMonth() + 1
  }-${current.getFullYear()}`;

  useEffect(() => {
    if (isSubmit) {
      callSignupApi();
    }
  }, [isSubmit]);

  const signupFormValidate = (values) => {
    const errors = {};
    const regexEmail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i;
    if (!values.firstName) {
      errors.firstName = "Please enter first name";
      setIsSubmit(false);
    } else if (!values.lastName) {
      errors.lastName = "Please enter last name";
      setIsSubmit(false);
    } else if (!values.Street) {
      errors.Street = "Please enter street";
      setIsSubmit(false);
    } else if (!values.city) {
      errors.city = "Please enter city";
      setIsSubmit(false);
    } else if (!values.state) {
      errors.state = "Please enter state";
      setIsSubmit(false);
    } else if (!values.zipcode) {
      errors.zipcode = "Please enter zipcode";
      setIsSubmit(false);
    } else if (!values.phoneNumber) {
      errors.phoneNumber = "Please enter phone number";
      setIsSubmit(false);
    } else if (!values.email) {
      errors.email = "Please enter an email";
      setIsSubmit(false);
    } else if (!regexEmail.test(values.email)) {
      errors.email = "Invalid Email id";
      setIsSubmit(false);
    } else if (!values.password) {
      errors.password = "please enter password";
      setIsSubmit(false);
    } else {
      errors.firstName = "";
      errors.lastName = "";
      errors.Street = "";
      errors.city = "";
      errors.state = "";
      errors.zipcode = "";
      errors.phoneNumber = "";
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
    setSignupFormErrors(signupFormValidate(signupFormValue));
  };

  const callSignupApi = () => {
    fetch(baseURL + `employeeSignup/`, {
      method: "POST",
      headers: new Headers({
        accept: "application/json",
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        FirstName: signupFormValue.firstName,
        LastName: signupFormValue.lastName,
        Street: signupFormValue.Street,
        State: signupFormValue.state,
        City: signupFormValue.city,
        Zipcode: signupFormValue.zipcode,
        Email: signupFormValue.email,
        PhoneNumber: signupFormValue.phoneNumber,
        Password: signupFormValue.password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        const { status, parentsData } = res;
        if (status === 200) {
          // loginMessage(code);
          const originalID = {
            userData: parentsData,
            auth: true,
          };
          const salt =
            process.env.SALT || "6d090796-ecdf-11ea-adc1-0242ac112345";
          const encryptedData = encryptData(originalID, salt);
          localStorage.setItem("adminuser", encryptedData);
          window.location.href = "/e/dashboard/home";
        } else {
          setTimeout(() => {
            setSignupFormErrors({});
            setIsSubmit(false);
          }, 2000);
        }
      });
  };

  return (
    <section className="signup">
      <div className="signup-content">
        <div className="signup-content-name">
          <h1>Register as Admin</h1>
        </div>
        <form>
          {/* <input
            type="text"
            placeholder="Username"
            onChange={(e) => {
              setSignupFormValue({
                ...signupFormValue,
                userName: e.target.value,
              });
            }}
          ></input>
          <p>{signupFormErrors.userName}</p> */}
          <input
            type="text"
            placeholder="First Name"
            onChange={(e) => {
              setSignupFormValue({
                ...signupFormValue,
                firstName: e.target.value,
              });
            }}
          ></input>
          <p>{signupFormErrors.firstName}</p>
          <input
            type="text"
            placeholder="Last Name"
            onChange={(e) => {
              setSignupFormValue({
                ...signupFormValue,
                lastName: e.target.value,
              });
            }}
          ></input>
          <p>{signupFormErrors.lastName}</p>
          <input
            type="text"
            placeholder="Street"
            onChange={(e) => {
              setSignupFormValue({
                ...signupFormValue,
                Street: e.target.value,
              });
            }}
          ></input>
          <p>{signupFormErrors.Street}</p>
          <input
            type="text"
            placeholder="city"
            onChange={(e) => {
              setSignupFormValue({
                ...signupFormValue,
                city: e.target.value,
              });
            }}
          ></input>
          <p>{signupFormErrors.city}</p>
          <input
            type="text"
            placeholder="state"
            onChange={(e) => {
              setSignupFormValue({
                ...signupFormValue,
                state: e.target.value,
              });
            }}
          ></input>
          <p>{signupFormErrors.state}</p>
          <input
            type="text"
            placeholder="Zipcode"
            onChange={(e) => {
              setSignupFormValue({
                ...signupFormValue,
                zipcode: e.target.value,
              });
            }}
          ></input>
          <p>{signupFormErrors.zipcode}</p>
          <input
            type="text"
            placeholder="Phone Number"
            onChange={(e) => {
              setSignupFormValue({
                ...signupFormValue,
                phoneNumber: e.target.value,
              });
            }}
          ></input>
          <p>{signupFormErrors.phoneNumber}</p>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => {
              setSignupFormValue({
                ...signupFormValue,
                email: e.target.value,
              });
            }}
          ></input>
          <p>{signupFormErrors.email}</p>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setSignupFormValue({
                ...signupFormValue,
                password: e.target.value,
              });
            }}
          ></input>
          <p>{signupFormErrors.password}</p>
          <button className="signup-content-loginBtn" onClick={handleSubmit}>
            Sign up
          </button>
          <Link to="/admin/login">Already have an account?</Link>
        </form>
      </div>
    </section>
  );
};

export default AdminSignupPage;
