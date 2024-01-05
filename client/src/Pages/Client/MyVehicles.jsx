import React, { useEffect, useState } from 'react'
import { ContextState } from '../../Context/AppContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/Header';

function MyVehicles() {
  const { MainContract } = ContextState();
  const navigate = useNavigate();

  const [vehicles, setVehicles] = useState();


  const getMyVehicles = async () => {
    const contract = await MainContract(true);
    try {
      const vehicles = await contract.getUserVehicles();
      let respArray = [];
      const promises = vehicles.map(async (item) => {
        const vehicle = await contract.getVehicleByRegNum(item);
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
              <th>Modal</th>
              <th>Chassis Number</th>
              <th>Colour</th>
              <th>Company Name</th>
              <th>Company Code</th>
              <th>Paid Tax</th>
              <th>Unpaid Tax</th>
              <th>Image</th>
              <th>==</th>
            </tr>
            {vehicles &&
              vehicles.map((item) => (
                <tr>
                  <td>{item.ipfsData.vehicleModal}</td>
                  <td>{item.ipfsData.chassisNumber}</td>
                  <td>{item.ipfsData.colour}</td>
                  <td>{item.ipfsData.companyName}</td>
                  <td>{item.ipfsData.companyCode}</td>
                  <td>${Number(item.contractData?.paidTax)}</td>
                  <td>${Number(item.contractData?.unpaidTax)}</td>
                  <td><a target='_blank' href={`https://digitalverse.infura-ipfs.io/ipfs/${item.ipfsData.imageUrl}`}>Click Here</a></td>
                  {item.contractData.unpaidTax != 0 ?
                    <td><button onClick={() => navigate(`/PayTax/${item.registNumber}`)}>Pay Tax</button></td>
                    :
                    <></>
                  }
                </tr>
              ))

            }
          </table>
        </div>
      </div>
    </>
  )
}

export default MyVehicles;