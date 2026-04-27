import React, { useState, useEffect } from "react";
import axios from "axios";
import Styles from "./viewRating.module.css";
import StarIcon from "@mui/icons-material/Star";

const ViewRating = () => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/Rating/");
        console.log("API Response:", response.data);
        const ratingsArray = Array.isArray(response.data.ratings)
          ? response.data.ratings
          : [];
        setRatings(ratingsArray);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch ratings.");
        setLoading(false);
      }
    };
    fetchRatings();
  }, []);

  if (loading) return <div className={Styles.loading}>Loading ratings...</div>;
  if (error) return <div className={Styles.error}>{error}</div>;

  return (
    <div className={Styles.page}>
      <h2 className={Styles.title}>User Ratings</h2>
      {ratings.length === 0 ? (
        <p className={Styles.noRatings}>No ratings available.</p>
      ) : (
        <div className={Styles.cardsContainer}>
          {ratings.map((r) => (
            <div key={r.id} className={Styles.card}>
              <div className={Styles.cardHeader}>
                <span>User ID: {r.user_id_id}</span>
                <div className={Styles.stars}>
                  {Array.from({ length: r.rating_count }).map((_, i) => (
                    <StarIcon key={i} style={{ color: "#FFD700" }} />
                  ))}
                  {Array.from({ length: 5 - r.rating_count }).map((_, i) => (
                    <StarIcon key={i} style={{ color: "#ccc" }} />
                  ))}
                </div>
              </div>
              <p className={Styles.comment}>{r.rating_comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewRating;