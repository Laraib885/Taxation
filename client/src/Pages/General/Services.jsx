import React from 'react'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import { useNavigate } from 'react-router-dom'

function Services() {

  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div style={{marginTop:"8vw"}}>

        <div className='serviceCardsDiv'>
          <div onClick={() => navigate('/RegisterVehicle')} className="serviceCard">
            <img src="register.png" alt="" />
            <h6>Online Registeration of Vehicle</h6>
          </div>
          <div onClick={() => navigate('/MyVehicles')} className="serviceCard">
            <img src="detail.png" alt="" />
            <h6>Get Owned Vehicles Details</h6>
          </div>
          <div onClick={() => navigate('/MyVehicles')} className="serviceCard">
            <img src="tax.jpg" alt="" />
            <h6>Pay Vehicle Taxes</h6>
          </div>
        </div>
        <div className='serviceCardsDiv'>
          <div onClick={() => navigate('/SellVehicle')} className="serviceCard">
            <img src="ownership.jpg" alt="" />
            <h6>Sell Vehicle</h6>
          </div>
          <div onClick={() => navigate('/GetOwnership')} className="serviceCard">
            <img src="getOwnership.jpeg" alt="" />
            <h6>Get Ownership of Vehicle</h6>
          </div>
          <div className="serviceCard">
            <img src="car1.avif" alt="" />
            <h6>Explore other vehicles</h6>
          </div>
        </div>

      </div>
      <Footer />
    </>
  )
}

export default Services