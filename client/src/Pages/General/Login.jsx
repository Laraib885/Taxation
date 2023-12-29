import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormLoyout from '../../Components/FormLoyout';
import { ContextState } from '../../Context/AppContext';




function Login() {
    const navigate = useNavigate();
    const { MainContract } = ContextState();

    const [wrongCredential, setWrongCredential] = useState(false);
    const [role, setRole] = useState();
    const [password, setPassword] = useState();

   

    const submitLoginForm = async (e) => {
        e.preventDefault();
        try {
            const contract = await MainContract(true);
            const isVerified = await contract.loginUser(password);
            if (isVerified) {
                // sessionStorage.setItem('userDid', did);
                // sessionStorage.setItem('providerId', '');
                sessionStorage.setItem('LoggedIn', true);
                navigate('/')
            } else {
                setWrongCredential(true);
            }
            console.log("Is it verified?", isVerified);
        } catch (error) {
            console.log("Error in Login: ", error);
            setWrongCredential(true);
        }
    }


    const renderDesc = () => {
        return <p style={{ color: 'red' }}>You Don't have Access</p>
    }

    const WelcomeNote = (
        <>
            <div>
                <h2>Welcome</h2>
                <h5>To Trust in Motion</h5>
                <p className='mt-3'>Harnessing Web3 for Decentralized, Verifiable Identity and Credentials</p>
                <button onClick={() => navigate('/register')}>Register</button>

            </div>
        </>
    )
    const form = (
        <>
            <div style={{ display: 'flex', flexDirection: 'column' }} className='GeneralTable'>
                <p>{wrongCredential && renderDesc()}</p>
                <input onChange={(e) => setPassword(e.target.value)} type="text" placeholder='Enter the Password' />
                <button className='GeneralButton' onClick={submitLoginForm}>Login</button>
            </div>
        </>
    )


    return (
        <>
            <FormLoyout WelcomeNote={WelcomeNote} form={form} />
        </>

    )
}
export default Login