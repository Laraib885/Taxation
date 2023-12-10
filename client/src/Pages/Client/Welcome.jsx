import React, { useState } from 'react';
import '../Style.css';
import { useNavigate } from 'react-router-dom';

function Welcome() {
    const navigate = useNavigate();

    return (
        <>
            <div className='welcomePage'>
                <button onClick={()=> navigate('/RegisterVehicle')}>Register Vehicle</button>
                <button>Vehicle Details</button>
                <button onClick={()=> navigate('/PayTax')}>Pay Tax</button>
                <button onClick={()=> navigate('/MyVehicles')}>My Vehicles</button>
            </div>


       
        </>





    )
}

export default Welcome