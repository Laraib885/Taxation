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
  const [password, setPassword] = useState();
  const [nationality, setNationality] = useState();
  const [dob, setDob] = useState();


  const closeModal = async () => {
    setIsOpen(false);
    navigate('/Login');
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
      const tx = await contract.registerUser(name, date, nationality, password);
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
      <p className='mt-5'>To Trust in Motion, Harnessing Web3 for Blockchain Based Vehicle and Taxation Rocord Keeping and Verification System</p>
      <button onClick={() => navigate('/login')}>Login</button>
    </>
  )
  const form = (
    <>
      <div className='GeneralForm'>
        <form className=' d-flex'>
          <div className='d-flex flex-column'>
            <input name='name' onChange={(e) => setName(e.target.value)} placeholder='Enter Your Full Name' />
            <input name='email' onChange={(e) => setPassword(e.target.value)} placeholder='Enter the Password' />
          </div><br />
          <div className='d-flex flex-column ml-3'>
            <input name='birthDate' onChange={(e) => setDob(e.target.value)} type='date' placeholder='Enter Your Date of Birth' />
            <input name='nationality' onChange={(e) => setNationality(e.target.value)} placeholder='Enter Your Nationality' />
          </div>
        </form>
      </div>
          <button className='GeneralButton' onClick={submitSignUpForm}>Register</button>
    </>
  )


  return (
    <>
      <FormLoyout WelcomeNote={WelcomeNote} form={form} />

      <Modal className='RegisteredModal SmallModal' isOpen={isOpen} onRequestClose={closeModal}>
        <div className='RegisteredModal-inner'>
          <div className='registeredModal-Desc'>
            <h5 >You Have Been Registered</h5>
          </div>
          <button className='GeneralButton' onClick={closeModal}>Close</button>
        </div>
      </Modal>
    </>
  )
}
export default Register;