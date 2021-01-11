import { MessageAttachment } from 'discord.js';
import { Settings } from '../config/config.mjs';
import dataService from '../services/data-service.mjs';
import imageService from '../services/image-service.mjs';
import { COMMANDS } from '../config/config.mjs';


export default {
    async handleMessage(message){
        message = message.trim();
        const result = {};
        if(message.startsWith(Settings.prefix))
        {
            const content = message.substring(Settings.prefix.length).trim();
            if(content.startsWith(COMMANDS.SENDWEATHERDATA)){
                result.message = await dataService.sendWeatherData(content.substring(COMMANDS.SENDWEATHERDATA.length).trim().split(' '));
                console.log('result',result)
            }
            else if(content.startsWith(COMMANDS.GETMEASUREMENTS)){
                result.message = await dataService.getMeasurements();
            }
            else if(content.startsWith(COMMANDS.ADDMEASUREMENTPOINT)){
                result.message = await dataService.addMeasurementPoint(content.substring(COMMANDS.ADDMEASUREMENTPOINT.length).trim().split(' '));
            }
            else if(content.startsWith('show')){
                //TO-DO: fetch data
                // dataService.getWeatherData();
                const imageBuffer = await imageService.generateChart();
                result.attachment = new MessageAttachment(imageBuffer, 'chart.png');
                result.message = 'Displaying chart:';
            }
            else{
                result.message = 'Unknown command';
            }
        }
        return result;
    }
}