import axios from 'axios';

export const getStock = async () => {
    try {
        return await axios.get('http://192.168.17.220:3001/api/stock');
    } catch (error) {
        console.log(error);
        console.log("Error connecting to server")
    }
}