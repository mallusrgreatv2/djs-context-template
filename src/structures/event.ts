import { ClientEvents } from "discord.js";
import Client from "./client.js";
interface IEvent<K extends keyof ClientEvents> {
  name: K;
  run: (client: Client, ...args: ClientEvents[K]) => unknown;
}
export default class ClientEvent<K extends keyof ClientEvents> {
  name: K;
  run: (client: Client, ...rest: ClientEvents[K]) => unknown;
  constructor(options: IEvent<K>) {
    this.name = options.name;
    this.run = options.run;
  }
}
