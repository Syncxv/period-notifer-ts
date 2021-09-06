import {Client, Intents, Message} from 'discord.js'
import config from '../config.json'
const client: Client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] });

client.on('ready', () => {
    console.log("READY " + client.user?.username,)
})

client.on('messageCreate', (message: Message) => {
    if(message.content === "ping") {
        message.channel.send("NICE")
    }
})

client.login(config.token);