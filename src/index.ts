import {Collection, Client, GuildApplicationCommandManager, Intents, Message} from 'discord.js'
import * as slashCommands from './slash-commands'
import config from '../config.json'
import { guid } from './constants';
import { command } from './types';
const client: Client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] });
const commandsCollection = new Map();
const aliasesCollection = new Collection();
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
	})
	Object.values(slashCommands).forEach(cmd => {
		commands?.create(cmd)
		commandsCollection.set(cmd.name, cmd)
		// if (cmd.aliases) {
        //     for (const alias of command.aliases) {
        //       client.aliases.set(alias, command.name);
        //     }
        // }
	})
})

client.on('messageCreate', (message: Message) => {
    if(message.content === "ping") {
        message.channel.send("NICE")
    }
})
client.on('interactionCreate', async interaction => {
    console.log(interaction)
	if (!interaction.isCommand()) return;
	if(!commandsCollection.has(interaction.commandName)) return
	const cmd: command = commandsCollection.get(interaction.commandName)
	try {
		cmd.execute(client, interaction)
	} catch(e) {
		console.error(e)
	}
});
client.login(config.token);