import './App.css';
import Navbar from './components/Navbar';
import CreateOrder from './pages/CreateOrder';
import Dispatch from './pages/Dispatch';
import Stock from './pages/Stock';
import 'purecss/build/base.css'
import { Route, Routes } from 'react-router-dom'


function App() {
  return (
    <>
      <Routes>
        <Route path="/dispatch" element={<Dispatch/>} />
        <Route path="/" element={<Stock/>}/>
        <Route path="/createOrder" element={<CreateOrder/>}/>
        <Route path="/orders" element={<></>}/>
        <Route path="/manager" element={<></>}/>
      </Routes>
    </>
  )
}

export default App;
