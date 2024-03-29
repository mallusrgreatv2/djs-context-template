import ClientEvent from "@/structures/event.js";
import { Context } from "@mallusrgreat/djs-context";
export default new ClientEvent({
  name: "messageCreate",
  async run(client, message) {
    if (!message.content.startsWith(client.config.PREFIX)) return;
    const args = message.content.trim().split(/ +/g);
    const cmdName = args
      .shift()
      ?.toLowerCase()
      .substring(client.config.PREFIX.length);
    console.log(cmdName);
    const command = client.commands.find((v) => v.data.name === cmdName);
    if (!command) return;
    const context = new Context(message);
    command.run({
      client,
      context,
      args,
    });
  },
});
