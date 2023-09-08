import {TestBed} from '@angular/core/testing';

import {ScheduledMeetingService} from './scheduled-meeting.service';

describe('ScheduledMeetingService', () => {
    let service: ScheduledMeetingService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ScheduledMeetingService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
