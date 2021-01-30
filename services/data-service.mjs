import apiService from './api-service.mjs';

export default {
    async sendWeatherData(key, temperature, skyState, humidity, pressure){
        let message = '';
        temperature = +temperature;//.replace(',', '.');
        skyState = +skyState;
        if(isNaN(temperature)){
            message = 'Invalid temperature';
        }
        else if(isNaN(skyState) || skyState < 0 || skyState > 4){
            message = 'Invalid sky state';
        }
        else if(humidity !== undefined && (isNaN(+humidity) || (+humidity) < 0 || (+humidity) > 100)){
            message = 'Invalid humidity. A valid humidity is between 0 and 100';
        }
        else if( pressure !== undefined && (isNaN(+pressure) || (+pressure) < 800 || (+pressure) > 1100)){
            message = 'Invalid pressure. A valid pressure is between 800 and 1100'
        }
        else{
            try{
                await apiService.sendWeatherData({
                    metadata: {key},
                    measurements: [{temperature, skyState, humidity, pressure}]
                });
                message = 'Data sent';
            }
            catch(e){
                message = 'Error while sending data';
                console.error(e);
            }
        }
        return message;
    },

    async getMeasurements(){
        let message = '';
        try{
            const response = await apiService.getMeasurements();
            for(let measurement of response.data){
                message += `\n**location:** ${measurement.location}`;
            }
        }
        catch(e){
            message = 'Error while fetching measurements';
            console.error(e);
        }
        return message;
    },
    
    async addMeasurementPoint(location){
        let message;
        try{
            await apiService.addMeasurementPoint({location});
            message = 'Measurement sent';
        }
        catch(e){
            message = 'Error while sending measurementPoint';
            console.error(e);
        }
        return message;
    },

    async getWeatherData(type, key, from, to){
        type = +type;
        const result = {
            message: '',
            type
        };
        from = from?.replace('T', ' ');
        to = to?.replace('T', ' ');
        const dateRegex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/;
        if(isNaN(type) || type < 0 || type > 2){
            result.message = 'Please enter a valid type';
        }
        else if(!key){
            result.message = 'Please enter a valid key';
        }
        else if(from && !from.match(dateRegex)){
            result.message = 'Please enter a valid "from" date';
        }
        else if(to && !to.match(dateRegex)){
            result.message = 'Please enter a valid "to" date';
        }
        else if(from && to && new Date(from) < new Date(to)){
            result.message = 'Please enter a valid "to" date. "to" date must be greater than "from" date';
        }
        else{
            try{
                const { data } = await apiService.getWeatherData(key, from, to);
                if(data?.length > 0){
                    result.data = data;
                    result.key = key;
                    result.message = 'Displaying chart:';
                }
                else{
                    result.message = 'No data';
                }
            }
            catch(e){
                result.message = 'Error while fetching weather data';
                console.error(e);
            }
        }
        return result;
    }
}