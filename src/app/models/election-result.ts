export class ElectionResult {
    candidate: any;
    votes: number;
    updatedDate: Date;

    constructor(candidate: any, votes: number, updatedDate: Date) {
        this.candidate = candidate;
        this.votes = votes;
        this.updatedDate = updatedDate;
    }
}
