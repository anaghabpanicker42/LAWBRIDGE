import React, { useState, useEffect } from "react";
import Styles from "./place.module.css";
import axios from "axios";

const Place = () => {
  const [districts, setDistricts] = useState([]);
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  const [districtId, setDistrictId] = useState("");
  const [placeName, setPlaceName] = useState("");

  const fetchDistrictsAndPlaces = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/place/");
      setDistricts(res.data.districtdata || []);
      setPlaces(res.data.placedata || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDistrictsAndPlaces();
  }, []);

  useEffect(() => {
    if (!districtId) {
      setFilteredPlaces([]);
    } else {
      const filtered = places.filter(
        (p) => p.district_id === parseInt(districtId)
      );
      setFilteredPlaces(filtered);
    }
  }, [districtId, places]);

  const handleSave = async () => {
    // Validation
    if (!districtId) {
      alert("Please select a district");
      return;
    }

    if (!placeName.trim()) {
      alert("Place name is required");
      return;
    }

    const pattern = /^[A-Za-z ]{2,50}$/;
    if (!pattern.test(placeName)) {
      alert("Place name must contain only letters and spaces (2-50 characters)");
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8000/place/", {
        district_id: districtId,
        place_name: placeName,
      });

      setPlaceName("");
      fetchDistrictsAndPlaces();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={Styles.page}>
      <div className={Styles.card}>
        <h2 className={Styles.title}>Add Place</h2>
        <p className={Styles.subtitle}>
          Select district and enter place name
        </p>

        <select
          className={Styles.select}
          value={districtId}
          onChange={(e) => setDistrictId(e.target.value)}
        >
          <option value="">Select District</option>
          {districts.map((d) => (
            <option key={d.id} value={d.id}>
              {d.district_name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Enter place name"
          className={Styles.input}
          value={placeName}
          onChange={(e) => setPlaceName(e.target.value)}
          disabled={!districtId}
        />

        <button className={Styles.button} onClick={handleSave}>
          Add Place
        </button>

        {districtId && (
          <div className={Styles.list}>
            <h4>Places under selected district</h4>
            <ul>
              {filteredPlaces.length > 0 ? (
                filteredPlaces.map((p) => (
                  <li key={p.id}>{p.place_name}</li>
                ))
              ) : (
                <li>No places found</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Place;