import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import Web3 from 'web3';
import simpleStorageABI from './contracts/SimpleStorage.json';
const simpleStorageAddress = '0xaAEAe7C75b53A17A0a51FcfeAE32589AD9210628';



function App() {

  const [data , setDataValue] = useState('')
  const [account, setAccounts] = useState('')



  const requestAccount = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    console.log(accounts);
      setAccounts(accounts[0]);
  }

  const fetchData = async () => {
    if(window.ethereum !== 'undefined'){
      const web3 = new Web3(Web3.givenProvider || 'http://120.0.0.1:9545')
      const simpleStorage = new web3.eth.Contract(simpleStorageABI.abi, simpleStorageAddress);
      let result = await simpleStorage.methods.getData().call();
      console.log(result);
      console.log(account)
    }
  }

  const setData = async () => {
    if(window.ethereum !== 'undefined'){
      const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:9545')
      const simpleStorage = new web3.eth.Contract(simpleStorageABI.abi, simpleStorageAddress);
      await simpleStorage.methods.setData(data).send({from : account})
      let result = await simpleStorage.methods.getData().call()
      setDataValue('')
      console.log(result);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={requestAccount}>Connect Metamask</button>
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
