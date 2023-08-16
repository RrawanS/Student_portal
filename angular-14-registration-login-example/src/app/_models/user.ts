import {Student} from '../_models';

export class User {
    id?: Number;
    student: Student;
    passWord?: string;
    confirmPassWord? : string;
}