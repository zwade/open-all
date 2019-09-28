import fetch from "node-fetch";
import * as fs from "fs-extra";
import ftp from "ftp";

import URI from "./uri";

export type Options = {
    disableHTTP?: true;
    disableBase64?: true;
    disableFile?: true;
}

export default async function open(uri: URI, options: Options = { }): Promise<Buffer> {
    switch (uri.scheme.toUpperCase()) {
        case "FILE": {
            if (options.disableFile) {
                throw new Error("[file] urls are not allowed");
            }
            let file = uri.host + uri.path;
            return fs.readFile(file);
        }
        case "BASE64": {
            if (options.disableBase64) {
                throw new Error("[base64] urls are not allowed");
            }
            let data = uri.host;
            return Buffer.from(data, "base64");
        }
        default: {
            if (options.disableHTTP) {
                throw new Error("[https?] urls are not allowed");
            }
            let result = await fetch(uri.render());
            return result.buffer();
        }
    }
}