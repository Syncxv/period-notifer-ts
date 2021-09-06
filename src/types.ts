import {ApplicationCommandData, ApplicationCommandOptionData} from 'discord.js/typings'
import {Client} from 'discord.js'
export type command = ApplicationCommandData & {
    name: string,
    description: string,
    alias?: string,
    usage?: string, 
    execute: Function,
    options?: ApplicationCommandOptionData[]
}
export interface commandClass {
    command: command
    execute: Function
}

export class niggaclient extends Client {
	public commandsCollection: Map<any, any>
	public aliasesCollection: Map<any, any>
}

// export interface command {
    
// }