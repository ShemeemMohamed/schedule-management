import {AttendenceList} from '@/models/attendenceList';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class AttendenceViewService {
    constructor(private http: HttpClient) {}
    getAttendence() {
        return this.http
            .get<any>('assets/attendence-list.json')
            .toPromise()
            .then((res) => <AttendenceList[]>res.data)
            .then((data) => {
                return data;
            });
    }
}
