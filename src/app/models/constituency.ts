import { Region } from "./region";

export class Constituency {
    "_id": string;
    name: string;
    code: string;
    region: Region;

    constructor(_id: string, name: string, code: string, region: Region) {
        this._id = _id;
        this.name = name;
        this.code = code;
        this.region = region;
    }
}
