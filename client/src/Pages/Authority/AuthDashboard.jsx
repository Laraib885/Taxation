import React, { useState } from 'react';
import '../Style.css';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

function AuthDashboard() {
    const navigate = useNavigate();

    const [searchModalOpen, setSearchModalOpen] = useState();
    const [searchRegNumber, setSearchRegNumber] = useState();

    // Close Search Modal
    const closeSearchModal = () => {
        setSearchModalOpen(false);
    }
    return (
        <>
            <div className='welcomePage'>
                <button>Vehicle Details</button>
                <button>Update Admin</button>
                <button onClick={() => setSearchModalOpen(true)}>Search Vehical</button>
                <button onClick={() => navigate('/AllVehicles')}>All Vehicles</button>
                <button onClick={() => navigate('/TaxRules')}>Taxation Rules</button>
            </div>

            <Modal className='SmallModal' isOpen={searchModalOpen} onRequestClose={closeSearchModal}>
                <div className='SearchModal'>
                    <form action="">
                        <input type="text" onChange={(e) => setSearchRegNumber(e.target.value)} placeholder='Enter The Registeration Number' />
                        <button onClick={()=>navigate(`/VehicleDetail/${searchRegNumber}`)}>Search</button>
                    </form>
                </div>
            </Modal>

        </>





    )
}

export default AuthDashboard