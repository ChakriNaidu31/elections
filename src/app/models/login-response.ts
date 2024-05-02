export class LoginResponse {
    userToken: string;

    constructor(userToken: string) {
        this.userToken = userToken;
    }
}
