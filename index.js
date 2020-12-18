'use strict'
const Discord = require('discord.js');
const client = new Discord.Client();
const config =  require('./config/config.json');
const apiService = require('./services/api-service')(process.env.ENDPOINT);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
    const messageContent = message.content.toLocaleLowerCase().trim();

    if(messageContent.startsWith(config.prefix))
    {
        const content = message.content.substring(config.prefix.length).trim();
        if(content.startsWith('send')){
            const [temperature, geo1, geo2] = content.substring(4).split(' ');
            // apiService.sendWeatherData({temperature, geo1, geo2});
            message.reply('data sent');
        }
        else if(content.startsWith('show')){
            //fetch data
            //generate image
            //upload/reply image
        }
    }
})

const token = process.env.TOKEN;
if(token){
    client.login(token);
}