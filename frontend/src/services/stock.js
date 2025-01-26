import axios from 'axios';

export const getStock = async () => {
    try {
        return await axios.get(`/api/stock`);
    } catch (error) {
        console.log(error);
        console.log("Error connecting to server")
    }
}

export const getStockAsReelGroup = async () => {
    try {
        return await axios.get(`/api/stock/reelGroup`);
    } catch (error) {
        console.log(error);
        console.log("Error connecting to server")
    }
}