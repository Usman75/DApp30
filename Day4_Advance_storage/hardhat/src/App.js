import logo from './logo.svg';
import './App.css';
import {useState } from 'react';
import AdvancedStorage from './contracts/AdvancedStorage.json';
import { ethers } from 'ethers';
const AdvancedStorageAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3';


 
function App() {

    const [data , setDataValue] = useState('')
    const [allData , setAllData] = useState([])
  const [account, setAccounts] = useState('')



  const requestAccount = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    console.log(accounts);
      setAccounts(accounts[0]);
      fetchData()
  }

  const fetchData = async () => {
    if(typeof window.ethereum !== 'undefined'){
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(AdvancedStorageAddress, AdvancedStorage.abi, provider)
      try{
        const rawData = await contract.getAll();
        const _allData = rawData.map(id => id.toNumber())
        setAllData(_allData.join(', '));
        console.log('AllData: ', _allData)
      } catch (err) {
        console.log('Error: ', err)
      }
    }
  }

  const setData = async () => {
    if(!data) return
    if(typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(AdvancedStorageAddress, AdvancedStorage.abi, signer)
      const transaction = await contract.add(parseInt(data))
      await transaction.wait()
      setDataValue('')
      fetchData()
    }
  }
  

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={requestAccount} id ='connectMetamask' >Connect Metamask</button>
      
        <br />

        <button onClick={setData}>Set Data</button>
        <input
         onChange={e => setDataValue(e.target.value) }
         placeholder= 'Set Data'
         value={data}  />

        <p>Current Array: {allData}</p>
         
      </header>
    </div>
  );
}

export default App;
