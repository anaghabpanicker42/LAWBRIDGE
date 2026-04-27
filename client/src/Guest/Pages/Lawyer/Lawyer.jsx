import React, { useState, useEffect, useRef } from "react";
import Styles from "./lawyer.module.css";
import axios from "axios";

const Lawyer = () => {

  const [step,setStep] = useState(1)

  const [lawyerName,setLawyerName] = useState("")
  const [email,setEmail] = useState("")
  const [phone,setPhone] = useState("")
  const [password,setPassword] = useState("")
  const [confirmPassword,setConfirmPassword] = useState("")

  const [photo,setPhoto] = useState(null)
  const [proof,setProof] = useState(null)

  const [qualification,setQualification] = useState("")
  const [address,setAddress] = useState("")

  const [districtId,setDistrictId] = useState("")
  const [placeId,setPlaceId] = useState("")

  const [districts,setDistricts] = useState([])
  const [places,setPlaces] = useState([])
  const [filteredPlaces,setFilteredPlaces] = useState([])

  const [categories, setCategories] = useState([])
  const [categoriesSelected, setCategoriesSelected] = useState([])
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Fetch districts, places, and categories
  useEffect(()=>{
    axios.get("http://127.0.0.1:8000/place/")
    .then((res)=>{
      setDistricts(res.data.districtdata || [])
      setPlaces(res.data.placedata || [])
    })

    axios.get("http://127.0.0.1:8000/Category/")
      .then(res => setCategories(res.data.categories || []))
      .catch(err => console.log(err));

  },[])

  useEffect(()=>{
    if(!districtId){
      setFilteredPlaces([])
      setPlaceId("")
    } 
    else {
      const filtered = places.filter(p => p.district_id === parseInt(districtId))
      setFilteredPlaces(filtered)
    }
  },[districtId,places])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const toggleCategory = (id) => {
    if (categoriesSelected.includes(id)) {
      setCategoriesSelected(categoriesSelected.filter(c => c !== id))
    } else {
      setCategoriesSelected([...categoriesSelected, id])
    }
  }

  // Patterns for validation
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
  const phonePattern = /^[0-9]{10}$/
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/

  const nextStep = () => {
    // Step 1 validation
    if(step === 1){
      if(!lawyerName.trim()){ alert("Full Name is required"); return; }
      if(!emailPattern.test(email)){ alert("Enter a valid email address"); return; }
      if(!phonePattern.test(phone)){ alert("Enter a valid 10-digit phone number"); return; }
      if(!passwordPattern.test(password)){ alert("Password must be at least 6 characters and include a number"); return; }
      if(password !== confirmPassword){ alert("Passwords do not match"); return; }
    }

    // Step 2 validation
    if(step === 2){
      if(!qualification.trim()){ alert("Qualification is required"); return; }
      if(!address.trim()){ alert("Address is required"); return; }
      if(!districtId){ alert("Select a district"); return; }
      if(!placeId){ alert("Select a place"); return; }
      if(categoriesSelected.length === 0){ alert("Select at least one category"); return; }
    }

    setStep(step + 1)
  }

  const prevStep = () =>{
    setStep(step - 1)
  }

  const handleSubmit = async () =>{
    // Step 3 validation
    if(!photo){ alert("Upload a profile photo"); return; }
    if(!proof){ alert("Upload an ID proof"); return; }

    const formData = new FormData();

    formData.append("lawyer_name", lawyerName)
    formData.append("lawyer_email", email);
    formData.append("lawyer_password", password);
    formData.append("lawyer_address", address);
    formData.append("lawyer_qualification", qualification);
    formData.append("lawyer_photo", photo);
    formData.append("lawyer_proof", proof);
    formData.append("place_id", placeId)
    formData.append("lawyer_status", "0");
    formData.append("category", JSON.stringify(categoriesSelected));

    try{
      await axios.post("http://127.0.0.1:8000/Lawyer/",formData,{
        headers:{ "Content-Type":"multipart/form-data"}
      })

      alert("Registration Successful. Wait for Admin Approval.")

      // Reset Form
      setStep(1)
      setLawyerName("")
      setEmail("")
      setPhone("")
      setPassword("")
      setConfirmPassword("")
      setQualification("")
      setAddress("")
      setDistrictId("")
      setPlaceId("")
      setPhoto(null)
      setProof(null)
      setCategoriesSelected([])

    }catch(error){
  console.log("FULL ERROR:", error)
  console.log("SERVER ERROR:", error.response?.data)
  alert(error.response?.data?.error || "Registration failed")
}

  }

  return (
    <div className={Styles.page}>
      <div className={Styles.container}>
        <h1 className={Styles.heading}>Lawyer Registration</h1>
        <p className={Styles.subheading}>
          Join LawBridge and connect with clients seeking your legal expertise.
        </p>

        <div className={Styles.steps}>
          <div className={step===1 ? Styles.activeStep : ""}>1 Personal Information</div>
          <div className={step===2 ? Styles.activeStep : ""}>2 Professional Details</div>
          <div className={step===3 ? Styles.activeStep : ""}>3 Verification</div>
        </div>

        <div className={Styles.card}>

          {/* STEP 1 */}
          {step===1 && (
            <div className={Styles.left}>
              <h3>Step 1: Personal Information</h3>

              <input
                className={Styles.input}
                placeholder="Full Name"
                value={lawyerName}
                onChange={(e)=>setLawyerName(e.target.value)}
              />
              <input
                className={Styles.input}
                placeholder="Email Address"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
              <input
                className={Styles.input}
                placeholder="Phone Number"
                value={phone}
                onChange={(e)=>setPhone(e.target.value)}
              />
              <input
                className={Styles.input}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
              <input
                className={Styles.input}
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
              />
              <button className={Styles.nextBtn} onClick={nextStep}>Next</button>
            </div>
          )}

          {/* STEP 2 */}
          {step===2 && (
            <div className={Styles.left}>
              <h3>Step 2: Professional Details</h3>
              <input
                className={Styles.input}
                placeholder="Qualification"
                value={qualification}
                onChange={(e)=>setQualification(e.target.value)}
              />
              <input
                className={Styles.input}
                placeholder="Address"
                value={address}
                onChange={(e)=>setAddress(e.target.value)}
              />

              <select
                className={Styles.input}
                value={districtId}
                onChange={(e)=>setDistrictId(e.target.value)}
              >
                <option value="">Select District</option>
                {districts.map(d=>(<option key={d.id} value={d.id}>{d.district_name}</option>))}
              </select>

              <select
                className={Styles.input}
                value={placeId}
                onChange={(e)=>setPlaceId(e.target.value)}
              >
                <option value="">Select Place</option>
                {filteredPlaces.map(p=>(<option key={p.id} value={p.id}>{p.place_name}</option>))}
              </select>

              {/* Multi-select dropdown */}
              <div className={Styles.dropdownWrapper} ref={dropdownRef}>
                <div
                  className={Styles.dropdownHeader}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  {categoriesSelected.length > 0
                    ? `Selected (${categoriesSelected.length})`
                    : "Select Categories"}
                </div>
                {dropdownOpen && (
                  <div className={Styles.dropdownList}>
                    {categories.map((c) => (
                      <label key={c.id} className={Styles.dropdownItem}>
                        <input
                          type="checkbox"
                          checked={categoriesSelected.includes(c.id)}
                          onChange={() => toggleCategory(c.id)}
                        />
                        {c.category_name}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <button className={Styles.backBtn} onClick={prevStep}>Back</button>
                <button className={Styles.nextBtn} onClick={nextStep}>Next</button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step===3 && (
            <div className={Styles.left}>
              <h3>Step 3: Verification</h3>

              <label>Upload Profile Photo</label>
              <input
                className={Styles.input}
                type="file"
                onChange={(e)=>setPhoto(e.target.files[0])}
              />

              <label>Upload ID Proof</label>
              <input
                className={Styles.input}
                type="file"
                onChange={(e)=>setProof(e.target.files[0])}
              />

              <div>
                <button className={Styles.backBtn} onClick={prevStep}>Back</button>
                <button className={Styles.nextBtn} onClick={handleSubmit}>Register</button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default Lawyer;
