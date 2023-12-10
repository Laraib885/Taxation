import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormLoyout from '../../Components/FormLoyout';
import { ContextState } from '../../Context/AppContext';


function Login() {
    const navigate = useNavigate();
    const { MainContract } = ContextState();

    const [wrongCredential, setWrongCredential] = useState(false);
    // const [role, setRole] = useState();

    // const handleRoleChange = (e) => {
    //     setRole(e.target.value);
    //     console.log(e.target.value);
    //   };

    const submitLoginForm = async (e) => {
        e.preventDefault();
        try {
            const contract = await MainContract(true);
            const isVerified = await contract.loginUser();
            if (isVerified) {
                // sessionStorage.setItem('userDid', did);
                // sessionStorage.setItem('providerId', '');
                sessionStorage.setItem('LoggedIn', true);
                navigate('/Welcome')
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
            <h2>Welcome</h2>
            <h5>To Trust in Motion</h5>
            <p className='mt-3'>Harnessing Web3 for Decentralized, Verifiable Identity and Credentials</p>
            <button onClick={() => navigate('/register')}>Register</button>
        </>
    )
    const form = (
        <>
            <div clas style={{ display: 'flex', flexDirection: 'column' }} className='d-flex'>
                <p>{wrongCredential && renderDesc()}</p>
                {/* <select name="role" onChange={handleRoleChange} value={role}>
                    <option value="#">Select Role</option>
                    <option value="0">Authority</option>
                    <option value="1">Client</option>
                </select> */}
            </div>
            <button onClick={submitLoginForm}>Login</button>
        </>
    )


    return (
        <>
            <FormLoyout WelcomeNote={WelcomeNote} form={form} />
        </>

    )
}
export default Login