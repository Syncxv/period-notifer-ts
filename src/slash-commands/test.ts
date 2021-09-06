import {Client, Interaction} from 'discord.js'
import { command } from '../types';
const dude: command ={
    name: "testy",
    description: "nigga boy",
    execute: async (client: Client, interaction: Interaction) => {
        if (!interaction.isCommand()) return;
        interaction.reply('hehe')
    }
}
export default dude