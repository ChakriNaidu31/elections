import { PollingStation } from "./polling-station";

export class User {
    userId: string;
    firstName: string;
    lastName: string;
    role: string;
    email: string;
    station: PollingStation;
    isLoggedIn: boolean;
    lastLoggedIn: Date;
    isActive: boolean;

    constructor(userId: string, firstName: string, lastName: string, role: string, email: string, station: PollingStation, isLoggedIn: boolean, lastLoggedIn: Date, isActive: boolean) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.email = email;
        this.station = station;
        this.isLoggedIn = isLoggedIn;
        this.lastLoggedIn = lastLoggedIn;
        this.isActive = isActive;
    }

}
