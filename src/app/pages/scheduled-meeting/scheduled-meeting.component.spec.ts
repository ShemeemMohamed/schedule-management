import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ScheduledMeetingComponent} from './scheduled-meeting.component';

describe('ScheduledMeetingComponent', () => {
    let component: ScheduledMeetingComponent;
    let fixture: ComponentFixture<ScheduledMeetingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ScheduledMeetingComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ScheduledMeetingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
