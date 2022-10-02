import React, { useState } from 'react'
import axios from "axios";
import { Box, Typography, TextField, Button } from '@mui/material';
import './style.css';
const Show = () => {
    const [json, setJson] = useState(null);
    const [input, setInput] = useState("");
     const url = 'https://' + input + '.ipfs.dweb.link/db.json';

          async function loadJSON () {
            axios.get(url)
            .then(function (response) {
              setJson(response.data)
            })
            .catch(function (error) {
              console.log(error);
            })
            .then(function () {
              // always executed
            });    
          }

        console.log(input);
  return (
    <div>
      <Box>
      <TextField sx={{ margin:"10px"}} value={input} variant="outlined" label="CID" type="text" name='input' fullWidth onChange={(e) => setInput(e.target.value)} />
        <Button  sx={{ margin:"2%"}} variant='outlined' onClick={async() => loadJSON()} >LOAD JSON</Button>
      </Box>
      {
      json && <Box sx={{ margin:"1%", padding:"2%"}}>
        <Typography variant='h5'>Patient name : {json.name}</Typography>
        <Typography variant='h5'>Id: {json.patient_no}</Typography>

        <table id="table">
  <tr>
    <th>Urea</th>
    <th>Sodium</th>
  </tr>
  <tr>
    <td>{json.urea}</td>
    <td>{json.sodium}</td>
  </tr>
</table>
      </Box>
      }</div>
  )
}

export default Show;