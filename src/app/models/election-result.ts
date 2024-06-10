export class ElectionResult {
    candidate: any;
    votes: number;

    constructor(candidate: any, votes: number) {
        this.candidate = candidate;
        this.votes = votes;
    }
}
