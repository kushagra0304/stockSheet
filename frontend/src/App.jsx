import './App.css';
import Navbar from './components/Navbar.jsx';
import CreateOrder from './pages/CreateOrder.jsx';
import Dispatch from './pages/Dispatch.jsx';
import Stock from './pages/Stock.jsx';
import 'purecss/build/base.css'
import { Route, Routes } from 'react-router-dom'
import Order from './pages/Order.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path="/dispatch" element={<Dispatch/>} />
        <Route path="/" element={<Navbar/>}>
          <Route path='' element={<Stock/>} />
          <Route path='orders' element={<Order/>} />
        </Route>
        <Route path="/createOrder" element={<CreateOrder/>}/>
        <Route path="/manager" element={<></>}/>
      </Routes>
    </>
  )
}

export default App;
