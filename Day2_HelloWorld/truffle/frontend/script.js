
const ABI = 
[
    {
      "inputs": [],
      "name": "hello",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "pure",
      "type": "function",
      "constant": true
    }
  ];
const contractAddress = "0xaAEAe7C75b53A17A0a51FcfeAE32589AD9210628";

const web3 = new Web3('http://localhost:9545');

const helloWorld = new web3.eth.Contract(ABI,contractAddress);
document.addEventListener('DOMContentLoaded', () => {
helloWorld.methods.hello().call()
.then(res => {
    console.log("Message = " + res);
    document.getElementById('hello').innerHTML = res;
});
});