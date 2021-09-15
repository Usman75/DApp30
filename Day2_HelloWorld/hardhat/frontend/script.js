const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const contractABI = [
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
      "type": "function"
    }
  ];


  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545/');
  const signer = provider.getSigner();

  const helloWorld = new ethers.Contract(contractAddress,contractABI, provider);
  console.log(helloWorld);

  document.addEventListener("DOMContentLoaded", async ()=> {
       let result  = await helloWorld.hello();
       document.getElementById('hello').innerHTML = result;
  });
