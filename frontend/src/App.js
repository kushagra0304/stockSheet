import axios from 'axios';
import { useState } from 'react'
import logo from './logo.svg';
import './App.css';
import Dispatch from './pages/Dispatch';


function App() {
  // const [shipmentDispatch, setShipmentDispatch] = useState(null); 

  // const handleSubmit = (event) => {
  //     event.preventDefault();

  //     axios.postForm('http://localhost:3001/uploadShipmentDispatch', {
  //       shipmentDispatch: shipmentDispatch
  //     });
  // }

  // const handleShipmentDispatchChange = (event) => {
  //   setShipmentDispatch(event.target.files[0]);
  // }
  
  // return (<>
  //   <form onSubmit={handleSubmit}>
  //     <label aria-label="Shipment dispatch">Shipment dispatch<input name="shipmentDispatch" onChange={handleShipmentDispatchChange} type="file"/></label>
  //     <button type='submit'>Submit</button>
  //   </form>
  // </>)

  return (
    <>
      <Dispatch/>
    </>
  )
}

export default App;
