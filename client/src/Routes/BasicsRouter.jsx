import React from 'react'

import { Route, Routes } from 'react-router'
import UsestateHook from '../Basics/UsestateHook'
import UseEffectHook from '../Basics/UseEffectHook'



const BasicsRouter = () => {
  return (
    <div>
        <Routes>
                <Route path="useStates" element={<UsestateHook/>} />
                <Route path="useEffect" element={<UseEffectHook/>} />
                
            </Routes>
    </div>
  )
}

export default BasicsRouter