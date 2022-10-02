import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import './App.css';
import { useEffect, useState } from "react";
// import detectEthereumProvider from "@metamask/detect-provider";
// import Web3 from "web3";
// var Contract = require("web3-eth-contract");
// import Simpler from "./artifacts/contracts/Simple.sol/Simple.json";
import Storage from "./artifacts/contracts/Storage.sol/Storage.json";
import { ethers } from 'ethers';
import data from "./db.json"
import Show from './components/Show';


function App() {
  const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // smart contract address...
  const [form, setForm] = useState({
    adhar:"",
    number:0,
    cid:""
  })

  const { adhar, number, cid } = form;

  async function fetchCID() {
     if(typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(address, Storage.abi, provider);
      try {
        const data = await contract.getCID(form.adhar, form.number);
        setForm({ ...form, cid:data });
      } catch(err) {
        console.log(err);
      }
     }
  }

  async function set() {
    if(typeof window.ethereum !== 'undefined' ) {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(address, Storage.abi, signer);
      const transaction = await contract.setCID(form.adhar, form.number, form.cid);
      await transaction.wait();
      fetchCID();
    }
  }

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function handleSubmit (e) {
   e.preventDefault();
   await set();
   setForm({
    adhar:"", number:0, cid:""
  });
  }

  async function handler() {
    await fetchCID();
    // setForm({
    //   ...form, adhar:"", number:0
    // });
  }

  
  
  return (
    <>
    <Typography align='center' variant='h3' sx={{ margin:"2%"}}>ADMIN DASHBOARD</Typography>
    <Paper  elevation={3}>
      <Box sx={{ margin:"20px", padding:"2%"}}>
      <form onSubmit={handleSubmit}>
        <Typography variant='h5' align='center'>ENTER PATIENTS DETAIL TO BLOCKCHAIN</Typography>
      <TextField  sx={{ margin:"10px"}}   value={adhar} variant="outlined"  label="adhar" type="text" name='adhar' fullWidth onChange={(e) => setForm({...form , adhar : e.target.value})} />
        <TextField  sx={{ margin:"10px"}}   value={number} variant="outlined" label="which number?"  type="number" name='number' fullWidth onChange={(e) => setForm({...form , number : e.target.value})} />
        <TextField  sx={{ margin:"10px"}}   value={cid} variant="outlined" label="Enter CID"  type="text" name='cid' fullWidth onChange={(e) => setForm({...form , cid : e.target.value})} />
        <Button sx={{ margin:"2%"}} variant='outlined' type='submit' >SET</Button>
      </form> 
      </Box>
    </Paper>
    <Paper elevation={3} >
      {/* <Box sx={{ margin:"20px", padding:"2%"}}>
        <Typography>GET CIID</Typography>
        <TextField sx={{ margin:"10px"}} value={adhar} variant="outlined" label="adhar" type="text" name='adhar' fullWidth onChange={(e) => setForm({...form , adhar : e.target.value})} />
        <TextField sx={{ margin:"10px"}} value={adhar} variant="outlined" label="adhar" type="text" name='adhar' fullWidth onChange={(e) => setForm({...form , adhar : e.target.value})} />
        <TextField   sx={{ margin:"10px"}}  value={number} variant="outlined" label="which number?"  type="number" name='number' fullWidth onChange={(e) => setForm({...form , number : e.target.value})} />
        <Button  sx={{ margin:"2%"}} variant='outlined' onClick={handler} >GETCID</Button>
      </Box> */}
      <Box>
       <Show />
      </Box>
    </Paper>
    </>
  );
}

export default App;
