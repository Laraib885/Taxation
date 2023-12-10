import React, { useState } from 'react';
import { ContextState } from '../../Context/AppContext';


function RegisterVehicle() {
    const [vehicleInfo, setVehicleInfo] = useState(
        {
            ownerName: '',
            address: '',
            postalCode: '',
            country : '',
            companyName: '',
            companyCode: '',
            phoneNumber: '',
            email: '',
            chassisNumber: '',
            make: '',
            vehicleModal: '',
            colour: '',
            year: ''
        });

        const {ipfs, MainContract} = ContextState();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVehicleInfo({
            ...vehicleInfo,
            [name]: value
        });
    };


    // =======UPLOAD DATA TO IPFS
    const uploadToIpfs = async(data)=>{
        const {ownerName, address, postalCode, country , companyName, companyCode, phoneNumber, email, chassisNumber, make, vehicleModal, colour, year} = data;
        const stringData = JSON.stringify({ownerName, address, postalCode, country , companyName, companyCode, phoneNumber, email, chassisNumber, make, vehicleModal, colour, year});
        try {
            const added = await ipfs.add(stringData);
            return added.path;
        } catch (error) {
            console.log(error);
        }
    }

    // REGISTER VEHICLE
    const registerVehicle = async()=>{
        const contract = await MainContract(true);
        const url = await uploadToIpfs(vehicleInfo);
        const {chassisNumber} = vehicleInfo;
        console.log("This isaa Url", url);
        console.log("Chassis Number", chassisNumber)
        try {
            const tx = await contract.registerVehicle(chassisNumber, url);
            const receipt = await tx.wait();
            const regNumber = receipt.events[0].args.regNumber;
            console.log(regNumber);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className='RegisterVehicle'>
            <div className='GeneralForm'>
                <form>
                    <input name="ownerName" type="text" onChange={handleChange} placeholder='Enter Owner Name' />
                    <input name="address" type="text" onChange={handleChange} placeholder='Address' />
                    <input name="postalCode" type="text" onChange={handleChange} placeholder='City Postal Code' />
                    <input name="country" type="text" onChange={handleChange} placeholder='Country' />
                    <input name="companyName" type="text" onChange={handleChange} placeholder='Company Name' />
                    <input name="companyCode" type="text" onChange={handleChange} placeholder='Company Code' />

                    <label htmlFor="">Applicant Info</label>
                    <input name="phoneNumber" type="text" onChange={handleChange} placeholder='Phone Number' />
                    <input name="email" type="text" onChange={handleChange} placeholder='Email' />

                    <label htmlFor="">Vehicle Info</label>
                    <input name="chassisNumber" type="text" onChange={handleChange} placeholder='Chassis Number / VIN number Please enter the full 17 digits' />
                    <input name="make" type="text" onChange={handleChange} placeholder='Make' />
                    <input name="vehicleModal" type="text" onChange={handleChange} placeholder='Modal of Vehicle' />
                    <input name="colour" type="text" onChange={handleChange} placeholder='Colour' />
                    <input name="year" type="date" onChange={handleChange} placeholder='Year' />
                </form>
            </div>
            <button className='GeneralButton' onClick={registerVehicle}>Register</button>

        </div>

    )
}

export default RegisterVehicle;