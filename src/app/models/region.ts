export class Region {
    "_id": string;
    name: string;
    code: string;

    constructor(_id: string, name: string, code: string) {
        this._id = _id;
        this.name = name;
        this.code = code;
    }
}
