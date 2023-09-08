import {Component, OnInit} from '@angular/core';
import {UserRoom} from '@/models/user-room';
import {UserRoomService} from '@services/pages/userroom.service';
import {Search} from '@/models/search';

@Component({
    selector: 'app-user-room',
    templateUrl: './user-room.component.html',
    styleUrls: ['./user-room.component.scss']
})
export class UserRoomComponent implements OnInit {
    userRoom: UserRoom;
    userRooms: UserRoom[];

    active: string = 'Enabled';
    inActive: string = 'Disabled';
    activeStyle: string = 'pi pi-check';
    inActiveStyle: string = 'pi pi-times';

    searchData: Search[];
    selectedSerachValue: string;
    constructor(private userRoomservice: UserRoomService) {
        this.searchData = [
            {text: 'Active', value: 'active'},
            {text: 'In Active', value: 'inactive'}
        ];
    }

    ngOnInit() {
        this.userRoomservice
            .getUserRooms()
            .then((data) => (this.userRooms = data));
    }
    getFilteredData() {}

    // changeStatus(userRoom: UserRoom) {
    //   this.userRooms = this.userRooms.map(
    //     (val) => {
    //       val = userRoom;
    //       return val;
    //     }
    //   );
    // }
}
