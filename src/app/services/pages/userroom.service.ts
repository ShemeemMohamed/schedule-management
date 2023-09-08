import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {UserRoom} from '../../models/user-room';

@Injectable({
    providedIn: 'root'
})
export class UserRoomService {
    constructor(private http: HttpClient) {}

    getUserRooms() {
        return this.http
            .get<any>('assets/userrooms.json')
            .toPromise()
            .then((res) => <UserRoom[]>res.data)
            .then((data) => {
                return data;
            });
    }
}
