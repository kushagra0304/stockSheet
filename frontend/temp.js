const axios = require("axios");

axios.get("http://localhost:3001/api/company/getAll").then((res) => {
    console.log(res);
}).catch((err) => {
    console.log(err);
})