import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {SessionService} from './session.service';
import {User} from '@/models/user';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    public user: User = null;

    constructor(
        private router: Router,
        private toastr: ToastrService,
        private session: SessionService
    ) {}

    loginByAuth({email, password}) {
        try {
            localStorage.setItem('token', 'This_is_Test_Token');
            let userData: any = {};
            userData.email = email;
            if (email == 'staff@example.com') {
                userData.fullname = 'James Andrews';
                userData.isStaff = true;
                userData.username = 'Staff';
            } else {
                userData.fullname = 'Albert Flucher';
                userData.isStaff = false;
                userData.username = 'Student';
            }
            this.user = userData;
            this.session.setUserData(userData);

            if (email === 'first@example.com') {
                this.router.navigate(['/change-password']);
            } else {
                this.router.navigate(['/']);
            }
        } catch (error) {
            this.toastr.error(error.response.data.message);
        }
    }

    getProfile() {
        try {
            this.user = this.session.getUserData();
        } catch (error) {
            this.logout();
            throw error;
        }
    }

    logout() {
        this.session.removeUserData();
        this.user = null;
        this.router.navigate(['/login']);
    }
}
