import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./App.css"
import * as c from './Pages';
// import Home from './Components/Home'
// import Payment from './Components/Payment';
// import Header from './Components/Header';



function App() {
  return (
    <BrowserRouter >
      <c.Header />
       <Routes>
          <Route path='/' element={<c.Home />} />  
          <Route path='/Login' element={<c.Login />} />  
          <Route path='/Register' element={<c.Register />} />  
          <Route path='/Welcome' element={<c.Welcome />} />  
          <Route path='/RegisterVehicle' element={<c.RegisterVehicle />} />  
          <Route path='/MyVehicles' element={<c.MyVehicles />} />  
          <Route path='/PayTax/:registNumber' element={<c.PayTax />} /> 

          <Route path='/AuthDashboard' element={<c.AuthDashboard />} /> 
          <Route path='/TaxRules' element={<c.TaxRules />} /> 
          <Route path='/VehicleDetail/:registNumber' element={<c.VehicleDetail />} /> 
          <Route path='/AllVehicles' element={<c.AllVehicles />} /> 
           
       </Routes>
    </BrowserRouter>
  )
}
  
export default App
