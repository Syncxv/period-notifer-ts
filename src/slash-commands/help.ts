import { Client, Interaction} from 'discord.js'
import slashCommands from '../utils/getCommands';
import { command} from '../types';
const help: command = {
    name: "help",
    description: "stuff nigga",
    options: [
        {
            name: "command",
            description: "which command nobba",
            type: "STRING",
        }
    ],
    execute: async (client: Client, interaction: Interaction) => {
        if (!interaction.isCommand()) return;
        if(interaction.options.get('command')) {
            const cofthemand = interaction.options.get('command')?.value
            if(!cofthemand) {
                console.log("welp there is no vlaue")
                return
            }
            console.log(slashCommands, cofthemand, interaction.options)
            const command = Object.values(slashCommands).find(c => [c.name].includes(cofthemand.toString()))
            console.log(command)
            if(!command) {
                interaction.reply("command does not exsit beach")
                return
            }
            interaction.reply(`\`${command.name}\``)
            return
        }
        interaction.reply({embeds: [{
            title: "Help Gang",
            description: `${Object.values(slashCommands).map((_command) => `\`${_command.name}\`\n\n${_command.description}`).join('\n')}`
        }]})
    }
}
export default help