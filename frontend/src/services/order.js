import axios from 'axios';

export const createOrder = async (order) => {
    try {
        return await axios.post(`/api/order`, order);
    } catch (error) {
        console.log(error);
        console.log("Error connecting to server")
    }
}

export const getOrders = async (orderType) => {
    try {
        return await axios.get(`/api/order/${orderType}`);
    } catch (error) {
        console.log(error);
        console.log("Error connecting to server")
    }
}

export const getOrder = async (orderId) => {
    try {
        return await axios.get(`/api/order/single/${orderId}`);
    } catch (error) {
        console.log(error);
        console.log("Error connecting to server")
    }
}

export const addReelToOrder = async (data) => {
    try {
        return await axios.post(`/api/order/addReel`, data);
    } catch (error) {
        console.log(error);
        console.log("Error connecting to server")
    }
}

export const deleteOrder = async (orderId) => {
    try {
        return await axios.delete(`/api/order/${orderId}`);
    } catch (error) {
        console.log(error);
        console.log("Error connecting to server")
    }
}