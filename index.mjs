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
        const characterLimit = 2000 - (message.author.id.length + 3);
        let replied = false;
        while(response.message.length >= characterLimit){
            for(let i = characterLimit-1; i >= 0; --i){
                if(response.message[i] === '\n'){
                    sendMessage(response.message.substring(0,i))
                    response.message = response.message.substring(i+1);
                    break;
                }
            }
        }
        sendMessage(response.message);

        function sendMessage(content){
            if(replied){
                message.channel.send(content)
            }
            else{
                replied = true;
                message.reply(content);
            }
        }
    }
})


if(token){
    client.login(token);
}