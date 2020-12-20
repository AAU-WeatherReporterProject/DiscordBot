const apiService = require("./api-service")();

module.exports = () =>{
    const service = {
        sendWeatherData:sendWeatherData,
        getMeasurements: getMeasurements,
        addMeasurementPoint: addMeasurementPoint
    };
    return service;

    async function sendWeatherData([key, temperature, skyState]){
        let messageText;
        temperature = +temperature;//.replace(',', '.');
        skyState = +skyState;
        if(isNaN(temperature)){
            message = 'invalid temperature';
        }
        else if(isNaN(skyState) || skyState < 0 || skyState > 4){
            message = 'invalid sky state';
        }
        else{
            try{
                await apiService.sendWeatherData({
                    metadata: {key},
                    measurements: [{temperature, skyState}]
                });
                messageText = 'Data send';
            }
            catch(e){
                messageText = 'Error while sending data';
                console.error(e);
            }
        }
        return messageText;
    }

    async function getMeasurements(){
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
    }

    async function addMeasurementPoint([name, location]){
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