import {Component, OnInit} from '@angular/core';
import {StudentPromoteService} from '@services/pages/student-promote.service';
import {StudentPromote} from '@/models/student-promote';
import {MessageService, ConfirmationService} from 'primeng/api';
import {Search} from '@/models/search';

@Component({
    selector: 'app-student-promote',
    templateUrl: './student-promote.component.html',
    styleUrls: ['./student-promote.component.scss']
})
export class StudentPromoteComponent implements OnInit {
    promoteStudent: StudentPromote;
    promoteStudents: StudentPromote[];

    statuses: any[];

    classes: any[];
    selectedClass: any[];

    clonedStudents: {[s: string]: StudentPromote} = {};

    searchData: Search[];
    selectedSerachValue: string;
    constructor(
        private promoteStudentService: StudentPromoteService,
        private messageService: MessageService
    ) {
        this.searchData = [
            {text: 'Promoted', value: 'promoted'},
            {text: 'Not Promoted', value: 'notpromoted'}
        ];
    }

    ngOnInit() {
        this.promoteStudentService
            .getPromotedStudents()
            .then((data) => (this.promoteStudents = data));

        this.statuses = [
            {label: 'Promoted', value: 'Promoted'},
            {label: 'Not Promoted', value: 'Not Promoted'}
        ];

        this.classes = [
            {label: 'Class 1', value: 'class1'},
            {label: 'Class 2', value: 'class2'},
            {label: 'Class 3', value: 'class3'},
            {label: 'Class 4', value: 'class4'}
        ];
    }

    onRowEditInit(promoteStudent: StudentPromote) {
        this.promoteStudents[promoteStudent.Patient] = {...promoteStudent};
    }

    onRowEditSave(promoteStudent: StudentPromote) {
        // if (promoteStudent.price > 0) {
        //     delete this.clonedStudents[promoteStudent.rollNumber];
        this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Student is updated'
        });
        // }
        // else {
        //     this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Price' });
        // }
    }

    onRowEditCancel(promoteStudent: StudentPromote, index: number) {
        // this.promoteStudent[index] = this.clonedStudents[promoteStudent.rollNumber];
        // delete this.promoteStudent[promoteStudent.rollNumber];
    }
    getFilteredData() {}
}
