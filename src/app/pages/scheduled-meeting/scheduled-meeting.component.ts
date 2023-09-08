import {ScheduledMeeting} from '@/models/scheduledMeeting';
import {Search} from '@/models/search';
import {Component, OnInit} from '@angular/core';
import {ScheduledMeetingService} from '@services/pages/scheduled-meeting.service';
import {MessageService, ConfirmationService} from 'primeng/api';

@Component({
    selector: 'app-scheduled-meeting',
    templateUrl: './scheduled-meeting.component.html',
    styleUrls: ['./scheduled-meeting.component.scss']
})
export class ScheduledMeetingComponent implements OnInit {
    meetingDialog: boolean;
    meetingSaveDialog: boolean;
    meetings: ScheduledMeeting[];
    meeting: ScheduledMeeting;
    selectedMeeting: ScheduledMeeting[];
    submitted: boolean;
    cols: any[];

    rangeDates: Date[];
    searchData: Search[];
    selectedSerachValue: string;
    constructor(
        private scheduledMeetingService: ScheduledMeetingService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {
        this.searchData = [
            {text: 'Active', value: 'active'},
            {text: 'Cancelled', value: 'cancelled'}
        ];
    }

    ngOnInit() {
        this.cols = [
            {field: 'code', header: 'Meeting Code'},
            {field: 'name', header: 'Meeting Name'},
            {field: 'scheduledBy', header: 'Scheduled By'},
            {field: 'scheduledOn', header: 'Scheduled On'}
        ];
        this.scheduledMeetingService
            .getSceduledMeeting()
            .then((data) => (this.meetings = data));
    }

    openNew() {
        this.meeting = {};
        this.submitted = false;
        this.meetingSaveDialog = true;
    }

    deleteSelectedMeeting() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected products?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.meetings = this.meetings.filter(
                    (val) => !this.selectedMeeting.includes(val)
                );
                this.selectedMeeting = null;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Products Deleted',
                    life: 3000
                });
            }
        });
    }

    upload(meeting: ScheduledMeeting) {
        this.meeting = {...meeting};
        this.meetingDialog = true;
    }

    deleteMeeting(meeting: ScheduledMeeting) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to cancel ' + meeting.name + '?',
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
                    detail: 'Meeting Canceled',
                    life: 3000
                });
            }
        });
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

    hideDialog() {
        this.meetingDialog = false;
        this.submitted = false;
    }

    saveMeeting() {
        this.submitted = true;
        debugger;
        if (this.meeting.name.trim()) {
            if (this.meeting.code) {
                this.meetings[
                    this.findIndexById(this.meeting.code.toString())
                ] = this.meeting;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'metting Updated',
                    life: 3000
                });
            } else {
                this.meeting.code = Number(this.createId());
                this.meetings.push(this.meeting);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'meeting Created',
                    life: 3000
                });
            }

            this.meetings = [...this.meetings];
            this.meetingDialog = false;
            this.meeting = {};
        }
    }

    findIndexById(code: string): number {
        let index = -1;
        for (let i = 0; i < this.meetings.length; i++) {
            if (this.meetings[i].code.toString() === code) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        var chars =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }
    getFilteredData() {}
}
