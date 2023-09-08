import {User} from '@/models/user';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SessionService {
    private userKey = '$userData';
    user: User;
    constructor() {}
    setUserData(data: any) {
        localStorage.setItem(this.userKey, JSON.stringify(data));
    }
    getUserData(): User {
        let obj: User = JSON.parse(localStorage.getItem(this.userKey));
        return obj;
    }
    removeUserData() {
        localStorage.removeItem('token');
        localStorage.removeItem(this.userKey);
    }
}
