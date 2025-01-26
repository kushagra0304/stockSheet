import 'purecss/build/forms.css'
import 'purecss/build/tables.css'
import { useEffect, useState } from 'react';
import { getOrders } from '../services/order';
import OrderDisplay from '../components/OrderDisplay';
  
const Order = () => {
    const [filterType, setFilterType] = useState('active');
    const [orders, setOrders] = useState([]);

    const handleOptionChange = (event) => {
        setFilterType(event.target.value);
    };

    useEffect(() => {
        getOrders(filterType).then((orders) => {
            setOrders(orders.data);
        });
    }, [filterType]);

    return (
        <div id="orders"> 
            <form id="ordersFilters" style={{
                    display: 'flex',
                    gap: '6px'
                }}
                className="pure-form"
            >
                <label for="activeOrderFilter" class="pure-radio">
                    <input 
                        type = "radio" 
                        id = "activeOrderFilter" 
                        name = "filterType" 
                        value = "active"
                        checked = {filterType === "active"}
                        onChange = { handleOptionChange }
                    /> Active
                </label>
                <label for="dispatchedOrderFilter" class="">
                    <input 
                        type = "radio" 
                        id = "dispatchedOrderFilter" 
                        name = "filterType" 
                        value = "dispatched"
                        checked = {filterType === "dispatched"}
                        onChange = { handleOptionChange }
                    /> Dispatched
                </label>
            </form>
            <div id="ordersDisplay">
                {orders.map((order) => <OrderDisplay order={order}/>)}
            </div>
        </div>
    )
}

export default Order;

