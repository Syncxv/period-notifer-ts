import {Client, Interaction} from 'discord.js'
export default  {
    name: "testy",
    description: "nigga boy",
    execute: async (client: Client, interaction: Interaction) => {
        if (!interaction.isCommand()) return;
        interaction.reply('hehe')
    }
}