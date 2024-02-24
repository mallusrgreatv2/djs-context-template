import ClientEvent from "@/structures/event.js";
import { Context } from "@mallusrgreat/djs-context";

export default new ClientEvent({
  name: "interactionCreate",
  async run(client, interaction) {
    if (!interaction.isChatInputCommand()) return;
    const command = client.commands.find(
      (v) => v.data.name === interaction.commandName
    );
    if (!command) return;
    const context = new Context(interaction);
    command.run({
      client,
      context,
    });
  },
});
