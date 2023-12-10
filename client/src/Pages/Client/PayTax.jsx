import React, { useEffect, useState } from 'react'
import { ContextState } from '../../Context/AppContext';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ethers } from 'ethers';

function PayTax() {
  const { MainContract } = ContextState();
  const navigate = useNavigate();
  const params = useParams();

  const [registNumber, setRegistNumber] = useState();
  const [taxAmount, setTaxAmount] = useState();
  const [year, setYear] = useState();
  const [priceInEth, setPriceInEth] = useState();



  const getMyVehicles = async () => {
    const contract = await MainContract(true);
    try {
      const vehical = await contract.getVehicleByRegNum(params.registNumber);
      console.log("Vehical Detail", Number(vehical.unpaidTax));
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
    taxAmount && await convertInEther(taxAmount);
    console.log("Price in Ethers", priceInEth);
    const convertedAmount = ethers.utils.parseUnits(priceInEth.toString());
    console.log("Converted Amount", Number(convertedAmount));
    console.log("Regist Number", registNumber)
    const contract = await MainContract(true);
    try {
      const tx = await contract.payTax(registNumber, convertedAmount, year, {value : convertedAmount});
      await tx.wait();
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
    <div className='GeneralForm'>
      <form>
        <input type="text" value={registNumber && registNumber.slice(0, 5) + "..."} placeholder='Enter the Registeration Number' />
        <input type="text" value={taxAmount && "$" + taxAmount} placeholder='Enter Amount in US Dollar' />
        <input onChange={(e) => setYear(e.target.value)} type="text" placeholder='Enter the Year' />
        <button onClick={payTaxFunc}>Pay Tax</button>
      </form>
    </div>
  )
}

export default PayTax;