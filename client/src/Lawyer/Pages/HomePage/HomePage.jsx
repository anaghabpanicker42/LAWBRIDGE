import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../Components/Navbar/Navbar';
import LawyerRouter from '../../../Routes/LawyerRouter';
import Styles from './homepage.module.css';

const LawyerHomePage = () => {
  const location = useLocation();

  const [summary, setSummary] = useState({
    appointments: 0,
    clients: 0,
    earnings: 0,
    new_requests: 0
  });

  const [pendingRequests, setPendingRequests] = useState([]);

  // ---------------- Dashboard Summary ----------------
  useEffect(() => {
    const lawyerId = sessionStorage.getItem('lawyer_id');
    if (!lawyerId) return;

    axios
      .get(`http://localhost:8000/api/lawyer-dashboard-summary/?lawyer_id=${lawyerId}`)
      .then(res => {
        const data = res.data;
        setSummary({
          appointments: data.appointments || 0,
          clients: data.clients || 0,
          earnings: data.earnings || 0,
          new_requests: data.new_requests || 0
        });
      })
      .catch(err => {
        console.error("Error fetching dashboard summary:", err);
      });
  }, []);

  // ---------------- Pending Requests ----------------
  useEffect(() => {
    const lawyerId = sessionStorage.getItem('lawyer_id');
    if (!lawyerId) return;

    axios
      .get(`http://localhost:8000/api/pending-requests/?lawyer_id=${lawyerId}`)
      .then(res => {
        setPendingRequests(res.data);
      })
      .catch(err => {
        console.error("Error fetching pending requests:", err);
      });
  }, []);

  const isHomePage = location.pathname === '/lawyer/home';

  return (
    <div className={Styles.dashboardContainer}>
      <Navbar />
      <LawyerRouter />

      {isHomePage && (
        <>
        <div className={Styles.hero}>
          <div className={Styles.heroContent}>
            <h1>Welcome {sessionStorage.getItem("lawyer_name")}</h1>
            <p>Helping clients find justice through expertise, dedication, and trusted legal guidance. 
              Manage your appointments, requests, and cases efficiently from your dashboard.</p>
          </div>
        </div>

          {/* ---------------- SUMMARY CARDS ---------------- */}
          <section className={Styles.cards}>
            <div className={`${Styles.card} ${Styles.appointments}`}>
              <div className={Styles.icon}>📅</div>
              <h3>Appointments</h3>
              <p className={Styles.number}>{summary.appointments}</p>
              <span>Upcoming</span>
            </div>

            <div className={`${Styles.card} ${Styles.clients}`}>
              <div className={Styles.icon}>👥</div>
              <h3>Clients</h3>
              <p className={Styles.number}>{summary.clients}</p>
              <span>Total</span>
            </div>

            <div className={`${Styles.card} ${Styles.earnings}`}>
              <div className={Styles.icon}>💼</div>
              <h3>Earnings</h3>
              <p className={Styles.number}>₹{summary.earnings}</p>
              <span>Total</span>
            </div>

            <div className={`${Styles.card} ${Styles.requests}`}>
              <div className={Styles.icon}>📝</div>
              <h3>New Requests</h3>
              <p className={Styles.number}>{summary.new_requests}</p>
              <span>Pending</span>
            </div>
          </section>

          {/* ---------------- PENDING CLIENT REQUESTS ---------------- */}
          <section className={Styles.pendingSection}>
            <h2>Pending Client Requests</h2>

            {pendingRequests.length === 0 ? (
              <p className={Styles.noData}>No pending requests.</p>
            ) : (
              <div className={Styles.pendingTable}>
                <table>
                  <thead>
                    <tr>
                      <th>Photo</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Place</th>
                      <th>Request Type</th>
                      <th>Date</th>
                    
                    </tr>
                  </thead>

                  <tbody>
                    {pendingRequests.map((req) => (
                      <tr key={req.request_id}>
                        <td>
                          {req.user_photo ? (
                            <img
                              src={`http://localhost:8000${req.user_photo}`}
                              alt="User"
                              width="50"
                              height="50"
                            />
                          ) : (
                            <div style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                              background: "#e2e8f0",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "12px"
                            }}>
                              N/A
                            </div>
                          )}
                        </td>

                        <td>{req.user_name}</td>
                        <td>{req.user_email}</td>
                        <td>{req.user_place}</td>
                        <td>{req.request_type}</td>
                        <td>{req.request_date}</td>
                        
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {/* ---------------- FOOTER ---------------- */}
          <footer className={Styles.footer}>
            <div className={Styles.footerContent}>
              <div className={Styles.left}>
                <h3>LawBridge</h3>
                <p>Connecting clients with trusted lawyers seamlessly.</p>
              </div>
              <div className={Styles.right}>
                <h4>Contact</h4>
                <p>Email: support@lawbridge.com</p>
                <p>Phone: +91 9876543210</p>
              </div>
            </div>
            <div className={Styles.bottom}>
              &copy; {new Date().getFullYear()} LawBridge. All rights reserved.
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default LawyerHomePage;