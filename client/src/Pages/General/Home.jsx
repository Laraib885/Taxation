import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ContextState } from '../../Context/AppContext';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import { Card } from 'react-bootstrap';

function Home() {
  const { connectWallet, walletConnected } = ContextState()
  const navigate = useNavigate();

  useEffect(() => {
    if (!walletConnected) {
      connectWallet();
    }
  }, [walletConnected])


  return (
    <>
      <Header />
      <div className="App">
        <div className='HomeInner'>


          {/* Image Section */}
          <section className='HomeImageSection'>
            <img src="mainImage.jpg" alt="" />
          </section>


          {/* ============NOTIFICATION SECTION========== */}
          <section className='Notification'>
            <div className='NotifLeft'>
              <div className='NotifCard'>
                <div className='notifCardLine'></div>
                <h4>NEWS</h4>
                <div className='NotifCardInnerLines'>
                  <p>Taxes Updated For Year 2024</p>
                  <div className='borderLine'></div>
                  <p>Selling/Buying Made Easy</p>
                  <div className='borderLine'></div>
                  <p>Registeration Taxes Updated</p>
                  <div className='borderLine'></div>
                </div>
              </div>
            </div>
            <div className='NotifRight'>
              <div className='NotifCard'>
                <div className='notifCardLine'></div>
                <h4>ANNOUNCEMENT</h4>
                <div className='NotifCardInnerLines'>
                  <p>Pay Tax Online</p>
                  <div className='borderLine'></div>
                  <p>Keep Taxes Record Saf</p>
                  <div className='borderLine'></div>
                  <p>Blockchain implemented for security</p>
                  <div className='borderLine'></div>
                </div>
              </div>
            </div>
          </section>



          {/* =============SERVICES============ */}
          <div className='headline'>
            <div className='lineDiv'></div>
            <div className='LineHeading'>
              Services
            </div>
          </div>

          {/* ===============CARDS============ */}
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
      </div>


      <Footer />
    </>


  )
}

export default Home
