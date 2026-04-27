import React from 'react'

import { Route, Routes } from 'react-router'
import Login from '../Guest/Pages/Login/Login'
import Register from '../Guest/Pages/Register/Register'
import Lawyer from '../Guest/Pages/Lawyer/Lawyer'
import Subscription from '../Guest/Pages/Subscription/Subscription'








const GuestRouter = () => {
  return (
    <div>
        <Routes>
                <Route path="login" element={<Login/>} />
                <Route path="register" element={<Register/>} />
                <Route path="lawyer" element={<Lawyer/>} />
                <Route path="subscription" element={<Subscription/>} />
            </Routes>
    </div>
  )
}

export default GuestRouter