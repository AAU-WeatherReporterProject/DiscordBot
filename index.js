'use strict'
const Discord = require('discord.js');
const client = new Discord.Client();
const config =  require('./config/config.json');
const dataService = require('./services/data-service')();
const imageService = require('./services/image-service')();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {
    const messageContent = message.content.toLocaleLowerCase().trim();
    if(messageContent.startsWith(config.prefix))
    {
        const content = message.content.substring(config.prefix.length).trim();
        if(content.startsWith('send')){
            dataService.sendWeatherData(content.substring(4).split(' '))
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