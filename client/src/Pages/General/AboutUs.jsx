import React from 'react'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'

function AboutUs() {
  return (
    <>
      <Header />
      <div className="LandingPage" >
        <div className='mainPage'>
          <div className='mainPageLeft'>
            <div className=''>
              <h5 style={{ color: "gray" }}>Blockchain Based Vehicle and Taxation Rocord keeping and Verification System</h5>
              <h1>Creating A Better</h1>
              <h1><b>Decentralised Solution</b></h1>
              <p>The Blockchain based vehicle and taxation rocord keeping and verification system Project aims to implement important security features in Vehicle Registeration, it's record
                keeping as well as taxation process and its record keeping and selling/buying and changing the ownership of the vehicle.
                We have used the blockchain technology which implement solidity smart contract features that makes sure that all the process is carried on as-intended and without any
                malicious interrupt as well as records are kept securily so no-one can tamper the records.
                The solidity smart contract contains the logic of the project and we are using Sepolia Blockchain testnet (for now) to keep the records on the distributed ledger.
               </p>
              {!sessionStorage.getItem('userDid') &&
                <button className='GeneralButton'>Start Now</button>
              }
            </div>
          </div>
          <div className='mainPageRight'>
            <img src="AboutImg.png" alt="Image" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AboutUs