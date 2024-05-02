import { Constituency } from "./constituency";
import { Region } from "./region";

export class Ward {

    "_id": string;
    name: string;
    code: string;
    location: string;
    region: Region;
    constituency: Constituency;

    constructor(_id: string, name: string, code: string, location: string, region: Region, constituency: Constituency) {
        this._id = _id;
        this.name = name;
        this.code = code;
        this.location = location;
        this.region = region;
        this.constituency = constituency;
    }
}
