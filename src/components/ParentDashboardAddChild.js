import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { baseURL } from "../utils/api/baseURL";
import "./../css/parentDashboardAddChild.scss";
import ToastMsg from "./ToastMsg";
const ParentDashboardAddChild = () => {
  const outletData = useOutletContext();
  const { setNavbarTitle } = outletData;
  const [addChildFormErrors, setAddChildFormErrors] = useState({});
  const [addChildFormValue, setAddChildFormValue] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isError, setIsError] = useState(false);
  const { userID } = outletData;
  const [toastMsg, setToastMsg] = useState(false);
  useEffect(() => {
    setNavbarTitle("Add Children");
    if (isSubmit) {
      callAddChildApi();
    }
  }, [isSubmit]);

  const addChildFormValidate = (values) => {
    const errors = {};
    const regexEmail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i;
    if (!values.firstName) {
      errors.firstName = "Please enter first name";
      setIsSubmit(false);
    } else if (!values.lastName) {
      errors.lastName = "Please enter last name";
      setIsSubmit(false);
    } else if (!values.age) {
      errors.Street = "Please enter age";
      setIsSubmit(false);
    } else if (!values.parentFirstName) {
      errors.spouseFirstName = "Please enter parent first name";
      setIsSubmit(false);
    } else if (!values.parentLastName) {
      errors.spouseLastName = "Please enter parent last name";
      setIsSubmit(false);
    } else {
      errors.firstName = "";
      errors.lastName = "";
      errors.age = "";
      errors.parentFirstName = "";
      errors.parentLastName = "";
      if (!isError) {
        setIsSubmit(true);
      }
    }
    return errors;
  };

  const callAddChildApi = () => {
    fetch(baseURL + `addChildren/`, {
      method: "POST",
      headers: new Headers({
        accept: "application/json",
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        ParentId: userID.userData.ParentId,
        FirstName: addChildFormValue.firstName,
        LastName: addChildFormValue.lastName,
        ParentFirstName: addChildFormValue.parentFirstName,
        ParentLastName: addChildFormValue.parentLastName,
        Age: addChildFormValue.age,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        const { status } = res;
        if (status === 200) {
          setToastMsg(true);
          setTimeout(() => {
            setToastMsg(false);
            window.location.pathname = "/p/dashboard/home";
          }, 3000);
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAddChildFormErrors(addChildFormValidate(addChildFormValue));
  };

  return (
    <section className="parentDashboardAddChild">
      <form>
        <label>Child First Name</label>
        <input
          type="text"
          placeholder="First Name"
          onChange={(e) => {
            setAddChildFormValue({
              ...addChildFormValue,
              firstName: e.target.value,
            });
          }}
        ></input>
        <p>{addChildFormErrors.firstName}</p>
        <label>Child Last Name</label>
        <input
          type="text"
          placeholder="Last Name"
          onChange={(e) => {
            setAddChildFormValue({
              ...addChildFormValue,
              lastName: e.target.value,
            });
          }}
        ></input>
        <p>{addChildFormErrors.lastName}</p>
        <label>Child Age</label>
        <input
          type="text"
          placeholder="Age"
          onChange={(e) => {
            setAddChildFormValue({
              ...addChildFormValue,
              age: e.target.value,
            });
          }}
        ></input>
        <p>{addChildFormErrors.age}</p>
        <label>Parent First Name</label>
        <input
          type="text"
          placeholder="first name"
          onChange={(e) => {
            setAddChildFormValue({
              ...addChildFormValue,
              parentFirstName: e.target.value,
            });
          }}
        ></input>
        <p>{addChildFormErrors.parentFirstName}</p>
        <label>Parent Last Name</label>
        <input
          type="text"
          placeholder="last name"
          onChange={(e) => {
            setAddChildFormValue({
              ...addChildFormValue,
              parentLastName: e.target.value,
            });
          }}
        ></input>
        <p>{addChildFormErrors.parentLastName}</p>
        <button
          className="parentDashboardAddChild-create-accountBtn"
          onClick={handleSubmit}
        >
          Continue
        </button>
      </form>
      {toastMsg && (
        <>
          <ToastMsg msg="Child Added Succesfully!" />
        </>
      )}
    </section>
  );
};

export default ParentDashboardAddChild;
