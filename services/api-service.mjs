
import Axios from 'axios';
import { withVersioning, VersioningStrategy } from 'axios-api-versioning';

const baseClient = Axios.create({
    baseURL: `${process.env.ENDPOINT || 'http://localhost:8098'}/api/v{apiVersion}`
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

export default {
    sendWeatherData(data){
        return axios.post(`/ingest`,data, options);
    },

    getMeasurements(){
        return axios.get(`/measurementPoints`);
    },

    addMeasurementPoint(data){
        return axios.post(`/measurementPoint`, data, options);
    }
}