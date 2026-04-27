import React, { useEffect, useState } from "react";
import axios from "axios";
import Styles from "./viewlawyer.module.css";

const ViewLawyer = () => {
  const [lawyers, setLawyers] = useState([]);

  // Fetch lawyers
  const fetchLawyers = () => {
    axios
      .get("http://127.0.0.1:8000/Lawyer/")
      .then((res) => {
        console.log("Fetched lawyers:", res.data.lawyers); // Debugging
        setLawyers(res.data.lawyers || []);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchLawyers();
  }, []);

  // Update lawyer status
  const updateStatus = (id, status) => {
    axios
      .put(`http://127.0.0.1:8000/lawyerupdate/${id}/`, {
        lawyer_status: status,
      })
      .then(() => fetchLawyers())
      .catch((err) => console.error(err));
  };

  // Filters
  const pendingLawyers = lawyers.filter((l) => Number(l.lawyer_status) === 0);
  const acceptedLawyers = lawyers.filter((l) => Number(l.lawyer_status) === 1);
  const rejectedLawyers = lawyers.filter((l) => Number(l.lawyer_status) === 2);

  // Helper to display place safely
  const displayPlace = (l) => l.place_name  ;

  return (
    <div className={Styles.page}>
      <div className={Styles.container}>
        <div className={Styles.card}>

          {/* Pending Lawyers */}
          <h2>Pending Lawyers</h2>
          <table className={Styles.table}>
            <thead>
              <tr>
                <th>Sl No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Photo</th>
                <th>Place</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {pendingLawyers.length > 0 ? (
                pendingLawyers.map((l, i) => (
                  <tr key={l.id}>
                    <td>{i + 1}</td>
                    <td>{l.lawyer_name}</td>
                    <td>{l.lawyer_email}</td>
                    <td>
                      {l.lawyer_photo ? (
                        <img
                          src={`http://127.0.0.1:8000/${l.lawyer_photo}`}
                          width="60"
                          alt="lawyer"
                        />
                      ) : (
                        "No Photo"
                      )}
                    </td>
                    <td>{displayPlace(l)}</td>
                    <td>
                      <button
                        className={Styles.Btnaccept}
                        onClick={() => updateStatus(l.id, 1)}
                      >
                        Accept
                      </button>
                      <button
                        className={Styles.Btnreject}
                        onClick={() => updateStatus(l.id, 2)}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" align="center">
                    No pending lawyers
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <br />

          {/* Accepted Lawyers */}
          <h2>Accepted Lawyers</h2>
          <table className={Styles.table}>
            <thead>
              <tr>
                <th>Sl No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Photo</th>
                <th>Place</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {acceptedLawyers.length > 0 ? (
                acceptedLawyers.map((l, i) => (
                  <tr key={l.id}>
                    <td>{i + 1}</td>
                    <td>{l.lawyer_name}</td>
                    <td>{l.lawyer_email}</td>
                    <td>
                      {l.lawyer_photo ? (
                        <img
                          src={`http://127.0.0.1:8000/${l.lawyer_photo}`}
                          width="60"
                          alt="lawyer"
                        />
                      ) : (
                        "No Photo"
                      )}
                    </td>
                    <td>{displayPlace(l)}</td>
                    <td>
                      <span className={Styles.accepted}>Accepted</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" align="center">
                    No accepted lawyers
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <br />

          {/* Rejected Lawyers */}
          <h2>Rejected Lawyers</h2>
          <table className={Styles.table}>
            <thead>
              <tr>
                <th>Sl No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Photo</th>
                <th>Place</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rejectedLawyers.length > 0 ? (
                rejectedLawyers.map((l, i) => (
                  <tr key={l.id}>
                    <td>{i + 1}</td>
                    <td>{l.lawyer_name}</td>
                    <td>{l.lawyer_email}</td>
                    <td>
                      {l.lawyer_photo ? (
                        <img
                          src={`http://127.0.0.1:8000/${l.lawyer_photo}`}
                          width="60"
                          alt="lawyer"
                        />
                      ) : (
                        "No Photo"
                      )}
                    </td>
                    <td>{displayPlace(l)}</td>
                    <td>
                      <span className={Styles.rejected}>Rejected</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" align="center">
                    No rejected lawyers
                  </td>
                </tr>
              )}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
};

export default ViewLawyer;