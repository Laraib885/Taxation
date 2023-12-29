import React, { useEffect, useState } from 'react'
import { ContextState } from '../../Context/AppContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/Header';
import Modal from 'react-modal';


function GetOwnership() {
  const { MainContract, ipfs } = ContextState();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState();

  const [vehicles, setVehicles] = useState();
  const [selectedVehicle, setSelectedVehicle] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(true);

  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setSuccessMessage] = useState();
  const [vehicleInfo, setVehicleInfo] = useState({
    ownerName: '',
    address: '',
    postalCode: '',
    country: '',
    phoneNumber: '',
    email: '',
  });


  const closeModal = async () => {
    setIsOpen(false);
  }




  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleInfo({
      ...vehicleInfo,
      [name]: value
    });
  };

  // Get Bought Vehicles
  const getBoughtVehicles = async () => {
    const contract = await MainContract(true);
    try {
      const res = await contract.getBoughtVehile();
      let respArray = [];
      const promises = res.map(async (item) => {
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


  const OpenSellModal = async (item, index) => {
    setErrorMessage(undefined)
    console.log(item);
    setSelectedVehicle(item);
    setSelectedIndex(index);
    setIsOpen(true);
  }

  const uploadToIpfs = async (data) => {
    const { ownerName, address, postalCode, country, phoneNumber, email } = data;
    const { chassisNumber, companyName, make, colour, year, vehicleModal, companyCode } = selectedVehicle.ipfsData;
    const stringData = JSON.stringify({ ownerName, address, postalCode, country, companyName, companyCode, phoneNumber, email, chassisNumber, make, vehicleModal, colour, year });
    try {
      const added = await ipfs.add(stringData);
      return added.path;
    } catch (error) {
      console.log(error);
    }
  }

  // ============AVAIL BOUGHT VEHICLES=========
  const availBoughtVehicle = async (e) => {
    e.preventDefault();
    const contract = await MainContract(true);
    const url = await uploadToIpfs(vehicleInfo);
    console.log("This issaaa RegistNumber", url);
    console.log("This issaaa Url", url);
    console.log("This issaaa selectedIndex", selectedIndex);
    const _registNumber = selectedVehicle.registNumber;
    try {
      const tx = await contract.changeOwnerShip(_registNumber, url, selectedIndex)
      setSuccessMessage("Vehicle Availed Successfully")
      window.location.reload();
    } catch (error) {
      console.log(error.message);
      setErrorMessage("Couldn't Avail Vehicle")
    }
  }

  useEffect(() => {
    const fetch = async () => {
      await getBoughtVehicles();
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
              <th>Make</th>
              <th>Paid Tax</th>
              <th>Unpaid Tax</th>
              <th>Image</th>
            </tr>
            {vehicles &&
              vehicles.map((item, index) => (
                <tr>
                  <td>{item.ipfsData.vehicleModal}</td>
                  <td>{item.ipfsData.chassisNumber}</td>
                  <td>{item.ipfsData.colour}</td>
                  <td>{item.ipfsData.companyName}</td>
                  <td>{item.ipfsData.companyCode}</td>
                  <td>{item.ipfsData.make}</td>
                  <td>${Number(item.contractData?.paidTax)}</td>
                  <td>${Number(item.contractData?.unpaidTax)}</td>
                  <td><a target='_blank' href={`https://digitalverse.infura-ipfs.io/ipfs/${item.ipfsData.imageUrl}`}>Click Here</a></td>
                  <td><button onClick={() => OpenSellModal(item, index)}>Avail</button></td>
                </tr>
              ))

            }
          </table>
        </div>
        <Modal className='BigModal TransferOwnerShipModal GeneralForm' isOpen={isOpen} onRequestClose={closeModal}>
          <form>
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
                  <input name="ownerName" type="text" onChange={handleChange} placeholder='Enter Owner Name' />
                  <input name="address" type="text" onChange={handleChange} placeholder='Address' />
                  <input name="postalCode" type="text" onChange={handleChange} placeholder='City Postal Code' />
                  <input name="country" type="text" onChange={handleChange} placeholder='Country' />
                  <input name="phoneNumber" type="text" onChange={handleChange} placeholder='Phone Number' />
                  <input name="email" type="text" onChange={handleChange} placeholder='Email' />
                  <div>
                  </div>
                  <div>
                    <button className='GeneralButton' onClick={closeModal}>Close</button>
                    <button className='GeneralButton' onClick={availBoughtVehicle}>Avail</button>
                  </div>
                </>
            }
          </form>

        </Modal>
      </div>




    </>
  )
}

export default GetOwnership;