import React, { useEffect, useState } from "react";
import pdf from "../images/pdf.png";
import "../css/employeeDashboardChildDocs.scss";
import { baseURL } from "../utils/api/baseURL";

const EmployeeDashboardChildDocs = ({ setDocumentsModal, childId }) => {
  const [childWorkData, setChildWorkData] = useState(null);
  const [FileData, setFileData] = useState(null);
  const [trigger, setTrigger] = useState(0);
  const current = new Date();
  const date = `${current.getDate()}-${
    current.getMonth() + 1
  }-${current.getFullYear()}`;

  useEffect(() => {
    const callChildDocAPI = () => {
      fetch(baseURL + `getChildrenWorkByChildrenId/${childId}/`, {
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
  }, [trigger]);

  const callUploadFileAPI = () => {
    const fData = new FormData();
    // console.log(FileData);
    fData.append("DocPath", FileData);
    fData.append("ChildId", childId);
    fData.append("DateOfSubmission", date);

    fetch(baseURL + `addChildrensWork/`, {
      method: "POST",
      headers: {
        accept: "application/json",
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      body: fData,
    })
      .then((res) => res.json())
      .then((res) => {
        const { status } = res;
        if (status === 200) {
          setTrigger((c) => c + 1);
        }
      });
  };

  const handleFile = (event) => {
    setFileData(event.target.files[0]);
  };

  return (
    <section className="employeeDashboardChildDocs">
      <div className="employeeDashboardChildDocs-wrapper flex flex-aic flex-jcc">
        <div className="employeeDashboardChildDocs-modal">
          <div className="employeeDashboardChildDocs-modal-close">
            <i
              class="bx bx-x"
              onClick={() => {
                setDocumentsModal(false);
              }}
            ></i>
          </div>
          <div className="employeeDashboardChildDocs-modal-attendence">
            <div className="employeeDashboardChildDocs-modal-header flex flex-jcsb">
              <p>Attendance, Disciplinary Reports, Projects, Billings</p>
              <div className="employeeDashboardChildDocs-modal-header-addbtn">
                <input
                  id="file-upload"
                  type="file"
                  name="upload"
                  accept="application/pdf,application/vnd.ms-excel"
                  onChange={(event) => {
                    handleFile(event);
                  }}
                />
                <button
                  className="custom-file-upload"
                  onClick={() => {
                    callUploadFileAPI();
                  }}
                >
                  + Upload
                </button>
              </div>
            </div>

            <div className="employeeDashboardChildDocs-modal-attendence-file flex">
              {childWorkData === null ? (
                <>
                  <p>No Documents Available</p>
                </>
              ) : (
                childWorkData.map((doc, idx) => {
                  return (
                    <>
                      <div className="employeeDashboardChildDocs-modal-attendence-file-item">
                        <a
                          href={`${baseURL}Documents/${doc.DocPath}`}
                          download
                          target="_blank"
                        >
                          <div className="employeeDashboardChildDocs-modal-attendence-file-item-imgbox">
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
        </div>
      </div>
    </section>
  );
};

export default EmployeeDashboardChildDocs;
