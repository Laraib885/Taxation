import React, { useEffect, useState } from 'react'
import './CompStyle.css'
import { useNavigate } from 'react-router-dom'
import { ContextState } from '../Context/AppContext';

function Header() {
    const navigate = useNavigate();

    const { MainContract  } = ContextState();
    const [userInfo, setUserInfo] = useState();

    const navigateFunc = async () => {
        const did = sessionStorage.getItem('userDid');
        if (did) {
            navigate('/Welcome')
        } else {
            navigate('/')
        }
    }

    const logout = async()=>{
        sessionStorage.setItem('LoggedIn', false);
    }


    // const checkNetwork = async () => {
    //     console.log("This is being called")
    //     const signer = await getProviderOrSigner();
    //     const network = await signer.getNetwork();
    //     if (network.chainId !== 11155111) {
    //         window.alert("Change Network to Sepolia");
    //     }
    // }

    const getUserInfo = async()=>{
        const contract = await MainContract(true);
        try {
            const result = await contract.getUserInfo();
            setUserInfo(result);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
      getUserInfo();
    }, [])

    return (
        <div className='defaultLayout'>
            <div className="header">
                <div className="inner">
                    <div className='logosDiv'>
                        <img style={{ cursor: "pointer" }} onClick={() => navigateFunc()} src="/uniLogo.png" alt="Logo Image" />
                        <img style={{ cursor: "pointer" }} onClick={() => navigateFunc()} src="/logonew.png" alt="Logo Image" />
                    </div>
                    <ul>
                        {sessionStorage.getItem('userDid') &&
                            <li onClick={() => navigate('/UserProfile')}>Profile |</li>
                        }
                        <li onClick={() => navigate('/Services')}>SERVICES |</li>
                        <li onClick={() => navigate('/AboutUs')}>ABOUT US |</li>
                        <li onClick={() => navigate('/OurTeam')}>OUR TEAM |</li>
                        {sessionStorage.getItem('LoggedIn') ?
                            <li onClick={() => logout()}>LOGOUT |</li>
                            :
                            <li onClick={() => navigate('/register')}>SIGN IN |</li>
                        }
                    </ul>
                    <div className="buttonGroup">
                        {!sessionStorage.getItem('LoggedIn') ?
                            <>
                                <button onClick={() => navigate('/login')}>Login</button>
                                <button onClick={() => navigate('/login')}>Try Free</button>
                            </> :
                            <div className='userBar'>
                                <h6>{userInfo?.name}</h6>
                                <img src="/user.avif" alt="" />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;