const apiService = require("./api-service");

module.exports = () =>{
    const service = {
        sendWeatherData:sendWeatherData
    };
    return service;

    function sendWeatherData([temperature, geo1, geo2]){
        let messageText;
        try{
            await apiService.sendWeatherData({temperature, geo1, geo2});
            messageText = 'data send';
        }
        catch{
            messageText = 'error while sending data';
        }
        return messageText;
    }
}