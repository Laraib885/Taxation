// import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./App.css"
import * as c from './Pages';
import { ProtectedRoutes } from './ProtectedRoutes';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router >
      <Routes>
        <Route path='/' element={<c.Home />} />
        <Route path='/Login' element={<c.Login />} />
        <Route path='/Register' element={<c.Register />} />

        <Route element={<ProtectedRoutes /> }>
          <Route path='/RegisterVehicle' element={<c.RegisterVehicle />} />
          <Route path='/MyVehicles' element={<c.MyVehicles />} />
          <Route path='/PayTax/:registNumber' element={<c.PayTax />} />
          <Route path='/AuthDashboard' element={<c.AuthDashboard />} />
          <Route path='/TaxRules' element={<c.TaxRules />} />
          <Route path='/VehicleDetail/:registNumber' element={<c.VehicleDetail />} />
          <Route path='/AllVehicles' element={<c.AllVehicles />} />
          <Route path='/SellVehicle' element={<c.SellVehicle />} />
          <Route path='/GetOwnership' element={<c.GetOwnership />} />
        </Route>

      </Routes>
    </Router>
  )
}

export default App
