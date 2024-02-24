import Client from "@/structures/client.js";
export default function deploy(client: Client) {
  client.application?.commands.set(client.commands.map((v) => v.data.toJSON()));
  client.logger.info("Deployed commands to Discord");
}
