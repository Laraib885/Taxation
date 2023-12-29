import React from 'react'
import { FacebookRounded, LinkRounded, TransferWithinAStationRounded, Twitter, YouTube, AddLocation } from '@mui/icons-material';

function Footer() {
  return (
    <div className='footerLayout'>
      <div className='Row1'>
        <div className='logo'>
            {/* logo image  */}
        </div>
        <div className='footerLayout-right'>
          <div className="icons">
            <a target='_blank' href="https://www.linkedin.com/company/educareertech/"><LinkRounded /></a>
            <a target='_blank' href="https://www.facebook.com/EduCareertech"><FacebookRounded /></a>
            <a target='_blank' href=""><Twitter /></a>
            <a target='_blank' href="https://www.youtube.com/@EduCareertech."><YouTube /></a>
          </div>
          <div className='footerMenu'>
            <li>Contact Us |</li>
            <li>Terms And Conditions | </li>
            <li>Notices | </li>
            <li>Bug Reporting | </li>
          </div>
        </div>
      </div>
      <div className='Row2'>
        <div className='services'>
          <h3>Services</h3>
          <div>
            <p>User Registeration</p>
            <p>Vehicle Registeration</p>
            <p>Tax Payment</p>
            <p>Tax Record Keeping</p>
            <p>Ownerhip Transfer</p>
          </div>
        </div>
        <div className='contactInfo'>
          <h3>Contact Info</h3>
          <div>
            <div className='contactBox'>
              <i><AddLocation></AddLocation></i><p>Blockchain Based Vehicle and taxation record keeping and verification System - Final Year Students University of Sindh Jamshoro, Pakistan, umairfaiz31@gmail.com, +92 3143304306, syedlaraib123@gmail.com, +92 433669449, yk25658@gmail.com, +92 3155984760</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Footer;