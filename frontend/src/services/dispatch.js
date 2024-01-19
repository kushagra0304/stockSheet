import axios from 'axios';

let domain = window.location.hostname;

// process.env.NODE_ENV, create-react-app controls this variable.
if(process.env.NODE_ENV === 'development'){
    domain = `${domain}:3001`;
}


export const dispatch = async (dispatch) => {
    try {
        return axios.post(`http://${domain}/api/dispatch/upload`, dispatch, { responseType: 'arraybuffer' });
    } catch (error) {
        console.log(error);
        console.log("Error connecting to server")
    }
}