import {
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from "discord.js";
import Client from "./client.js";
import { Context } from "@mallusrgreat/djs-context";
interface ICommand {
  data:
    | SlashCommandBuilder
    | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">
    | SlashCommandSubcommandsOnlyBuilder;
  run: (options: {
    client: Client;
    context: Context;
    args?: string[];
  }) => unknown;
}
export default class Command implements ICommand {
  data:
    | SlashCommandBuilder
    | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">
    | SlashCommandSubcommandsOnlyBuilder;
  run: (options: {
    client: Client;
    context: Context;
    args?: string[];
  }) => unknown;
  constructor(options: ICommand) {
    this.data = options.data;
    this.run = options.run;
  }
}
