import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import { ethers } from 'ethers';
import SimpleStorage from './contracts/SimpleStorage.json';

const simpleStorageAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";


function App() {
  const [data , setDataValue] = useState('')

  async function requestAccount(){
    await window.ethereum.request({ method: 'eth_requestAccounts'});
  }
  async function fetchData(){
    if(typeof window.ethereum !== 'undefined'){
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(simpleStorageAddress, SimpleStorage.abi, provider)
      try{
        const data = await contract.getData();
        console.log('data: ', data)
      } catch (err) {
        console.log('Error: ', err)
      }
    }
  }
  async function setData(){
    if(!data) return
    if(typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(simpleStorageAddress, SimpleStorage.abi, signer)
      const transaction = await contract.setData(data)
      await transaction.wait()
      setDataValue('')
      fetchData()
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={fetchData}>Fetch Data</button>
        <button onClick={setData}>Set Data</button>
        <input
         onChange={e => setDataValue(e.target.value) }
         placeholder= 'Set Data'
         value={data}  />
      </header>
    </div>
  );
}

export default App;
