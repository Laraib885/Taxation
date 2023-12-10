import React, { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { ContextState } from '../../Context/AppContext';
import FormLoyout from '../../Components/FormLoyout';

function Register() {
  const navigate = useNavigate();
  const { MainContract } = ContextState();
  const [isOpen, setIsOpen] = useState(false);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [nationality, setNationality] = useState();
  const [dob, setDob] = useState();


  const closeModal = async () => {
    setIsOpen(false);
  }

  // const handleRoleChange = (e) => {
  //   setRole(e.target.value);
  //   console.log(e.target.value);
  // };

  const dateToHexTimestamp = async (dateString) => {
    const date = new Date(dateString);
    const timeStampInSeconds = Math.floor(date.getTime() / 1000);
    return '0x' + timeStampInSeconds.toString(16);
  }

  const submitSignUpForm = async (e) => {
    e.preventDefault();
    const date = await dateToHexTimestamp(dob);
    console.log("Hex Time While Registering", date);
    const contract = await MainContract(true);
    console.log(contract);
    try {
      const tx = await contract.registerUser(name, email, date, nationality);
      await tx.wait();
      console.log("You Got Registered");
  
      setIsOpen(true);
    } catch (error) {
      console.log("Error Signup: ", error.message);
    }
  }


  const WelcomeNote = (
    <>
      <h2>Welcome</h2>
      <p className='mt-5'>To Trust in Motion  Harnessing Web3 for Decentralized, Verifiable Identity and Credentials</p>
      <button onClick={() => navigate('/login')}>Login</button>
    </>
  )
  const form = (
    <>
      <form className='d-flex'>
        <div className='d-flex flex-column'>
          {/* <select name="role" onChange={handleRoleChange} value={role}>
            <option value="#">Select Role</option>
            <option value="0">Authority</option>
            <option value="1">Client</option>
          </select> */}
          <input name='name' onChange={(e) => setName(e.target.value)} placeholder='Enter Your Full Name' />
          <input name='email' onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email' />
        </div><br />
        <div className='d-flex flex-column ml-3'>
          <input name='birthDate' onChange={(e) => setDob(e.target.value)} type='date' placeholder='Enter Your Date of Birth' />
          <input name='nationality' onChange={(e) => setNationality(e.target.value)} placeholder='Enter Your Nationality' />
        </div>
      </form>
      <button onClick={submitSignUpForm}>Register</button>
    </>
  )


  return (
    <>
      <FormLoyout WelcomeNote={WelcomeNote} form={form} />

      <Modal className='RegisteredModal' isOpen={isOpen} onRequestClose={closeModal}>
        <div className='RegisteredModal-inner'>
          <div className='registeredModal-Desc'>
            <h5 style={{ color: 'rgb(69, 240, 17)' }}>You Have Been Registered</h5>
          </div>
          <div className='btnGroup' style={{ float: "right", marginRight: "1vw", position: "sticky" }}>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      </Modal>
    </>
  )
}
export default Register;