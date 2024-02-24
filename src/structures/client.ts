import {
  Client as BaseClient,
  Collection,
  DiscordjsError,
  DiscordjsErrorCodes,
  GatewayIntentBits,
} from "discord.js";
import "dotenv/config";

import ClientConfig from "@/interfaces/ClientConfig.js";
import Command from "@/structures/command.js";
import Logger from "./logger.js";

export default class Client extends BaseClient {
  readonly config: ClientConfig = process.env as unknown as ClientConfig;
  readonly commands: Collection<string, Command> = new Collection();
  readonly logger = new Logger();
  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });
  }
  async init() {
    try {
      await this.login(this.config.TOKEN);
    } catch (err) {
      let error = err as unknown as DiscordjsError;
      if (
        [
          DiscordjsErrorCodes.TokenInvalid,
          DiscordjsErrorCodes.TokenMissing,
        ].includes(error.code)
      ) {
        this.logger.error(
          "Please create a .env file, copy the contents of .env.example to the .env file, and then fill out the token properly."
        );
        this.logger.error(
          "If you already filled it out, the token is invalid!"
        );

        return;
      } else if (
        [DiscordjsErrorCodes.ClientMissingIntents].includes(error.code)
      ) {
        this.logger.error(
          "It seems you have enabled intents that are disabled in the developer portal. Either remove them from src/Structures/Client.ts:45:16 or enable them from the developer portal."
        );
        this.logger.error(
          "If you already filled it out, the token is invalid!"
        );
        return;
      }
      this.logger.error(error);
      console.log(error);
    }
  }
}
