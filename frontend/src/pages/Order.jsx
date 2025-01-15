import 'purecss/build/forms.css'
import 'purecss/build/tables.css'
import '../styles/pages/order.css'
import { useEffect, useState } from 'react';
import { getOrders } from '../services/order';

const OrderComponent = ({ order }) => {
    const createReelDS = () => {
        let reels = [];
        let qty = 0;

        order.orderReelGroups.forEach((orderReelGroup) => {
            for(let i = 0; i < orderReelGroup.qty; i++) {
                reels.push({
                    found: "No",
                    weight: "",
                    size: orderReelGroup.size,
                    gsm: orderReelGroup.gsm,
                    bf: orderReelGroup.bf,
                    shade: orderReelGroup.shade
                });
            };

            for(let i = qty; i < orderReelGroup.reels.length; i++) {
                reels[i].found = "Yes";
                reels[i].weight = orderReelGroup.reels[i].weight;
            }

            qty += orderReelGroup.qty;
        });

        return reels;
    }

    return (
        <div className='order'>
            <details>
                <summary><h2>{order.customerName}, {order.orderReelGroups.reduce((total, orderReelGroup) => total+orderReelGroup.qty, 0)}</h2></summary>
                <table className="pure-table pure-table-bordered">
                <thead>
                    <tr>
                        <th>S.no</th>
                        <th>Found</th>
                        <th>Weight</th>
                        <th>Size</th>
                        <th>GSM</th>
                        <th>BF</th>
                        <th>Shade</th>
                    </tr>
                </thead>
                <tbody>
                    {createReelDS().map((reel, index) => {
                        return (
                            <tr>
                                <td>{index+1}</td>
                                <td>{reel.found}</td>
                                <td>{reel.weight}</td>
                                <td>{reel.size}</td>
                                <td>{reel.gsm}</td>
                                <td>{reel.bf}</td>
                                <td>{reel.shade}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            </details>
        </div>
    )

};
  
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
                {orders.map((order) => <OrderComponent order={order}/>)}
            </div>
        </div>
    )
}

export default Order;

