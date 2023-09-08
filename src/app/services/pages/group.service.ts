import {Group} from '@/models/group';
import {Master} from '@/models/master';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class GroupService {
    constructor(private http: HttpClient) {}

    getProducts() {
        return this.http
            .get<any>('assets/groups.json')
            .toPromise()
            .then((res) => <Group[]>res.data)
            .then((data) => {
                return data;
            });
    }

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
}
