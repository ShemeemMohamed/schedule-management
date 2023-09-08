import {User} from '@/models/user';
import {Component, OnInit} from '@angular/core';
import {AppService} from '@services/app.service';
import {SessionService} from '@services/session.service';
import {MainComponent} from '../main.component';

@Component({
    selector: 'app-menu-sidebar',
    templateUrl: './menu-sidebar.component.html',
    styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit {
    public user;
    public userData: User;

    constructor(
        public appService: AppService,
        public session: SessionService,
        public main: MainComponent
    ) {}

    ngOnInit() {
        this.user = this.appService.user;
        this.userData = this.session.getUserData();
    }
    selectMenu() {
        window.innerWidth;
        if (window.innerWidth <= 1000) this.main.toggleMenuSidebar();
    }
}
