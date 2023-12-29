import React, { useEffect, useState } from 'react'
import { ContextState } from '../../Context/AppContext';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ethers } from 'ethers';
import Header from '../../Components/Header';
import Modal from 'react-modal';

function PayTax() {
  const { MainContract } = ContextState();
  const navigate = useNavigate();
  const params = useParams();

  const [registNumber, setRegistNumber] = useState();
  const [taxAmount, setTaxAmount] = useState();
  const [year, setYear] = useState();
  const [priceInEth, setPriceInEth] = useState();
  const [isOpen, setIsOpen] = useState();

  const closeModal = async () => {
    setIsOpen(false);
    navigate('/MyVehicles');
}

  const getMyVehicles = async () => {
    const contract = await MainContract(true);
    try {
      const vehical = await contract.getVehicleByRegNum(params.registNumber);
      setRegistNumber(params.registNumber);
      setTaxAmount(Number(vehical.unpaidTax))
    } catch (error) {
      console.log(error);
    }
  }

  const convertInEther = async (price) => {
    // Get price converted to BNB by Using API
    const priceAPI = `https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=ETH,USD`;
    let oneUSD;
    await axios.get(priceAPI)
      .then((data) => {
        const dollar = data.data.USD;
        oneUSD = (1 / dollar);
        console.log("One USD PRICE", oneUSD)
        let total = price * oneUSD;
        setPriceInEth(total);
      }).catch((err) => {
        console.log(err);
      })
  }

  const payTaxFunc = async (e) => {
    e.preventDefault();
    console.log("Tax amount", taxAmount);
    taxAmount && await convertInEther(taxAmount);
    console.log("Price in Ethers", priceInEth);
    const rounded = parseFloat(priceInEth.toFixed(16));
    console.log(rounded)
    const convertedAmount = ethers.utils.parseUnits(rounded.toString(), 18);
    console.log("Converted Amount", Number(convertedAmount));
    console.log("Regist Number", registNumber)
    const contract = await MainContract(true);
    try {
      const tx = await contract.payTax(registNumber, convertedAmount, year, { value: convertedAmount });
      await tx.wait();
      setIsOpen(true);
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
      <div className='PayTax'>
        <div className='GeneralForm'>
          <form>
            <input type="text" value={registNumber && registNumber.slice(0, 5) + "..."} placeholder='Enter the Registeration Number' />
            <input type="text" value={taxAmount && "$" + taxAmount} placeholder='Enter Amount in US Dollar' />
            <input onChange={(e) => setYear(e.target.value)} type="text" placeholder='Enter the Year' />
            <button className='GeneralButton' onClick={payTaxFunc}>Pay Tax</button>
          </form>
        </div>
      </div>


      <Modal className='RegisteredModal SmallModal' isOpen={isOpen} onRequestClose={closeModal}>
        <div className='RegisteredModal-inner'>
          <div className='registeredModal-Desc'>
            <h5 >Tax Paid Successfully</h5>
          </div>
          <button className='GeneralButton' onClick={closeModal}>Close</button>
        </div>
      </Modal>

    </>
  )
}

export default PayTax;