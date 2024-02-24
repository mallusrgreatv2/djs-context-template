import { ClientEvents, SlashCommandBuilder } from "discord.js";
import { z } from "zod";
import Client from "./structures/client.js";
import { Context } from "@mallusrgreat/djs-context";
export const EnvTokenParser = z.string().min(60).includes(".");
export const CommandParser = z.object({
  data: z.custom<SlashCommandBuilder>(),
  run: z.function().args(
    z.object({
      client: z.custom<Client>(),
      context: z.custom<Context>(),
      args: z.array(z.string()).optional(),
    })
  ),
});
export const EventParser = z.object({
  name: z.custom<keyof ClientEvents>(),
  run: z.function().returns(z.any()),
});
