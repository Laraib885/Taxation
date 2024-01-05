import React, { useState } from 'react';
import { ContextState } from '../../Context/AppContext';
import Header from '../../Components/Header';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';



function RegisterVehicle() {
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState();

    const [imageUrl, setImageUrl] = useState();
    const [vehicleInfo, setVehicleInfo] = useState(
        {
            ownerName: '',
            address: '',
            postalCode: '',
            country: '',
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

    const [isOpen, setIsOpen] = useState();

    const { ipfs, MainContract } = ContextState();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVehicleInfo({
            ...vehicleInfo,
            [name]: value
        });
    };

    const closeModal = async () => {
        setIsOpen(false);
        // navigate('/');
    }

    // =======UPLOAD IMAGE TO IPFS
    const uploadImage = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const uploaded = await ipfs.add(file);
        const url = uploaded.path;
        console.log("Picture Uploaded", url);
        setImageUrl(url);
    }

    // =======UPLOAD DATA TO IPFS
    const uploadToIpfs = async (data) => {
        const { ownerName, address, postalCode, country, companyName, companyCode, phoneNumber, email, chassisNumber, make, vehicleModal, colour, year } = data;
        const stringData = JSON.stringify({ ownerName, address, postalCode, country, companyName, companyCode, phoneNumber, email, chassisNumber, make, vehicleModal, colour, year, imageUrl });
        try {
            const added = await ipfs.add(stringData);
            return added.path;
        } catch (error) {
            console.log(error);
        }
    }

    // REGISTER VEHICLE
    const registerVehicle = async () => {
        const contract = await MainContract(true);
        const url = await uploadToIpfs(vehicleInfo);
        const { chassisNumber } = vehicleInfo;
        console.log("This isaa Url", url);
        console.log("Chassis Number", chassisNumber)
        try {
            const tx = await contract.registerVehicle(chassisNumber, url);
            const receipt = await tx.wait();
            const regNumber = receipt.events[0].args.regNumber;
            console.log(regNumber);
            setIsOpen(true);
        } catch (error) {
            console.log(error);
            setIsOpen(true);
            setErrorMessage(true);
        }
    }


    return (
        <>
            <Header />
            <div className='RegisterVehicle'>
                <div className='GeneralForm'>
                    <form>
                        <div>
                            <h6>Owner Info</h6>
                            <input name="ownerName" type="text" onChange={handleChange} placeholder='Enter Owner Name' />
                            <input name="address" type="text" onChange={handleChange} placeholder='Address' />
                            <input name="postalCode" type="text" onChange={handleChange} placeholder='City Postal Code' />
                            <input name="country" type="text" onChange={handleChange} placeholder='Country' />
                            <input name="companyName" type="text" onChange={handleChange} placeholder='Company Name' />
                            <input name="companyCode" type="text" onChange={handleChange} placeholder='Company Code' />
                        </div>
                        <div>
                            <h6>Contact Info</h6>
                            <input name="phoneNumber" type="text" onChange={handleChange} placeholder='Phone Number' />
                            <input name="email" type="text" onChange={handleChange} placeholder='Email' />
                        </div>
                        <div>
                            <h6>Vehicle Info</h6>
                            <input name="chassisNumber" type="text" onChange={handleChange} placeholder='Chassis Number / VIN number Please enter the full 17 digits' />
                            <input name="make" type="text" onChange={handleChange} placeholder='Make' />
                            <input name="vehicleModal" type="text" onChange={handleChange} placeholder='Modal of Vehicle' />
                            <input name="colour" type="text" onChange={handleChange} placeholder='Colour' />
                            <input name="year" type="date" onChange={handleChange} placeholder='Year' />
                            <input name="year" type="file" onChange={uploadImage} placeholder='Upload Image' />
                        </div>

                    </form>
                </div>
                <button className='GeneralButton' onClick={registerVehicle}>Register</button>

            </div>


            <Modal className='RegisteredModal SmallModal' isOpen={isOpen} onRequestClose={closeModal}>
                <div className='RegisteredModal-inner'>
                    {errorMessage ?
                        <div className='registeredModal-Desc'>
                            <h5 >Error In Registering Vehicle</h5>
                        </div>
                        :
                        <div className='registeredModal-Desc'>
                            <h5 >Vehicle Registered Successfully</h5>
                        </div>
                    }
                    <button className='GeneralButton' onClick={closeModal}>Close</button>
                </div>
            </Modal>
        </>

    )
}

export default RegisterVehicle;