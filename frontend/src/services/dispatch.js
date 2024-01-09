import axios from 'axios';

export const dispatch = async (dispatch) => {
    try {
        return axios.post('http://192.168.17.220::3001/api/dispatch/upload', dispatch, { responseType: 'arraybuffer' });
    } catch (error) {
        console.log(error);
        console.log("Error connecting to server")
    }
}