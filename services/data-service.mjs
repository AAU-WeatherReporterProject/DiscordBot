import apiService from './api-service.mjs';

export default {
    async sendWeatherData(key, temperature, skyState){
        let message = '';
        temperature = +temperature;//.replace(',', '.');
        skyState = +skyState;
        if(isNaN(temperature)){
            message = 'Invalid temperature';
        }
        else if(isNaN(skyState) || skyState < 0 || skyState > 4){
            message = 'Invalid sky state';
        }
        else{
            try{
                await apiService.sendWeatherData({
                    metadata: {key},
                    measurements: [{temperature, skyState}]
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

    async getWeatherData(key, from, to){
        const result = {
            message: ''
        };
        from = from?.replace('_', ' ');
        to = to?.replace('_', ' ');
        const dateRegex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/;
        if(!key){
            result.message = 'Please enter a valid key';
        }
        else if(from && !from.match(dateRegex)){
            result.message = 'Please enter a valid "from" date';
        }
        else if(to && !to.match(dateRegex)){
            result.message = 'Please enter a valid "to" date';
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