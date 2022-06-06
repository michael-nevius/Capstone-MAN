import React from "react";
import { Link } from "react-router-dom";
import "./../../../css/parentDashboardStartPage.scss";


const ParentDashboardStartPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("helloji");
    window.location.pathname = "/p/dashboard/";
  };
  return (
    <section className="parentDashboardStartPage">
      <div className="parentDashboardStartPage-content">
        <div className="parentDashboardStartPage-content-name">
          <h1>Please fill in childrens information</h1>
        </div>
        <form>
          <label>children First Name</label>
          <input type="text" placeholder="first name"></input>
          <label>children Last Name</label>
          <input type="text" placeholder="last name"></input>
          <label>parent first name</label>
          <input type="text" placeholder="last name"></input>
          <label>parent last name</label>
          <input type="text" placeholder="last name"></input>
          <label>children Age</label>
          <input type="text" placeholder="Age"></input>
          <label>Date of Birth</label>
          <input type="date" placeholder="Date Of Birth"></input>
          <label>Gender</label>
          <select>
            <option value="null">-- Select Gender --</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <button
            className="parentDashboardStartPage-content-create-accountBtn"
            onClick={handleSubmit}
          >
            Continue
          </button>
        </form>
      </div>
    </section>
  );
};

export default ParentDashboardStartPage;
