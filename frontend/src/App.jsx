import './App.css';
import Navbar from './components/Navbar.jsx';
import CreateOrder from './pages/CreateOrder.jsx';
import Dispatch from './pages/Dispatch.jsx';
import Stock from './pages/Stock.jsx';
import 'purecss/build/base.css'
import { Outlet, Route, Routes } from 'react-router-dom'
import Order from './pages/Order.jsx';
import { default as ManagerOrder } from './pages/manager/order.jsx';
import Manager from './pages/manager/Manager.jsx';

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
        <Route path="/manager">
          <Route path="" element={<Manager/>}/>
          <Route path="order/:orderId" element={<ManagerOrder/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App;
