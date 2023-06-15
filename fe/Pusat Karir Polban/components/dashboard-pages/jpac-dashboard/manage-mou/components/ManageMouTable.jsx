import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const JobListingsTable = () => {
  const [jobs, setJobs] = useState([]);
  const [statusChanges, setStatusChanges] = useState([]);

  const postStatus = (id, status) => {
    axios
      .put(`https://6482fef0f2e76ae1b95bcbd3.mockapi.io/pusatkarirpolban/applied/${id}`, { status })
      .then((response) => {
        const updatedJobs = jobs.map((job) =>
          job.id === id ? { ...job, status: response.data.status } : job
        );
        setJobs(updatedJobs);
        setStatusChanges([...statusChanges, id]);
        console.log(`Status berhasil diubah menjadi ${status}`);
      })
      .catch((error) => console.log(error));
  };

  const deleteJob = (id) => {
    axios
      .delete(`https://6482fef0f2e76ae1b95bcbd3.mockapi.io/pusatkarirpolban/applied/${id}`)
      .then(() => {
        const updatedJobs = jobs.filter((job) => job.id !== id);
        setJobs(updatedJobs);
        setStatusChanges([...statusChanges, id]);
        console.log("MoU berhasil ditolak");
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    axios
      .get("https://6482fef0f2e76ae1b95bcbd3.mockapi.io/pusatkarirpolban/applied")
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleEdit = (item) => {
    const confirmed = window.confirm("Apakah Anda yakin untuk mengaktivasi akun perusahaan?");
    if (confirmed) {
      postStatus(item.id, "verified");
      const updatedJobs = jobs.filter((job) => job.id !== item.id);
      setJobs(updatedJobs);
    }
  };  

  const handleReject = (item) => {
    const confirmed = window.confirm("Apakah Anda yakin untuk menolak aktivasi akun perusahaan?");
    if (confirmed) {
      deleteJob(item.id);
    }
  };

  function getFileNameFromURL(url) {
    if (typeof url === "string") {
      const parts = url.split("/");
      return parts.pop();
    }
    return "";
  }

  const renderActionButton = (item) => {
  if (item.status !== "not verified" || statusChanges.includes(item.id)) {
    return (
      <div className="option-box">
        <ul className="option-list">
          <li>
            <button data-text="Terima" onClick={() => handleEdit(item)}>
              <span className="la la-check"></span>
            </button>
          </li>
          <li>
            <button data-text="Tolak" onClick={() => handleReject(item)}>
              <span className="la la-remove"></span>
            </button>
          </li>
        </ul>
      </div>
    );
  } else {
    return (
      <div className="option-box">
        <ul className="option-list">
          <li>
            <button data-text="Terima" onClick={() => handleEdit(item)}>
              <span className="la la-check"></span>
            </button>
          </li>
          <li>
            <button data-text="Tolak" onClick={() => handleReject(item)}>
              <span className="la la-remove"></span>
            </button>
          </li>
        </ul>
      </div>
    );
  }
};


  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>Daftar Perusahaan yang belum diaktivasi</h4>
        <div className="chosen-outer">
          {/* <!--Tabs Box--> */}
          <select className="chosen-single form-select">
            <option>Last 6 Months</option>
            <option>Last 12 Months</option>
            <option>Last 16 Months</option>
            <option>Last 24 Months</option>
            <option>Last 5 year</option>
          </select>
        </div>
      </div>
      {/* End filter top bar */}
      {/* Start table widget content */}
      <div className="widget-content">
        <div className="table-outer">
          <table className="default-table manage-job-table">
            <thead>
              <tr>
                <th>Nama Perusahaan</th>
                <th>MoU</th>
                <th>Created</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((item) => (
                <tr key={item.id}>
                  <td>
                    {/* <!-- Job Block --> */}
                    <div className="job-block">
                      <div className="inner-box">
                        <div className="content">
                          <span className="company-logo">
                            <img src={item.logo} alt="logo" />
                          </span>
                          <h4>{item.namaperusahaan}</h4>
                          <ul className="job-info">
                            <li>
                              <span className="icon flaticon-map-locator"></span>
                              {item.alamat}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="document">
                    <a href={item.mou} download={getFileNameFromURL(item.mou)}>
                      {getFileNameFromURL(item.mou)}
                    </a>
                  </td>
                  <td>
                    <a>{item.created}</a>
                  </td>
                  <td
                    className="status"
                    style={{
                      color: item.status === "verified" ? "green" : "red",
                    }}
                  >
                    {item.status || "Belum di verifikasi"}
                  </td>
                  <td>{renderActionButton(item)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* End table widget content */}
    </div>
  );
};

export default JobListingsTable;
