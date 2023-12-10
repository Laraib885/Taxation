import React from 'react';
import { ContextState } from '../../Context/AppContext';
import { useNavigate } from 'react-router-dom';

function Header() {
  const { address, connectWallet } = ContextState();
  const navigate = useNavigate();


  // SHORTEN ADDRESS FOR BUTTON
  const shortenAdress = (address) => {
    const start = address.slice(0, 5);
    const end = address.slice(-5);
    return start + '...' + end;
  }

  connectWallet();



  // ============================
  const buttonComponent = () => {
    // if (address === undefined) {
    //   return (
    //   <>
    //     <button onClick={connectWallet}>Connect</button>
    //     <button onClick={connectWallet}>Login</button>
    //   </>
    //   )
    // } else {
    //   return <button>{shortenAdress(address)}</button>
    // }
    return (
      <>
        <button onClick={() => navigate('/Register')}>Register</button>
        <button onClick={() => navigate('/Login')}>Login</button>
      </>
    )
  }
  // ============================
  return (
    <div className='Header'>
      <div className='left'>
        <img src="mh.png" alt="Logo" />
        <h6>Blockchain based vehicle and taxation rocord keeping and verification system</h6>
      </div>
      <div className='right'>
        {buttonComponent()}
      </div>
    </div>
  )
}

export default Header
