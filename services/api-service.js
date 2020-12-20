const AXIOS = require('axios');
const { withVersioning, VersioningStrategy } = require('axios-api-versioning');

const baseClient = AXIOS.create({
    baseURL: `${process.env.ENDPOINT}/api/v{apiVersion}`
});

const axios = withVersioning(baseClient, {
    apiVersion: '1',
    versioningStrategy: VersioningStrategy.UrlPath
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