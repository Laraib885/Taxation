import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ContextState } from '../../Context/AppContext';
import axios from 'axios';

function VehicleDetail() {
    const params = useParams();
    const navigate = useNavigate();
    const { MainContract } = ContextState();

    const [vehicleDetail, setVehicleDetail] = useState();

    const searchVehicle = async () => {
        const contract = await MainContract(true);
        try {
            const vehicle = await contract.getVehicleByRegNum(params.registNumber);
            const info = await axios.get(`https://digitalverse.infura-ipfs.io/ipfs/${vehicle.infoHash}`);
            console.log(info.data);
            setVehicleDetail({ ipfsData: info.data, contractData: vehicle });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const fetch = async () => {
            await searchVehicle()
        }
        fetch();
    }, [])

    return (
        <div className='MyVehicles GeneralTable'>
            <table>
                <tr>
                    <th>Vehicle Owner</th>
                    <th>Registeration Number</th>
                    <th>Vehicle Modal</th>
                    <th>Chassis Number</th>
                    <th>Colour</th>
                    <th>Company Name</th>
                    <th>Company Code</th>
                    <th>Make</th>
                    <th>Paid Tax</th>
                    <th>Unpaid Tax</th>
                </tr>
                {vehicleDetail &&
                    <tr>
                        <td>{vehicleDetail.ipfsData.vehicleModal}</td>
                        <td>{params.registNumber?.slice(0,5)+"..."}</td>
                        <td>{vehicleDetail.ipfsData.chassisNumber}</td>
                        <td>{vehicleDetail.ipfsData.colour}</td>
                        <td>{vehicleDetail.ipfsData.companyName}</td>
                        <td>{vehicleDetail.ipfsData.companyCode}</td>
                        <td>{vehicleDetail.ipfsData.make}</td>
                        <td>${Number(vehicleDetail.contractData?.paidTax)}</td>
                        <td>${Number(vehicleDetail.contractData?.unpaidTax)}</td>
                        {vehicleDetail.contractData.unpaidTax != 0 ?
                            <td><button onClick={() => navigate(`/PayTax/${vehicleDetail.registNumber}`)}>pay Tax</button></td>
                            :
                            <></>
                        }
                    </tr>
                }
            </table>
        </div>
    )
}

export default VehicleDetail