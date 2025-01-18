import { useEffect } from "react";
import { useState } from "react";
import { getOrders } from "../../services/order";
import '../../styles/pages/manager/manager.css';

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
            <h2>{order.customerName}, {order.orderReelGroups.reduce((total, orderReelGroup) => total+orderReelGroup.qty, 0)}</h2>
        </div>
    )

};
const Manager = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getOrders('active').then((orders) => {
            setOrders(orders.data);
        });
    }, []); 

    return (
        <div id="orders"> 
            <div id="ordersDisplay">
                {orders.map((order) => <OrderComponent order={order}/>)}
            </div>
        </div>
    )
}

export default Manager;