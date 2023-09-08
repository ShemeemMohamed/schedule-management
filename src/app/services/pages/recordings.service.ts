import {Recording} from '@/models/recording';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class RecordingsService {
    constructor(private http: HttpClient) {}
    getRecording() {
        return this.http
            .get<any>('assets/recordings.json')
            .toPromise()
            .then((res) => <Recording[]>res.data)
            .then((data) => {
                return data;
            });
    }
}
