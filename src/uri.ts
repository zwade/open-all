export default class URI {
    public scheme: string;
    public host: string;
    public path: string;

    public user?: string;
    public pass?: string;
    public port?: string;
    public hash?: string;
    public query?: string;

    constructor(url: string) {
        let schemeIndex = url.indexOf("://");
        if (schemeIndex < 0) {
            throw new Error("URL must have a scheme");
        }

        this.scheme = url.slice(0, schemeIndex)
        let remainder = url.slice(schemeIndex + 3);

        let pathIndex = remainder.split("").findIndex((v) => v === "/" || v === "#" || v === "?");

        if (pathIndex < 0) {
            pathIndex = remainder.length;
        }

        let prePath = remainder.slice(0, pathIndex);
        let postPath = remainder.slice(pathIndex);

        let [auth, domain] = prePath.split("@");
        if (domain === undefined) {
            domain = auth;
        } else {
            [this.user, this.pass] = auth.split(":");
        }

        let portIndex = domain.indexOf(":");
        if (portIndex >= 0) {
            this.host = domain.slice(0, portIndex);
            this.port = domain.slice(portIndex + 1);
        } else {
            this.host = domain;
        }

        let hashIndex = postPath.indexOf("#");
        let searchIndex = postPath.indexOf("?");

        if (hashIndex >= 0) {
            this.path = postPath.slice(0, hashIndex);

            if (searchIndex >= 0) {
                this.hash = postPath.slice(hashIndex + 1, searchIndex);
            } else {
                this.hash = postPath.slice(hashIndex + 1);
            }
        } else {
            if (searchIndex >= 0) {
                this.path = postPath.slice(0, searchIndex);
            } else {
                this.path = postPath;
            }
        }

        if (this.path === "") {
            this.path = "/";
        }

        if (searchIndex >= 0) {
            this.query = postPath.slice(searchIndex + 1);
        }
    }

    public render() {
        let output = [ this.scheme, "://"];
        if (this.user) {
            output.push(this.user);
            if (this.pass) {
                output.push(":" + this.pass);
            }
            output.push("@");
        }
        output.push(this.host);
        if (this.port) {
            output.push(":" + this.port);
        }
        output.push(this.path);
        if (this.hash) {
            output.push("#" + this.hash);
        }
        if (this.query) {
            output.push("?" + this.query);
        }

        return output.join("");
    }
}