import {Group} from '@/models/group';
import {Master} from '@/models/master';
import {Search} from '@/models/search';
import {Component, OnInit} from '@angular/core';
import {GroupService} from '@services/pages/group.service';
import {MessageService, ConfirmationService} from 'primeng/api';

@Component({
    selector: 'app-groups',
    templateUrl: './groups.component.html',
    styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
    groupDialog: boolean;

    groups: Group[];
    classes: Master[];
    divisions: Master[];

    group: Group;

    selectedGroups: Group[];
    selectedClasses: Master[];
    selectedDivisions: Master[];

    submitted: boolean;
    cols: any[];
    date: Date;

    searchData: Search[];
    selectedSerachValue: string;

    constructor(
        private groupService: GroupService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {
        this.searchData = [
            {text: 'Active', value: 'active'},
            {text: 'InActive', value: 'inactive'}
        ];
    }

    ngOnInit() {
        this.cols = [
            {field: 'code', header: 'Code'},
            {field: 'name', header: 'Group Name'}
        ];
        this.groupService
            .getProducts()
            .then((data) => console.log((this.groups = data)));

        this.groupService.getClasses().then((data) => (this.classes = data));

        this.groupService
            .getDivisions()
            .then((data) => (this.divisions = data));
    }

    openNew() {
        this.group = {};
        this.submitted = false;
        this.groupDialog = true;
    }

    deleteSelectedGroup() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected group?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.groups = this.groups.filter(
                    (val) => !this.selectedGroups.includes(val)
                );
                this.selectedGroups = null;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Groups Deleted',
                    life: 3000
                });
            }
        });
    }

    editGroup(group: Group) {
        this.group = {...group};

        this.groupDialog = true;
    }

    deleteGroup(group: Group) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + group.name + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.groups = this.groups.filter((val) => val.id !== group.id);
                this.group = {};
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Group Deleted',
                    life: 3000
                });
            }
        });
    }

    hideDialog() {
        this.groupDialog = false;
        this.submitted = false;
    }

    saveGroup() {
        this.submitted = true;

        if (this.group.name.trim()) {
            if (this.group.id) {
                this.groups[this.findIndexById(this.group.id)] = this.group;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Group Updated',
                    life: 3000
                });
            } else {
                this.group.id = this.createId();
                this.groups.push(this.group);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Group Created',
                    life: 3000
                });
            }

            this.groups = [...this.groups];
            this.groupDialog = false;
            this.group = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.groups.length; i++) {
            if (this.groups[i].id === id) {
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
    list2Comma(list: any) {
        return Array.prototype.map.call(list, (s) => s.name).toString();
    }
    getFilteredData() {}
}
