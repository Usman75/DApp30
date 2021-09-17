import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import Web3 from 'web3';
import AdvancedStorage from './contracts/AdvancedStorage.json';
const AdvancedStorageAddress = '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9';



function App() {

  const [data , setDataValue] = useState('')
  const [allData, setAllData] = useState([])
  const [account, setAccounts] = useState('')



  const requestAccount = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    console.log(accounts);
      setAccounts(accounts[0]);
      fetchData()
  }

  const fetchData = async () => {
    if(window.ethereum !== 'undefined'){
      const web3 = new Web3(Web3.givenProvider || 'http://120.0.0.1:8545')
      const contract = new web3.eth.Contract(AdvancedStorage.abi, AdvancedStorageAddress);
      let result = await contract.methods.getAll().call();
      const _allData = result.join(', ')
      setAllData(_allData)
      console.log(_allData);
    }
  }

  const setData = async () => {
    if(window.ethereum !== 'undefined'){
      const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:9545')
      const contract = new web3.eth.Contract(AdvancedStorage.abi, AdvancedStorageAddress);
      await contract.methods.add(data).send({from : account})
      setDataValue('')
      fetchData()
      

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
         <p>Current Array: {allData}</p>
      </header>
    </div>
  );
}

export default App;
