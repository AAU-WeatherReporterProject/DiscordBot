const AXIOS = require('axios');
const axios = AXIOS.create({
  baseURL: `${process.env.ENDPOINT}/api/v1`
});
const options = {
    headers:{
        'Content-Type': 'application/json'
    }
};

module.exports = () =>{
    const service = {
        sendWeatherData: sendWeatherData,
        getMeasurements: getMeasurements,
        addMeasurementPoint: addMeasurementPoint
    };
    return service;

    function sendWeatherData(data){
        return axios.post(`/ingest`,data, options);
    }

    function getMeasurements(){
        return axios.get(`/measurementPoints`);
    }

    function addMeasurementPoint(data){
        return axios.post(`/measurementPoint`, data, options);
    }
}