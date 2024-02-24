import Command from "@/structures/command.js";
import { SlashCommandBuilder } from "discord.js";

export default new Command({
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Say something")
    .addStringOption((text) =>
      text.setName("text").setDescription("The text to say").setRequired(true)
    ),
  async run({ context, args }) {
    const text = args?.join(" ") || context.options?.getString("text");
    if (!text)
      return await context.reply({
        ephemeral: true,
        content: "Specify the text to say!",
      });
    await context.reply({
      content: `**${context.author.tag}** says: ${text}`,
      allowedMentions: {
        parse: [],
      },
    });
  },
});
