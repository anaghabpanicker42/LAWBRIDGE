import React, { useState, useEffect } from "react";
import axios from "axios";
import Styles from "./viewcomplaint.module.css";

const ViewComplaint = () => {
  const [complaints, setComplaints] = useState([]);
  const [replyInputs, setReplyInputs] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/Complaint/");
        setComplaints(response.data.complaints || []);
      } catch (err) {
        console.error(err);
        setError("Error fetching complaints");
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  const handleReply = async (id) => {
    const reply = replyInputs[id];
    if (!reply) return alert("Reply cannot be empty");

    try {
      await axios.put("http://127.0.0.1:8000/Complaint/", { id, reply });
      alert("Reply sent successfully");

      setComplaints((prev) =>
        prev.map((c) =>
          c.id === id
            ? { ...c, complaint_reply: reply, complaint_status: "1" }
            : c
        )
      );

      setReplyInputs((prev) => ({ ...prev, [id]: "" }));
    } catch (err) {
      console.error(err);
      alert("Error sending reply");
    }
  };

  if (loading)
    return <div className={Styles.loading}>Loading complaints...</div>;
  if (error) return <div className={Styles.error}>{error}</div>;
  if (complaints.length === 0)
    return <div className={Styles.noData}>No complaints submitted yet.</div>;

  return (
    <div className={Styles.page}>
      <div className={Styles.container}>
        <h2 className={Styles.title}>User Complaints</h2>
        <div className={Styles.complaintList}>
          {complaints.map((complaint) => (
            <div key={complaint.id} className={Styles.card}>
              <div className={Styles.cardHeader}>
                <h3 className={Styles.complaintTitle}>
                  {complaint.complaint_title}
                </h3>
                <span
                  className={
                    complaint.complaint_status === "1"
                      ? Styles.statusReplied
                      : Styles.statusPending
                  }
                >
                  {complaint.complaint_status === "1" ? "Replied" : "Pending"}
                </span>
              </div>

              <p className={Styles.complaintContent}>
                {complaint.complaint_content}
              </p>
              <p className={Styles.userId}>User ID: {complaint.user_id}</p>

              {complaint.complaint_status !== "1" && (
                <div className={Styles.replySection}>
                  <input
                    type="text"
                    placeholder="Type your reply here"
                    value={replyInputs[complaint.id] || ""}
                    onChange={(e) =>
                      setReplyInputs({
                        ...replyInputs,
                        [complaint.id]: e.target.value,
                      })
                    }
                    className={Styles.input}
                  />
                  <button
                    className={Styles.button}
                    onClick={() => handleReply(complaint.id)}
                  >
                    Send Reply
                  </button>
                </div>
              )}

              {complaint.complaint_status === "1" &&
                complaint.complaint_reply && (
                  <p className={Styles.adminReply}>
                    <strong>Admin Reply:</strong> {complaint.complaint_reply}
                  </p>
                )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewComplaint;