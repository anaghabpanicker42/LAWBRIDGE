import React from 'react'

import { Route, Routes } from 'react-router'
import AdminRegistration from '../Admin/Pages/AdminRegistration/AdminRegistration'
import HomePage from '../Admin/Pages/HomePage/HomePage'
import District from '../Admin/Pages/District/District'
import Place from '../Admin/Pages/Place/Place'
import Level from '../Admin/Pages/Level/Level'
import Type from '../Admin/Pages/Type/Type'
import Plan from '../Admin/Pages/Plan/Plan'
import Category from '../Admin/Pages/Category/Category'
import ViewLawyer from '../Admin/Pages/ViewLawyer/ViewLawyer'
import ViewComplaint from '../Admin/Pages/ViewComplaint/ViewComplaint'
import ViewRating from '../Admin/Pages/ViewRating/ViewRating'
import AdminDashboard from '../Admin/Pages/AdminDashboard/AdminDashboard'




const AdminRouter = () => {
  return (
    <div>
        <Routes>
                <Route path="adminregistration" element={<AdminRegistration/>} />
                <Route path="district" element={<District/>} />
                <Route path="place" element={<Place/>} />
                <Route path="level" element={<Level/>} />
                <Route path="type" element={<Type/>} />
                <Route path="plan" element={<Plan/>}/>
                <Route path="category" element={<Category/>}/>
                <Route path="viewlawyer" element={<ViewLawyer/>}/>
                <Route path="viewcomplaint" element={<ViewComplaint/>}/>
                <Route path="viewrating" element={<ViewRating/>}/>
                <Route path="dash" element={<AdminDashboard/>}/>
            </Routes>
    </div>
  )
}

export default AdminRouter