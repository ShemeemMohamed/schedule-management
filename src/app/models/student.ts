import {Master} from './master';

export interface Student {
    name?: string;
    rollNumber?: string;
    registerNumber?: string;
    gender?: string;
    dob?: string;
    email?: string;
    mobile?: string;
    address?: string;
    class?: Master;
    division?: Master;
    department?: Master;
    semester?: Master;
    activeStatus?: boolean;
}
