import React, { useEffect, useState } from 'react'
import { ContextState } from '../../Context/AppContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AllVehicles() {
    const { MainContract } = ContextState();
    const navigate = useNavigate();

    const [vehicles, setVehicles] = useState();


    const getAllVehicles = async () => {
        const contract = await MainContract(true);
        try {
            const vehicles = await contract.getAllVehicles();
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
            console.log(error);
        }
    }

    useEffect(() => {
        const fetch = async () => {
            await getAllVehicles();
        }
        fetch();
    }, [])
    return (
        <div className='MyVehicles GeneralTable'>
            <table>
                <tr>
                    <th>Vehicle Modal</th>
                    <th>Chassis Number</th>
                    <th>Colour</th>
                    <th>Company Name</th>
                    <th>Company Code</th>
                    <th>Make</th>
                    <th>Paid Tax</th>
                    <th>Unpaid Tax</th>
                </tr>
                {vehicles &&
                    vehicles.map((item) => (
                        <tr>
                            <td>{item.ipfsData.vehicleModal}</td>
                            <td>{item.ipfsData.chassisNumber}</td>
                            <td>{item.ipfsData.colour}</td>
                            <td>{item.ipfsData.companyName}</td>
                            <td>{item.ipfsData.companyCode}</td>
                            <td>{item.ipfsData.make}</td>
                            <td>${Number(item.contractData?.paidTax)}</td>
                            <td>${Number(item.contractData?.unpaidTax)}</td>
                        </tr>
                    ))

                }
            </table>
        </div>
    )
}

export default AllVehicles