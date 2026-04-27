import React from 'react'
import { Route, Routes } from 'react-router'
import Request from '../User/Pages/Request/Request'
import MyProfile from '../User/Pages/MyProfile/MyProfile'
import EditProfile from '../User/Pages/EditProfile/EditProfile'
import ChangePassword from '../User/Pages/ChangePassword/ChangePassword'
import UserHomePage from '../User/Pages/UserHomePage/UserHomePage'
import SearchLawyer from '../User/Pages/SearchLawyer/SearchLawyer'
import MyRequest from '../User/Pages/MyRequest/MyRequest'
import ViewReport from '../User/Pages/ViewReport/ViewReport'
// import Payment from '../User/Pages/Payment/Payment'
import ViewSchedule from '../User/Pages/ViewSchedule/ViewSchedule'
import ViewPlan from '../User/Pages/ViewPlan/ViewPlan'
import Rating from '../User/Pages/Rating/Rating'
import Complaint from '../User/Pages/Complaint/Complaint'
import UserDashboard from '../User/Pages/UserDashboard/UserDashboard'
import UserRegister from '../User/Pages/UserRegister/UserRegister'
import CategorySearch from '../User/Pages/CategorySearch/CategorySearch'




const UserRouter = () => {
  return (
    <div>
        <Routes>
            <Route path="request/:id" element={<Request/>} />
            <Route path="myprofile" element={<MyProfile/>} />
            <Route path="editprofile" element={<EditProfile/>} />
            <Route path="changepassword" element={<ChangePassword/>} />
            <Route path="userhomepage" element={<UserHomePage/>} />
            <Route path="searchlawyer/:categoryId" element={<SearchLawyer />} />
            <Route path="myrequest" element={<MyRequest/>} />
            <Route path="viewreport/:id" element={<ViewReport/>} />
            {/* <Route path="payment/:id" element={<Payment/>} /> */}
            <Route path="viewschedule/:id" element={<ViewSchedule/>} />
            <Route path="viewplan" element={<ViewPlan/>} />
            <Route path="rating" element={<Rating/>} />
            <Route path="complaint" element={<Complaint/>} />
            <Route path="dashboard" element={<UserDashboard/>} />
            <Route path="register" element={<UserRegister/>} />
            <Route path="categorysearch" element={<CategorySearch/>} />
      
        </Routes>
    </div>
  )
}

export default UserRouter