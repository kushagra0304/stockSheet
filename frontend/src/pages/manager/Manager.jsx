import { useEffect } from "react";
import { useState } from "react";
import { getOrders } from "../../services/order";
import '../../styles/pages/manager/manager.css';
import { useNavigate } from "react-router";

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
    const navigate = useNavigate();

    useEffect(() => {
        getOrders('active').then((orders) => {
            setOrders(orders.data);
        });
    }, []); 

    const handleNavigate = (id) => {
        navigate(`./order/${id}`);
    };

    return (
        <div id="orders"> 
            <div id="ordersDisplay">
                {orders.map((order) => <div onClick={() => handleNavigate(order.id)}><OrderComponent order={order}/></div>)}
            </div>
        </div>
    )
}

export default Manager;