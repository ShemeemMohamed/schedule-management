import {Component} from '@angular/core';
import {MessageService, ConfirmationService} from 'primeng/api';
import {Student} from '@/models/student';
import {StudentService} from '@services/pages/student.service';
import {UserRoom} from '@/models/user-room';
import {UserRoomService} from '@services/pages/userroom.service';

@Component({
    selector: 'app-meeting-schedule',
    templateUrl: './meeting-schedule.component.html',
    styleUrls: ['./meeting-schedule.component.scss']
})
export class MeetingScheduleComponent {
    rooms: UserRoom[];
    selectedRoom: string;

    students: Student[];
    selectedStudents: string[];

    dateFrom: Date;
    dateTo: Date;

    weekDays: any[] = [
        {name: 'Sunday', code: '0'},
        {name: 'Monday', code: '1'},
        {name: 'Tuesday', value: '2'},
        {name: 'Wednesday', code: '3'},
        {name: 'Thursday', code: '4'},
        {name: 'Friday', code: '5'},
        {name: 'Saturday', code: '6'}
    ];
    emirates: any[] = [
        {name: 'Dubai', code: 'DXB'},
        {name: 'AbuDhabi', code: 'AUH'},
        {name: 'Sharjah', value: 'SHJ'},
        {name: 'Ras Al Khaimah', code: 'RAS'},
        {name: 'Ajman', code: 'AJM'},
        {name: 'Fujairah', code: 'FJR'},
        {name: 'Umm Al Quwain', code: 'UAQ'}
    ];
    axiosVan: any[] = [
        {name: 'Van 1', code: '1'},
        {name: 'Van 2', code: '2'},
        {name: 'Van 3', value: '3'}
    ];
    selectedWeekdays: any[];

    text: string;

    constructor(
        private studentService: StudentService,
        private userRoomservice: UserRoomService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit() {
        this.studentService
            .getStudents()
            .then((data) => (this.students = data));
        this.userRoomservice.getUserRooms().then((data) => (this.rooms = data));
    }

    saveMeeting() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to schedule appointment ?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Appointment Scheduled',
                    life: 3000
                });
            }
        });
    }
}
