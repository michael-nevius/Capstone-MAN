import React, { useEffect, useState } from "react";
import pdf from "../images/pdf.png";
import "../css/parentDashboardChildDocs.scss";
import { baseURL } from "../utils/api/baseURL";

const ParentDashboardChildDocs = ({ setDocumentsModal, childDocs }) => {
  // console.log("childId", childDocs);
  const [childWorkData, setChildWorkData] = useState(null);
  useEffect(() => {
    const callChildDocAPI = () => {
      fetch(baseURL + `getChildrenWorkByChildrenId/${childDocs}/`, {
        method: "GET",
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          const { status, childrensWorkData } = res;

          if (status === 200) {
            setChildWorkData(childrensWorkData);
          } else {
            // setChildWorkData(null);
          }
        })
        .catch((error) => {
          // console.log(error);
          console.clear();
        });
    };
    callChildDocAPI();
  }, []);
  return (
    <section className="parentDashboardChildDocs">
      <div className="parentDashboardChildDocs-wrapper flex flex-aic flex-jcc">
        <div className="parentDashboardChildDocs-modal">
          <div className="parentDashboardChildDocs-modal-close">
            <i
              class="bx bx-x"
              onClick={() => {
                setDocumentsModal(false);
              }}
            ></i>
          </div>
          <div className="parentDashboardChildDocs-modal-attendence">
            <p className="parentDashboardChildDocs-modal-header">
              Attendance, Disciplinary Reports, Projects, Billings
            </p>
            <div className="parentDashboardChildDocs-modal-attendence-file flex">
              {childWorkData === null ? (
                <>
                  <p>No Documents Available</p>
                </>
              ) : (
                childWorkData.map((doc, idx) => {
                  return (
                    <>
                      <div className="parentDashboardChildDocs-modal-attendence-file-item">
                        <a
                          href={`${baseURL}Documents/${doc.DocPath}`}
                          download
                          target="_blank"
                        >
                          <div className="parentDashboardChildDocs-modal-attendence-file-item-imgbox">
                            <img src={pdf}></img>
                          </div>
                          <p>{doc.DocPath}</p>
                          <p>{doc.DateOfSubmission}</p>
                        </a>
                      </div>
                    </>
                  );
                })
              )}
            </div>
          </div>
          {/* <div className="parentDashboardChildDocs-modal-reports">
            <p className="parentDashboardChildDocs-modal-header">
              Disciplinary Reports
            </p>
            <div className="parentDashboardChildDocs-modal-attendence-file">
              <div className="parentDashboardChildDocs-modal-attendence-file-item">
                <div className="parentDashboardChildDocs-modal-attendence-file-item-imgbox">
                  <img src={pdf}></img>
                </div>
                <p>10-5-2022</p>
              </div>
            </div>
          </div>
          <div className="parentDashboardChildDocs-modal-projects">
            <p className="parentDashboardChildDocs-modal-header">Projects</p>
            <div className="parentDashboardChildDocs-modal-attendence-file">
              <div className="parentDashboardChildDocs-modal-attendence-file-item">
                <div className="parentDashboardChildDocs-modal-attendence-file-item-imgbox">
                  <img src={pdf}></img>
                </div>
                <p>10-5-2022</p>
              </div>
            </div>
          </div>
          <div className="parentDashboardChildDocs-modal-billings">
            <p className="parentDashboardChildDocs-modal-header">Billings</p>
            <div className="parentDashboardChildDocs-modal-attendence-file">
              <div className="parentDashboardChildDocs-modal-attendence-file-item">
                <div className="parentDashboardChildDocs-modal-attendence-file-item-imgbox">
                  <img src={pdf}></img>
                </div>
                <p>10-5-2022</p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default ParentDashboardChildDocs;
