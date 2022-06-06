import React from "react";
import "../css/parentApplicationApproval.scss";
const ParentApplicationApproval = () => {
  return (
    <section className="parentApplicationApproval flex flex-aic flex-jcc">
      <div className="parentApplicationApprovalDiv">
        <i class="bx bx-loader"></i>
        <p>Pending</p>
        <p>Your application is not approved yet.</p>
      </div>
    </section>
  );
};

export default ParentApplicationApproval;
