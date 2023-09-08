import {Group} from '@/models/group';
import {Master} from '@/models/master';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class MasterService {
    constructor(private http: HttpClient) {}

    getClasses() {
        return this.http
            .get<any>('assets/masters.json')
            .toPromise()
            .then((res) => <Master[]>res.data)
            .then((data) => {
                return data.filter((x) => x.type == 1);
            });
    }
    getDivisions() {
        return this.http
            .get<any>('assets/masters.json')
            .toPromise()
            .then((res) => <Master[]>res.data)
            .then((data) => {
                return data.filter((x) => x.type == 2);
            });
    }
    getDepartments() {
        return this.http
            .get<any>('assets/masters.json')
            .toPromise()
            .then((res) => <Master[]>res.data)
            .then((data) => {
                return data.filter((x) => x.type == 3);
            });
    }
    getSemesters() {
        return this.http
            .get<any>('assets/masters.json')
            .toPromise()
            .then((res) => <Master[]>res.data)
            .then((data) => {
                return data.filter((x) => x.type == 4);
            });
    }
}
