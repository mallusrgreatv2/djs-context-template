import Client from "./client.js";
import listdir from "../functions/listdir.js";
import { getDefault } from "../functions/getDefault.js";
export default class Handler {
  rootDir: string;
  client: Client;
  constructor(options: {
    client: Client;
    rootDir: string;
    run: (defaultReturn: unknown, fileName?: string) => unknown;
    then?: () => unknown;
  }) {
    this.rootDir = options.rootDir;
    this.client = options.client;
    const files = listdir(this.rootDir);
    const defs: any[] = [];
    files.forEach(async (file) => {
      const def = await getDefault(file);
      defs.push(def);
      try {
        await options.run(
          def,
          `${(
            file.substring(
              0,
              file.lastIndexOf(".") < 0 ? file.length : file.lastIndexOf(".")
            ) + ".ts"
          ).replace(/dist/, "src")}`
        );
      } catch (err) {
        this.client.logger.error(
          `Issue when loading handler at file ${
            file.substring(
              0,
              file.lastIndexOf(".") < 0 ? file.length : file.lastIndexOf(".")
            ) + ".ts"
          }`,
          err
        );
      }
    });
    if (options.then) options.then();
  }
}
