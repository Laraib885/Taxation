import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { ContextState } from '../../Context/AppContext';


function TaxRules() {
    const [taxModalOpen, setTaxModalOpen] = useState();
    const [registFeeModal, setRegistFeeModal] = useState();
    const [newTaxAmount, setNewTaxAmount] = useState();
    const [newRegistFee, setNewRegistFee] = useState();
    const [successMessage, setSuccessMessage] = useState();
    const [registFee, setRegistFee] = useState()
    const [taxAmount, setTaxAmount] = useState()

    const { MainContract } = ContextState();

    const navigate = useNavigate();

    const closeTaxModal = () => {
        setTaxModalOpen(false);
    }
    const closeRegistFeeModal = () => {
        setRegistFeeModal(false);
    }

    const getFeeDetails = async () => {
        const contract = await MainContract(true);
        try {
            const _taxAmount = await contract.taxAmountUSD();
            const _registerationFee = await contract.RegistFee();
            setTaxAmount(Number(_taxAmount));
            setRegistFee(Number(_registerationFee));
        } catch (error) {
            console.log(error);
        }
    }
    const updateRegistFee = async (e) => {
        e.preventDefault();
        const contract = await MainContract(true);
        try {
            const tx = await contract.updateRegistFee(newRegistFee);
            await tx.wait();
            setSuccessMessage("Fee Updated Successfully")
        } catch (error) {
            console.log(error);
        }

    }

    const updateTaxAmount = async (e) => {
        e.preventDefault();
        const contract = await MainContract(true);
        try {
            const tx = await contract.updateTaxAmount(newTaxAmount);
            await tx.wait();
            setSuccessMessage("Tax Updated Successfully");
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(()=>{
        const fetch = async()=>{
            await getFeeDetails();
        }
        fetch();
    },[])
    return (
        <>
            <div className='GeneralTable'>
                <table>
                    <tr>
                        <th>Registration Fees</th>
                        <td>${registFee}</td>
                        <td><button onClick={() => setRegistFeeModal(true)}>Update</button></td>
                    </tr>
                    <tr>
                        <th>Yearly Tax</th>
                        <td>${taxAmount}</td>
                        <td><button onClick={() => setTaxModalOpen(true)}>Update</button></td>
                    </tr>
                </table>
            </div>



            {/* MODAL FOR UPDATING TAX AMOUNT  */}
            <Modal className='SmallModal' isOpen={taxModalOpen} onRequestClose={closeTaxModal}>
                <div className='SearchModal'>
                    {successMessage != undefined ?
                        <h4>{successMessage}</h4>
                        :
                        <form action="">
                            <input type="text" onChange={(e) => setNewTaxAmount(e.target.value)} placeholder='Enter New Amount' />
                            <button onClick={updateTaxAmount}>Update</button>
                        </form>
                    }
                </div>
            </Modal>


            {/* MODAL FOR UPDATING REGISTERATION FEES */}
            <Modal className='SmallModal' isOpen={registFeeModal} onRequestClose={closeRegistFeeModal}>
                <div className='SearchModal'>
                    {successMessage != undefined ?
                        <h4>{successMessage}</h4>
                        :
                        <form action="">
                            <input type="text" onChange={(e) => setNewRegistFee(e.target.value)} placeholder='Enter New Amount' />
                            <button onClick={updateRegistFee}>Update</button>
                        </form>
                    }

                </div>
            </Modal>
        </>

    )
}

export default TaxRules