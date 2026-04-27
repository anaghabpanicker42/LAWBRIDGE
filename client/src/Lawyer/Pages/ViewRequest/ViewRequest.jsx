import React, { useEffect, useState } from "react";
import axios from "axios";
import Styles from "./viewrequest.module.css";
import { Link, useNavigate } from "react-router";

const ViewRequest = () => {

  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  const lawyerId = sessionStorage.getItem("lawyer_id");

  const fetchRequests = () => {
    axios
      .get(`http://127.0.0.1:8000/Request/?lawyer_id=${lawyerId}`)
      .then((res) => setRequests(res.data.requests || []))
      .catch((err) => console.log(err));
  };

// ACCEPT REQUEST
  const handleAccept = (request) => {
    axios
      .put(
        `http://127.0.0.1:8000/requestupdate/${request.id}/`,
        { request_status: 1 }, // send JSON instead of FormData
        { headers: { "Content-Type": "application/json" } }
      )
      .then(() => {
        fetchRequests();
        navigate(`/lawyer/leveltype/${request.id}`);
      })
      .catch((err) => console.log(err));
  };

  // REJECT REQUEST
  const handleReject = (id) => {
    axios
      .put(
        `http://127.0.0.1:8000/requestupdate/${id}/`,
        { request_status: 2 }, // send JSON instead of FormData
        { headers: { "Content-Type": "application/json" } }
      )
      .then(() => fetchRequests())
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (lawyerId) {
      fetchRequests();
    }
  }, []);

  return (
    <div className={Styles.page}>

      <h2>Requests</h2>

      <table className={Styles.table}>

        <thead>
          <tr>
            <th>Sl No</th>
            <th>File</th>
            <th>Date</th>
            <th>Mode</th>
            <th>Payment</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {requests.length > 0 ? (
            requests.map((r, i) => (

              <tr key={r.id}>

                <td>{i + 1}</td>

                {/* File */}
                <td>
                  {r.request_file ? (
                    <img
                      src={`http://127.0.0.1:8000${r.request_file}`}
                      alt="request"
                      width="80"
                      className={Styles.image}
                    />
                  ) : (
                    "No File"
                  )}
                </td>

                {/* Date */}
                <td>{r.request_date}</td>

                {/* Mode */}
                <td>
                  {r.mode_status == 1
                    ? "Online Consultation"
                    : r.mode_status == 2
                    ? "Office Visit"
                    : "Not Selected"}
                </td>

                {/* Payment */}
                <td>
                  {r.payment_status === 1 ? (
                    <span className={Styles.paidText}>Paid</span>
                  ) : (
                    <span className={Styles.pendingText}>Pending</span>
                  )}
                </td>

                {/* Action */}
                <td>

                  {r.request_status == 1 ? (

                    <div className={Styles.actionStack}>

                      <span className={Styles.acceptedText}>
                        Accepted
                      </span>

                      <Link
                        to={`/lawyer/schedule/${r.id}`}
                        className={Styles.actionBtn}
                      >
                        Schedule
                      </Link>

                      <Link
                        to={`/lawyer/addreport/${r.id}`}
                        className={Styles.actionBtnSecondary}
                      >
                        Add Report
                      </Link>

                    </div>

                  ) : r.request_status == 2 ? (

                    <span className={Styles.rejectedText}>
                      Rejected
                    </span>

                  ) : (

                    <div className={Styles.actionStack}>

                      <button
                        className={Styles.Btnaccept}
                        onClick={() => handleAccept(r)}
                      >
                        Accept
                      </button>

                      <button
                        className={Styles.Btnreject}
                        onClick={() => handleReject(r.id)}
                      >
                        Reject
                      </button>

                    </div>

                  )}

                </td>

              </tr>

            ))
          ) : (
            <tr>
              <td colSpan="6" align="center">
                No requests found
              </td>
            </tr>
          )}

        </tbody>

      </table>

    </div>
  );
};

export default ViewRequest;   