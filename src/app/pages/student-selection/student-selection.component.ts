import {Master} from '@/models/master';
import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {SessionService} from '@services/session.service';

@Component({
    selector: 'app-student-selection',
    templateUrl: './student-selection.component.html',
    styleUrls: ['./student-selection.component.scss']
})
export class StudentSelectionComponent {
    students: Master[];
    selectedStudent: Master;
    constructor(private router: Router, private session: SessionService) {
        this.students = [
            {name: 'Student 1', code: '0001'},
            {name: 'Student 2', code: '0002'},
            {name: 'Student 3', code: '0003'},
            {name: 'Student 4', code: '0004'},
            {name: 'Student 5', code: '0005'}
        ];
    }

    submit() {
        if (this.selectedStudent) {
            const user = this.session.getUserData();
            user.selectedStudent = this.selectedStudent;
            this.session.setUserData(user);
            this.router.navigate(['/']);
        }
    }
}
