import {Search} from '@/models/search';
import {Staff} from '@/models/staff';
import {Component, OnInit} from '@angular/core';
import {StaffService} from '@services/pages/staff.service';
import {MessageService, ConfirmationService, PrimeNGConfig} from 'primeng/api';
import {ToggleButtonModule} from 'primeng/togglebutton';

@Component({
    selector: 'app-staffs',
    templateUrl: './staffs.component.html',
    styleUrls: ['./staffs.component.scss']
})
export class StaffsComponent implements OnInit {
    staffDialog: boolean;

    staffs: Staff[];

    staff: Staff;

    selectedStaff: Staff[];

    submitted: boolean;
    checked: boolean = false;
    onicon: string = 'pi pi-check';
    oficon: string = 'pi pi-times';
    active: string = 'Active';
    inactive: string = 'InActive';
    cols: any[];

    searchData: Search[];
    selectedSerachValue: string;
    constructor(
        private staffService: StaffService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private primengConfig: PrimeNGConfig
    ) {
        this.searchData = [
            {text: 'Active', value: 'active'},
            {text: 'Inactive', value: 'inactive'},
            {text: 'Resigned', value: 'resigned'}
        ];
    }

    ngOnInit() {
        this.cols = [
            {field: 'name', header: 'Name'},
            {field: 'employeeNo', header: 'Employee No'},
            {field: 'gender', header: 'Gender'},
            {field: 'email', header: 'Email'},
            {field: 'mobile', header: 'Mobile'},
            {field: 'address', header: 'Address'}
        ];
        this.primengConfig.ripple = true;
        this.staffService.getStaffs().then((data) => {
            this.staffs = data;
        });
    }

    openNew() {
        this.staff = {};
        this.submitted = false;
        this.staffDialog = true;
    }

    deleteSelectedStaffs() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected products?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.staffs = this.staffs.filter(
                    (val) => !this.selectedStaff.includes(val)
                );
                this.selectedStaff = null;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Staff Deleted',
                    life: 3000
                });
            }
        });
    }

    editStaff(staff: Staff) {
        this.staff = {...staff};
        this.staffDialog = true;
    }

    deleteStaff(staff: Staff, e) {
        let stafarr = [];

        this.staffs.forEach(function (value, index) {
            if (value.id == staff.id) {
                value.activeStatus = e.checked;
            }
            stafarr.push(value);
        });
        console.log(stafarr);
        this.staffs = stafarr;
        console.log(this.staffs, 'staff new');
    }

    hideDialog() {
        this.staffDialog = false;
        this.submitted = false;
    }

    saveSatff() {
        this.submitted = true;

        if (this.staff.name.trim()) {
            if (this.staff.id) {
                this.staffs[
                    this.findIndexById(this.staff.id.toString())
                ] = this.staff;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Staff Updated',
                    life: 3000
                });
            } else {
                this.staff.id = Number(this.createId());
                this.staffs.push(this.staff);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Staff Created',
                    life: 3000
                });
            }

            this.staffs = [...this.staffs];
            this.staffDialog = false;
            this.staff = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.staffs.length; i++) {
            if (this.staffs[i].id.toString() === id) {
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
