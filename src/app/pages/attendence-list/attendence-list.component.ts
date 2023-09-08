import {AttendenceList} from '@/models/attendenceList';
import {Component, OnInit} from '@angular/core';
import {AttendenceViewService} from '@services/pages/attendence-view.service';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';

@Component({
    selector: 'app-attendence-list',
    templateUrl: './attendence-list.component.html',
    styleUrls: ['./attendence-list.component.scss']
})
export class AttendenceListComponent implements OnInit {
    attendenceList: AttendenceList[];

    constructor(
        private attendenceViewService: AttendenceViewService,
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig
    ) {}

    ngOnInit() {
        this.attendenceViewService
            .getAttendence()
            .then((attendece) => (this.attendenceList = attendece));
    }

    selectProduct(product: AttendenceList) {
        this.ref.close(product);
    }
}
