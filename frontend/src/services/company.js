import axios from 'axios';

export const getAllCompanies = async () => {
    try {
        return await axios.get(`/api/company/getAll`);
    } catch (error) {
        console.log(error);
        console.log("Error connecting to server")
    }
}