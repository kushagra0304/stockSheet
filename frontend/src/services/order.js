import axios from 'axios';

let domain = window.location.hostname;

// process.env.NODE_ENV, create-react-app controls this variable.
if(process.env.NODE_ENV === 'development'){
    domain = `${domain}:3001`;
}

export const createOrder = async (order) => {
    try {
        return await axios.post(`http://${domain}/api/order`, order);
    } catch (error) {
        console.log(error);
        console.log("Error connecting to server")
    }
}

export const getOrders = async (orderType) => {
    try {
        return await axios.get(`http://${domain}/api/order/${orderType}`);
    } catch (error) {
        console.log(error);
        console.log("Error connecting to server")
    }
}

export const deleteOrder = async (orderId) => {
    try {
        return await axios.delete(`http://${domain}/api/order/${orderId}`);
    } catch (error) {
        console.log(error);
        console.log("Error connecting to server")
    }
}