import {Attendence} from '@/models/attendence';
import {AttendenceList} from '@/models/attendenceList';
import {Search} from '@/models/search';
import {Component, OnInit} from '@angular/core';
import {AttendenceListComponent} from '@pages/attendence-list/attendence-list.component';
import {AttendenceService} from '@services/pages/attendence.service';
import {ConfirmationService, MessageService, PrimeNGConfig} from 'primeng/api';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';

@Component({
    selector: 'app-attendence',
    templateUrl: './attendence.component.html',
    styleUrls: ['./attendence.component.scss']
})
export class AttendenceComponent implements OnInit {
    attendenceDialog: boolean;
    attendences: Attendence[];
    attendence: Attendence;
    selectedAttendence: Attendence[];
    submitted: boolean;
    ref: DynamicDialogRef;
    cols: any[];
    searchData: Search[];
    selectedSerachValue: string;

    constructor(
        private attendenceService: AttendenceService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private primengConfig: PrimeNGConfig,
        public dialogService: DialogService
    ) {
        this.searchData = [
            {text: 'Active', value: 'active'},
            {text: 'In Active', value: 'inactive'}
        ];
    }

    ngOnInit(): void {
        this.cols = [
            {field: 'topic', header: 'Topic'},
            {field: 'meetingId', header: 'Meeting ID'},
            {field: 'userCount', header: 'User Count'},
            {field: 'class', header: 'Class'},
            {field: 'time', header: 'Time'}
        ];
        this.primengConfig.ripple = true;
        this.attendenceService.getAttendence().then((data) => {
            this.attendences = data;
        });
    }
    openNew() {
        this.attendence = {};
        this.submitted = false;
        this.attendenceDialog = true;
    }
    viewAttendence(attendence: Attendence) {
        // this.attendence = {...attendence};
        // this.attendenceDialog = true;
        this.ref = this.dialogService.open(AttendenceListComponent, {
            header: 'Attendence Data',
            width: '70%',
            contentStyle: {'max-height': '500px', overflow: 'auto'},
            baseZIndex: 10000
        });

        this.ref.onClose.subscribe((attendenceList: AttendenceList) => {
            if (attendenceList) {
                this.messageService.add({
                    severity: 'info',
                    summary: 'Attendence selected',
                    detail: attendenceList.name
                });
            }
        });
    }
    getFilteredData() {}
}
