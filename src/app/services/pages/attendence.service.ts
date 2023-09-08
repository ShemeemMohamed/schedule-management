import {Attendence} from '@/models/attendence';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class AttendenceService {
    constructor(private http: HttpClient) {}
    getAttendence() {
        return this.http
            .get<any>('assets/attendence.json')
            .toPromise()
            .then((res) => <Attendence[]>res.data)
            .then((data) => {
                return data;
            });
    }
}
