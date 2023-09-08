import {ScheduledMeeting} from '@/models/scheduledMeeting';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class ScheduledMeetingService {
    constructor(private http: HttpClient) {}
    getSceduledMeeting() {
        return this.http
            .get<any>('assets/scheduledMeeting.json')
            .toPromise()
            .then((res) => <ScheduledMeeting[]>res.data)
            .then((data) => {
                return data;
            });
    }
}
