import {ScheduledMeeting} from '@/models/scheduledMeeting';
import {User} from '@/models/user';
import {Component} from '@angular/core';
import {ScheduledMeetingService} from '@services/pages/scheduled-meeting.service';
import {SessionService} from '@services/session.service';
import {ConfirmationService, MessageService} from 'primeng/api';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
    user: User;
    checked: boolean;
    dataChart: any;
    meetings: ScheduledMeeting[];
    meeting: ScheduledMeeting;
    constructor(
        public session: SessionService,
        private scheduledMeetingService: ScheduledMeetingService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) {
        this.user = this.session.getUserData();
        this.checked = false;
        this.dataChart = {
            labels: ['A', 'B', 'C'],
            datasets: [
                {
                    data: [300, 50, 100],
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                    hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
                }
            ]
        };

        this.scheduledMeetingService
            .getSceduledMeeting()
            .then((data) => (this.meetings = data));
    }

    joinMeeting(meeting: ScheduledMeeting) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to join' + meeting.name + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.meetings = this.meetings.filter(
                    (val) => val.code !== meeting.code
                );
                this.meeting = {};
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Successfully entered',
                    life: 3000
                });
            }
        });
    }
}
