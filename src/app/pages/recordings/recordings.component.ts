import {Recording} from '@/models/recording';
import {Search} from '@/models/search';
import {Component, Type} from '@angular/core';
import {RecordingsService} from '@services/pages/recordings.service';
import {ScheduledMeetingService} from '@services/pages/scheduled-meeting.service';
import {ConfirmationService, MessageService} from 'primeng/api';

interface Types {
    name: string;
    code: string;
}

@Component({
    selector: 'app-recordings',
    templateUrl: './recordings.component.html',
    styleUrls: ['./recordings.component.scss']
})
export class RecordingsComponent {
    recodingDialog: boolean;
    recordSaveDialog: boolean;

    recordings: Recording[];

    recording: Recording;

    selectedRecording: Recording[];

    submitted: boolean;
    type: Types[];
    selectedType: Types;
    rangeDates: Date;
    searchData: Search[];
    selectedSerachValue: string;
    constructor(
        private recodingService: RecordingsService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {
        this.type = [
            {name: 'Text', code: 'T'},
            {name: 'Video', code: 'V'},
            {name: 'Image', code: 'I'}
        ];
        this.searchData = [
            {text: 'test', value: 'ID1'},
            {text: 'tes1', value: 'ID2'},
            {text: 'tes2', value: 'ID2'},
            {text: 'tes3', value: 'ID2'}
        ];
    }

    ngOnInit() {
        this.recodingService
            .getRecording()
            .then((data) => (this.recordings = data));
    }

    openNew() {
        this.recording = {};
        this.submitted = false;
        this.recordSaveDialog = true;
    }

    viewRecord(record: Recording) {
        this.recording = {...record};
        this.recodingDialog = true;
    }
    downloadRecord(record: Recording) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to download' + record.name + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.recordings = this.recordings.filter(
                    (val) => val.id !== record.id
                );
                this.recording = {};
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
        this.recodingDialog = false;
        this.submitted = false;
    }

    saveMeeting() {
        this.submitted = true;
        debugger;
        if (this.recording.name.trim()) {
            if (this.recording.id) {
                this.recordings[
                    this.findIndexById(this.recording.id.toString())
                ] = this.recording;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'metting Updated',
                    life: 3000
                });
            } else {
                this.recording.id = Number(this.createId());
                this.recordings.push(this.recording);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'meeting Created',
                    life: 3000
                });
            }

            this.recordings = [...this.recordings];
            this.recodingDialog = false;
            this.recording = {};
        }
    }

    findIndexById(code: string): number {
        let index = -1;
        for (let i = 0; i < this.recordings.length; i++) {
            if (this.recording[i].code.toString() === code) {
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
