import {Student} from '@/models/student';
import {Component, OnInit} from '@angular/core';
import {StudentService} from '@services/pages/student.service';
import {MessageService, ConfirmationService} from 'primeng/api';
import {Master} from '@/models/master';
import {MasterService} from '@services/pages/master.service';
import {Search} from '@/models/search';

@Component({
    selector: 'app-students',
    templateUrl: './students.component.html',
    styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
    studentDialog: boolean;

    student: Student;
    cols: any[];

    students: Student[];
    classes: Master[];
    divisions: Master[];
    departments: Master[];
    semesters: Master[];

    selectedStudents: Student[];
    selectedClass: Master;
    selectedDivision: Master;
    selectedDepartment: Master;
    selectedSemester: Master;

    submitted: boolean;
    onicon: string = 'pi pi-check';
    oficon: string = 'pi pi-times';

    searchData: Search[];
    selectedSerachValue: string;

    constructor(
        private studentService: StudentService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private masterService: MasterService
    ) {
        this.searchData = [
            {text: 'Active', value: 'active'},
            {text: 'Inactive', value: 'inactive'}
        ];
    }

    ngOnInit() {
        this.cols = [
            {field: 'rollNumber', header: 'Roll No.'},
            {field: 'name', header: 'Name'},
            {field: 'registerNumber', header: 'Reg. No.'},
            {field: 'dob', header: 'DOB'},
            {field: 'gender', header: 'Gender'},
            {field: 'mobile', header: 'Mobile'}
        ];
        this.studentService.getStudents().then((data) => {
            this.students = data;
            console.log('students', this.students);
        });
        this.masterService.getClasses().then((data) => (this.classes = data));
        this.masterService
            .getDivisions()
            .then((data) => (this.divisions = data));
        this.masterService
            .getDepartments()
            .then((data) => (this.departments = data));
        this.masterService
            .getSemesters()
            .then((data) => (this.semesters = data));
    }

    openNew() {
        this.student = {};
        this.submitted = false;
        this.studentDialog = true;
    }

    deleteSelectedStudents() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected students?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.students = this.students.filter(
                    (val) => !this.selectedStudents.includes(val)
                );
                this.selectedStudents = null;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Students Deleted',
                    life: 3000
                });
            }
        });
    }

    editStudent(student: Student) {
        this.student = {...student};
        this.studentDialog = true;
        this.selectedClass = this.student.class;
        this.selectedDivision = this.student.division;
        this.selectedDepartment = this.student.department;
        this.selectedSemester = this.student.semester;
    }

    deleteStudent(student: Student, e) {
        let studarr = [];

        this.students.forEach(function (value, index) {
            if (value.rollNumber == student.rollNumber) {
                value.activeStatus = e.checked;
            }
            studarr.push(value);
        });
        console.log(studarr);
        this.students = studarr;
        console.log(this.students, 'student new');
    }

    hideDialog() {
        this.studentDialog = false;
        this.submitted = false;
    }

    saveStudent() {
        this.submitted = true;

        if (this.student.name.trim()) {
            if (this.student.registerNumber) {
                this.students[
                    this.findIndexById(this.student.registerNumber)
                ] = this.student;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Student Updated',
                    life: 3000
                });
            } else {
                this.student.registerNumber = this.createId();
                // this.product.image = 'product-placeholder.svg';
                this.students.push(this.student);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Student Created',
                    life: 3000
                });
            }

            this.students = [...this.students];
            this.studentDialog = false;
            this.student = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.students.length; i++) {
            if (this.students[i].registerNumber === id) {
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
