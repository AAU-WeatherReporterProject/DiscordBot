import apiService from './api-service.mjs';

export default {
    async sendWeatherData([key, temperature, skyState]){
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
                message = 'Data send';
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
                message += `\n**name:** ${measurement.name}; **location:** ${measurement.location}; **key:** ${measurement.measurementKey}`;
            }
        }
        catch(e){
            message = 'Error while fetching measurements';
            console.error(e);
        }
        return message;
    },
    
    async addMeasurementPoint([name, location]){
        let message;
        try{
            await apiService.addMeasurementPoint({name, location});
            message = 'Measurement sent';
        }
        catch(e){
            message = 'Error while sending measurementPoint';
            console.error(e);
        }
        return message;
    }
}