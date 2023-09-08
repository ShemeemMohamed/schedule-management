import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MeetingSchedule} from '@/models/meeting-schedule';

@Injectable({
    providedIn: 'root'
})
export class MeetingScheduleService {
    constructor(private http: HttpClient) {}
}
