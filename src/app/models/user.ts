import {Master} from './master';

export interface User {
    username: string;
    fullname: string;
    createdAt: string;
    picture: string;
    email: string;
    isStaff: boolean;
    selectedStudent: Master;
}
