import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MyProfile from '../Lawyer/Pages/MyProfile/MyProfile'
import EditProfile from '../Lawyer/Pages/EditProfile/EditProfile'
import ChangePassword from '../Lawyer/Pages/ChangePassword/ChangePassword'
import LawyerCategory from '../Lawyer/Pages/LawyerCategory/LawyerCategory'
import ViewRequest from '../Lawyer/Pages/ViewRequest/ViewRequest'
import LevelType from '../Lawyer/Pages/LevelType/LevelType'
import AddReport from '../Lawyer/Pages/AddReport/AddReport'
import RequestFee from '../Lawyer/Pages/RequestFee/RequestFee'
import Schedule from '../Lawyer/Pages/Schedule/Schedule'


const LawyerRouter = () => {
  return (
    <div>
        <Routes>
                 <Route path="myprofile" element={<MyProfile/>} />
                 <Route path="editprofile" element={<EditProfile/>} />
                 <Route path="changepassword" element={<ChangePassword/>} />
                 <Route path="lawyercategory" element={<LawyerCategory/>} />
                 <Route path="viewrequest" element={<ViewRequest/>} />
                 <Route path="leveltype/:id" element={<LevelType/>} />
                 <Route path="addreport/:id" element={<AddReport/>} />
                 <Route path="requestfee/:id" element={<RequestFee/>} />
                 <Route path="schedule/:id" element={<Schedule/>} />
                

        </Routes>
    </div>
  )
}

export default LawyerRouter