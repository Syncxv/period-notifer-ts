export interface command {
    name: string,
    alias?: string,
    usage?: string, 
    description: string,
    execute: Function
}