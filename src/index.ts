import "dotenv/config";
import Handler from "./structures/handler.js";
import Client from "./structures/client.js";
import { CommandParser, EventParser } from "./parsers.js";
import { generateErrorMessage } from "zod-error";
import readline from "readline";
import deploy from "./scripts/deploy.js";
const client = new Client();
new Handler({
  client,
  rootDir: "commands",
  run: (cmd, dir) => {
    const parsed = CommandParser.safeParse(cmd);
    if (!parsed.success) {
      client.logger.error(
        `Issues detected in command ${dir}: ${generateErrorMessage(
          parsed.error.issues,
          {
            delimiter: {
              component: " | ",
            },
            path: {
              enabled: false,
            },
          }
        )}`
      );
      return;
    }
    client.commands.set(parsed.data.data.name, parsed.data);
    client.logger.info(`Registered command ${parsed.data.data.name} (${dir})`);
  },
});

new Handler({
  client,
  rootDir: "events",
  run: (cmd, dir) => {
    const parsed = EventParser.safeParse(cmd);
    if (!parsed.success) {
      client.logger.error(
        `Issues detected in event: ${generateErrorMessage(parsed.error.issues)}`
      );
      return;
    }
    client.on(parsed.data.name, (...args) => parsed.data.run(client, ...args));
    client.logger.info(`Registered event ${parsed.data.name} (${dir})`);
  },
});
client.init();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});
rl.on("line", (line) => {
  switch (line) {
    case "help":
    case "?":
      console.log("> Commands");
      console.log("----------");
      console.log("> deploy: Deploy commands to Discord");
      break;
    case "deploy":
      console.log("> Deploying commands...");
      deploy(client);
      break;
  }
});
