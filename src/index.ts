import {Collection, Client, GuildApplicationCommandManager, Intents, Message} from 'discord.js'
import * as slashCommands from './slash-commands'
import config from '../config.json'
import { guid } from './constants';
import { command, commandClass } from './types';


class niggaclint extends Client {
	public commandsCollection: Map<any, any>
	public aliasesCollection: Map<any, any>
}

const client = new niggaclint({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] });
declare global {
    var foo: string;
	var client: niggaclint
}
global.foo = "hehe"
global.client = client
client.commandsCollection = new Map();
client.aliasesCollection = new Map();
client.on('ready', () => {
    console.log("READY " + client.user?.username,)
	let commands: GuildApplicationCommandManager | null
	const guild = client.guilds.cache.get(guid)
	if(!guild) {
		throw new Error("AYE guild doesnt exist :|")
	}
	commands = guild.commands
	commands?.create({
		name: "hehe",
		description: "woah",
		options: [
			{
				name:"hehe",
				description: "omoshiroi",
				type: "STRING",
				required: true,
				choices: [
					{
						name: "welp",
						value: "hehe"
					}
				]
			}
		]
	})
	console.log(slashCommands)
	Object.values(slashCommands).forEach(cmd => {
		commands?.create(cmd)
		client.commandsCollection.set(cmd.name, cmd)
		// if (cmd.aliases) {
        //     for (const alias of command.aliases) {
        //       client.aliases.set(alias, command.name);
        //     }
        // }
	})
	// console.log(commandsCollection)
	// Object.values(slashCommands).map(item => ({name: item.name, description: item.description, value: item.name}))
	// console.log(require('./slash-commands/help'))
})

client.on('messageCreate', (message: Message) => {
    if(message.content === "ping") {
        message.channel.send("NICE")
    }
})
client.on('interactionCreate', async interaction => {
    // console.log(interaction)
	if (!interaction.isCommand()) return;
	if(!client.commandsCollection.has(interaction.commandName)) return
	const cmd: command = client.commandsCollection.get(interaction.commandName)
	try {
		cmd.execute(client, interaction)
	} catch(e) {
		console.error(e)
	}
});
client.login(config.token);