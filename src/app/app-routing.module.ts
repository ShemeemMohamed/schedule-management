import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from '@modules/main/main.component';
import {LoginComponent} from '@modules/login/login.component';
import {ProfileComponent} from '@pages/profile/profile.component';
import {RegisterComponent} from '@modules/register/register.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {AuthGuard} from '@guards/auth.guard';
import {NonAuthGuard} from '@guards/non-auth.guard';
import {ForgotPasswordComponent} from '@modules/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from '@modules/recover-password/recover-password.component';
import {PrivacyPolicyComponent} from '@modules/privacy-policy/privacy-policy.component';
import {StudentsComponent} from '@pages/students/students.component';
import {StaffsComponent} from '@pages/staffs/staffs.component';
import {MeetingScheduleComponent} from '@pages/meeting-schedule/meeting-schedule.component';
import {GroupsComponent} from '@pages/groups/groups.component';
import {RecordingsComponent} from '@pages/recordings/recordings.component';
import {ScheduledMeetingComponent} from '@pages/scheduled-meeting/scheduled-meeting.component';
import {StudentPromoteComponent} from '@pages/student-promote/student-promote.component';
import {ChangePasswordComponent} from '@pages/change-password/change-password.component';
import {AttendenceComponent} from '@pages/attendence/attendence.component';
import {StudentSelectionComponent} from '@pages/student-selection/student-selection.component';
import {UserRoomComponent} from '@pages/user-room/user-room.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: 'students',
                component: StudentsComponent
            },
            {
                path: 'staffs',
                component: StaffsComponent
            },
            {
                path: 'schedule-meeting',
                component: MeetingScheduleComponent
            },
            {
                path: 'meetings',
                component: ScheduledMeetingComponent
            },
            {
                path: 'groups',
                component: GroupsComponent
            },
            {
                path: 'recordings',
                component: RecordingsComponent
            },
            {
                path: 'promote-students',
                component: StudentPromoteComponent
            },
            {
                path: 'attendence',
                component: AttendenceComponent
            },
            {
                path: 'change-password',
                component: ChangePasswordComponent
            },
            {
                path: 'user-room',
                component: UserRoomComponent
            },
            {
                path: '',
                component: DashboardComponent
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'recover-password',
        component: RecoverPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'reset-password',
        component: ChangePasswordComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'select-student',
        component: StudentSelectionComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent,
        canActivate: [NonAuthGuard]
    },
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
