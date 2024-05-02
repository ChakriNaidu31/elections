import { Constituency } from "./constituency";
import { Region } from "./region";
import { Ward } from "./ward";

export class PollingStation {
    "_id": string;
    name: string;
    code: string;
    location: string;
    region: Region;
    constituency: Constituency;
    ward: Ward;

    constructor(_id: string, name: string, code: string, location: string, region: Region, constituency: Constituency, ward: Ward) {
        this._id = _id;
        this.name = name;
        this.code = code;
        this.location = location;
        this.region = region;
        this.constituency = constituency;
        this.ward = ward;
    }
}
