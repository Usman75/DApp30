import logo from './logo.svg';
import './App.css';
import {useState , useEffect} from 'react';
import Web3 from 'web3';
import Crud from './contracts/Crud.json';
const crudAddress = '0xaAEAe7C75b53A17A0a51FcfeAE32589AD9210628';


function App() {
    const [account, setAccounts] = useState(null);
    const [crud, setContract] = useState('');
    const [user, setUser] = useState('');
    const [ msg, setMsg] = useState(null);
    const [userId, setId] = useState('');
    const [userData , setData] = useState(null);


    const initAccount = async () => {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccounts(accounts[0]);
        console.log(account);
        initContrct();
        
    }
    const initContrct = async () => {
      if(window.ethereum !== 'undefined'){
        const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:9545')
        const contract = new web3.eth.Contract(Crud.abi, crudAddress);
        setContract(contract);
        console.log('Contract Initilized: ',contract);
    }
  }

    const createUser = async () => {
      console.log(user);
      await crud.methods.create(user).send({from: account});
      setMsg(user);
      setUser('');
    }
    const getUser = async () => {
    
      let _id = parseInt(userId);
      console.log(_id);
      const result = await crud.methods.read(_id).call();
      setId('');
      setData(result);
      console.log(userData);
    }

    const updateUser = async () => {
      let _id = parseInt(userId);
      const result = await crud.methods.update(_id, user).send({from: account});
      setId('');
      setUser('');
      console.log(result);
    }

    const deleteUser = async () => {
      let _id = parseInt(userId);
      const result = await crud.methods.remove(_id).send({from : account});
      setId('');
      console.log(result);
    }

  
  //   useEffect( (contract) => {
  //      initAccount();
  //      if(contract){
  //        initContrct();
  //        setCon(false);
  //      }
    
  //  });
  return (
    
    <div className="App">
      
        <button onClick={initAccount}> {account?'Connected': 'Connec Wallet'}</button>
       <p className=".bg-info">{account}</p>


       Create User : <input onChange = {e => setUser(e.target.value)} placeholder = "Name"  />
       <button type="button" className="btn btn-primary" onClick ={createUser}> Add User </button><br />
       <p className="text-success">{msg?`The new user ${msg} created`:''} </p>
       
       
       View User : <input onChange = {e => setId(e.target.value)} placeholder = "ID"  />
       <button type="button" className="btn btn-info" onClick={getUser} >Submit</button>
        <p className=".text-info"> {userData ? `ID : ${userData[0]} User : ${userData[1]}` : ''} </p>


        Update User: <input onChange = {e => setId(e.target.value)} placeholder = "ID"  />
        <input onChange = {e => setUser(e.target.value)} placeholder = "Name"  />
         <button type="button" className="btn btn-warning" onClick={updateUser} >Update</button><br />
         <br />
        Delete User : <input onChange = {e => setId(e.target.value)} placeholder = "ID"  />
        <button type="button" className="btn btn-danger" onClick={deleteUser} >Delete</button>

    </div>
  );
}

export default App;
