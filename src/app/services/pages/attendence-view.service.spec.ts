import {TestBed} from '@angular/core/testing';

import {AttendenceViewService} from './attendence-view.service';

describe('AttendenceViewService', () => {
    let service: AttendenceViewService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AttendenceViewService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
