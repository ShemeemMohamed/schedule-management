import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {StudentPromote} from '../../models/student-promote';

@Injectable({
    providedIn: 'root'
})
export class StudentPromoteService {
    constructor(private http: HttpClient) {}

    getPromotedStudents() {
        return this.http
            .get<any>('assets/schedulesApproval.json')
            .toPromise()
            .then((res) => <StudentPromote[]>res.data)
            .then((data) => {
                return data;
            });
    }
}
