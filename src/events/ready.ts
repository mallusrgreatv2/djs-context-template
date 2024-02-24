import ClientEvent from "@/structures/event.js";

export default new ClientEvent({
  name: "ready",
  async run(c, client) {
    c.logger.info(`Logged in as ${client.user.tag}`);
  },
});
