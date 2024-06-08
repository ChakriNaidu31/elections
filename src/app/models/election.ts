import { Constituency } from "./constituency";
import { Region } from "./region";

export class Election {
    "_id": string;
    unique: string;
    commissionName: string;
    commissionLogo: string;
    electionName: string;
    electionDate: Date;
    region: Region;
    constituency: Constituency;
    candidates: any[];
    isCurrent: boolean;

    constructor(_id: string, unique: string, commissionName: string, commissionLogo: string, electionName: string, electionDate: Date, region: Region, constituency: Constituency, candidates: any[], isCurrent: boolean) {
        this._id = _id;
        this.unique = unique;
        this.commissionName = commissionName;
        this.commissionLogo = commissionLogo;
        this.electionName = electionName;
        this.electionDate = electionDate;
        this.region = region;
        this.constituency = constituency;
        this.candidates = candidates;
        this.isCurrent = isCurrent;
    }
}
