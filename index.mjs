import { Client} from 'discord.js';
import MessageService from './services/message-service.mjs';
const token = process.env.TOKEN;
const client = new Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async(message) => {
    const response = await MessageService.handleMessage(message.content);
    if(response.attachment){
        message.channel.send(response.message, response.attachment);
    }
    else if(response.message){
        message.reply(response.message);
    }
})


if(token){
    client.login(token);
}