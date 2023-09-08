import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AppService} from '@services/app.service';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
    public changePasswordForm: FormGroup;
    public isAuthLoading = false;

    constructor(
        private renderer: Renderer2,
        private toastr: ToastrService,
        private route: Router,
        private appService: AppService
    ) {}

    ngOnInit(): void {
        this.renderer.addClass(
            document.querySelector('app-root'),
            'login-page'
        );
        this.changePasswordForm = new FormGroup({
            password: new FormControl(null, Validators.required),
            confirmPassword: new FormControl(null, Validators.required)
        });
    }

    changePassword() {
        if (!this.changePasswordForm.valid) {
            this.toastr.error('Invalid', 'Please fill all required fields!');
        } else if (
            this.changePasswordForm.get('password').value !==
            this.changePasswordForm.get('confirmPassword').value
        ) {
            this.toastr.error('Invalid', 'Password mismatch!');
        } else {
            this.route.navigate(['/']);
        }
    }
}
