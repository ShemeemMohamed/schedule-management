import {Master} from './master';

export interface Group {
    id?: string;
    code?: string;
    name?: string;
    description?: string;
    class?: Master[];
    division?: Master[];
}
