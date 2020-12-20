'use strict'
const Discord = require('discord.js');
const client = new Discord.Client();
const config =  require('./config/config.json');
const dataService = require('./services/data-service')();
const imageService = require('./services/image-service')();
const COMMANDS = {
    SENDWEATHERDATA: 'send',
    GETMEASUREMENTS: 'measurements',
    ADDMEASUREMENTPOINT: 'addMeasurement',
    SHOWDATA: 'show'
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {
    const messageContent = message.content.toLocaleLowerCase().trim();
    //TO-DO: Waiting for new API. No parsing necessary in future
    
    if(messageContent.startsWith(config.prefix))
    {
        const content = message.content.substring(config.prefix.length).trim();
        if(content.startsWith(COMMANDS.SENDWEATHERDATA)){
            const messageText = await dataService.sendWeatherData(content.substring(COMMANDS.SENDWEATHERDATA.length).trim().split(' '));
            message.reply(messageText);
        }
        else if(content.startsWith(COMMANDS.GETMEASUREMENTS)){
            const messageText = await dataService.getMeasurements();
            message.reply(messageText);
        }
        else if(content.startsWith(COMMANDS.ADDMEASUREMENTPOINT)){
            const messageText = await dataService.addMeasurementPoint(content.substring(COMMANDS.ADDMEASUREMENTPOINT.length).trim().split(' '));
            message.reply(messageText);
        }
        else if(content.startsWith('show')){
            //TO-DO: fetch data
            // dataService.getWeatherData();
            const imageBuffer = await imageService.generateChart();
            const attachment = new Discord.MessageAttachment(imageBuffer, 'chart.png');
            message.channel.send(`Displaying chart:`, attachment);
        }
    }
})

const token = process.env.TOKEN;
if(token){
    client.login(token);
}