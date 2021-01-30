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
            if(content.startsWith(COMMANDS.SENDWEATHERDATA.value)){
                result.message = await dataService.sendWeatherData(...getCommands(content, COMMANDS.SENDWEATHERDATA.value));
            }
            else if(content.startsWith(COMMANDS.GETMEASUREMENTS.value)){
                result.message = await dataService.getMeasurements();
            }
            else if(content.startsWith(COMMANDS.ADDMEASUREMENTPOINT.value)){
                result.message = await dataService.addMeasurementPoint(...getCommands(content, COMMANDS.ADDMEASUREMENTPOINT.value));
            }
            else if(content.startsWith(COMMANDS.LIST.value)){
                result.message = '';
                for(const key in COMMANDS){
                    result.message += `\n${Settings.prefix}${COMMANDS[key].value} ${COMMANDS[key].params.length !== 0 ? `*${COMMANDS[key].params.join('* *')}*` :''}`;
                }
            }
            else if(content.startsWith(COMMANDS.SHOWDATA.value)){
                const {data, message, type} = await dataService.getWeatherData(...getCommands(content, COMMANDS.SHOWDATA.value));
                result.message = message;
                
                if(data){
                    const imageData = await imageService.generateChart(data, type);
                    result.attachment = new MessageAttachment(imageData.image, 'chart.png');
                    result.message = imageData.message;
                }
            }
            else{
                result.message = 'Unknown command';
            }
        }
        return result;
    }
}

function getCommands(content, command){
    return content.substring(command.length).trim().split(' ');
}