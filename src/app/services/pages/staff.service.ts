import {Staff} from '@/models/staff';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class StaffService {
    constructor(private http: HttpClient) {}

    getStaffs() {
        return this.http
            .get<any>('assets/staff.json')
            .toPromise()
            .then((res) => <Staff[]>res.data)
            .then((data) => {
                return data;
            });
    }
}
