import React from 'react'

import HomePage from '../Admin/Pages/HomePage/HomePage'
import BasicsHome from '../Basics/HomePage'
import { Route, Routes } from 'react-router-dom'
import LawyerHomePage from '../Lawyer/Pages/HomePage/HomePage'
import GuestHomePage from '../Guest/Pages/HomePage/HomePage'
import UserHomePage from '../User/Pages/UserHomePage/UserHomePage'
import Payment from '../User/Pages/Payment/Payment'
import PaymentFee from '../User/Pages/PaymentFees/PaymentFee'





const MainRouter = () => {
    return (
        <div>
            <Routes>
                 <Route path="admin/*" element={<HomePage/>} />
                 <Route path="basics/*" element={<BasicsHome/>} />
                 <Route path="guest/*" element={<GuestHomePage/>} />
                 <Route path="lawyer/*" element={<LawyerHomePage />} />
                 <Route path="/user/*" element={<UserHomePage />} />
                 <Route path="/feepayment/:rid" element={<PaymentFee />} />
                 <Route path="/payment/:id" element={<Payment />} />
            </Routes>
        </div>
    )
}


export default MainRouter