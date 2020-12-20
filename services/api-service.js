const axios = require("axios");
const options = {
    headers:{
        'Content-Type': 'application/json'
    }
};

module.exports = (endpoint) =>{
    const service = {
        sendWeatherData:sendWeatherData
    };
    return service;

    function sendWeatherData(data){
        return axios.post(`${endpoint}/weather`,{data}, options);
    }
}