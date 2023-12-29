import React, { useEffect, useState } from 'react'
import { ContextState } from '../../Context/AppContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import Header from '../../Components/Header';

function SellVehicle() {
    const { MainContract } = ContextState();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState();
    const [selectedRegistNumber, setSelectedRegistNumber] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState(true);
    const [priceInUSD, setPriceInUSD] = useState();
    const [reciverAddr, setReciverAddr] = useState();
    const [priceInEth, setPriceInEth] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [successMessage, setSuccessMessage] = useState();

    const [vehicles, setVehicles] = useState();

    const closeModal = async () => {
        setIsOpen(false);
    }

    const OpenSellModal = async (item, index) => {
        setSelectedRegistNumber(item);
        setSelectedIndex(index);
        setIsOpen(true);
    }


    // const convertInEther = async (price) => {
    //     // Get price converted to BNB by Using API
    //     const priceAPI = `https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=ETH,USD`;
    //     let oneUSD;
    //     await axios.get(priceAPI)
    //       .then((data) => {
    //         const dollar = data.data.USD;
    //         oneUSD = (1 / dollar);
    //         console.log("One USD PRICE", oneUSD)
    //         let total = price * oneUSD;
    //         setPriceInEth(total);
    //       }).catch((err) => {
    //         console.log(err);
    //       })
    //   }

    const setOnSell = async (e) => {
        e.preventDefault();
        const contract = await MainContract(true);
        try {
            const tx = await contract.sellVehicle(selectedRegistNumber, priceInUSD, reciverAddr, selectedIndex);
            console.log(tx);
            setSuccessMessage("Vehicle Listed On Sell");
        } catch (error) {
            console.log("Error Message", error.message);
            setErrorMessage("Some Issue Occured");
        }
    }

    const getMyVehicles = async () => {
        const contract = await MainContract(true);
        try {
            const vehicles = await contract.getUserVehicles();
            let respArray = [];
            const promises = vehicles.map(async (item) => {
                const vehicle = await contract.getVehicleByRegNum(item);
                console.log(vehicle.infoHash)
                const res = await axios.get(`https://digitalverse.infura-ipfs.io/ipfs/${vehicle.infoHash}`);
                respArray.push({ ipfsData: res.data, contractData: vehicle, registNumber: item });
                console.log(respArray[0], vehicle);
                // return {ipfsData : respArray[0], contractData : vehicle};
                return respArray[0]
            })
            // const {ipfsData, contractData} = await Promise.all(promises);
            const result = await Promise.all(promises);
            console.log(result)
            // console.log(ipfsData, contractData);
            setVehicles(result);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        const fetch = async () => {
            await getMyVehicles();
        }
        fetch();
    }, [])
    return (
        <>
            <Header />
            <div className='MyVehicles'>
                <div className='GeneralTable'>
                    <table>
                        <tr>
                            <th>Regist Number</th>
                            <th>Modal</th>
                            <th>Chassis Number</th>
                            <th>Colour</th>
                            <th>Company Name</th>
                            <th>Company Code</th>
                            <th>Make</th>
                            <th>Paid Tax</th>
                            <th>Unpaid Tax</th>
                            <th>Image</th>
                            <th>==</th>
                        </tr>
                        {vehicles &&
                            vehicles.map((item, index) => (
                                <tr>
                                    <td>{item.registNumber.slice(0, 5) + "..."}</td>
                                    <td>{item.ipfsData.vehicleModal}</td>
                                    <td>{item.ipfsData.chassisNumber}</td>
                                    <td>{item.ipfsData.colour}</td>
                                    <td>{item.ipfsData.companyName}</td>
                                    <td>{item.ipfsData.companyCode}</td>
                                    <td>{item.ipfsData.make}</td>
                                    <td>${Number(item.contractData?.paidTax)}</td>
                                    <td>${Number(item.contractData?.unpaidTax)}</td>
                                    <td><a target='_blank' href={`https://digitalverse.infura-ipfs.io/ipfs/${item.ipfsData.imageUrl}`}>Click Here</a></td>
                                    <td><button onClick={() => OpenSellModal(item.registNumber, index)}>Sell</button></td>

                                </tr>
                            ))

                        }
                    </table>
                </div>
            </div>



            {/* =========MODEL FOR SELL VEHICLE========== */}
            <Modal className='BigModal SellVehicleModal' isOpen={isOpen} onRequestClose={closeModal}>
                <div className='bigModalInner GeneralForm'>
                    {errorMessage ?
                        <>
                            <h3>{errorMessage}</h3>
                            <div className='subCancelBtn'>
                                <button className='GeneralButton' onClick={closeModal}>Close</button>
                            </div>
                        </>

                        : successMessage ?
                            <>
                                <h3>{successMessage}</h3>
                                <div className='subCancelBtn'>
                                    <button className='GeneralButton' onClick={closeModal}>Close</button>
                                </div>
                            </>
                            :
                            <>
                                <form action="">
                                    <label htmlFor="">Registeration Number</label>
                                    <input type="text" value={selectedRegistNumber} placeholder='Registeration Number' />
                                    <label htmlFor="">Receiver Address</label>
                                    <input onChange={(e) => setReciverAddr(e.target.value)} type="text" placeholder='Receiver Adress' />
                                    <label htmlFor="">Price in USD</label>
                                    <input onChange={(e) => setPriceInUSD(e.target.value)} type="text" placeholder='Price in USD' />
                                </form>
                                <div className='subCancelBtn'>
                                    <button className='GeneralButton' onClick={closeModal}>Cancel</button>
                                    <button onClick={setOnSell} className='GeneralButton'>Sell</button>
                                </div>
                            </>
                    }
                </div>
            </Modal>

        </>
    )
}

export default SellVehicle;