import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators,AbstractControl,ValidatorFn, ValidationErrors } from '@angular/forms';
import { first } from 'rxjs/operators';
import {User} from '../_models';
import {Student} from '../_models';
import { LevelOfStudyEnum } from '../_models';
import { FacultyEnum } from '../_models';
import { ProgramEnum } from '../_models';

import { AccountService, AlertService } from '../_services';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    registerUserForm!: FormGroup;
    loading = false;
    submitted = false;

levelOfStudyOptions = Object.values(LevelOfStudyEnum);
programOptions = Object.values(ProgramEnum);
facultyOptions = Object.values(FacultyEnum);

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
    this.initForm();
    }

initForm() {
        this.registerUserForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            birthDate: ['', [Validators.required, this.pastDateValidator]],
            levelOfStudy: ['', Validators.required],
            program: ['', Validators.required],
            faculty: ['', Validators.required],
            passWord: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassWord: ['', Validators.required],
        });
}

    get f() { return this.registerUserForm.controls; }

pastDateValidator(control: AbstractControl): { [key: string]: any } | null {
        const currentDate = new Date();
        const selectedDate = new Date(control.value);

        if (selectedDate >= currentDate) {
            return { futureDate: true };
        }

        return null;
    }

   onSubmit() {
       this.submitted = true;
       this.alertService.clear();
       if (this.registerUserForm.invalid) {
           return;
       }
       this.loading = true;

       this.accountService.register(this.prepareRequest())
           .pipe(first())
           .subscribe(
               () => {
                   this.alertService.success('Registration successful', { keepAfterRouteChange: true });
                   this.router.navigate(['../login'], { relativeTo: this.route });
                   this.loading = false;
               },
               errorResponse => {
                   if (errorResponse && errorResponse.error) {
                       this.alertService.error(errorResponse.error, { autoClose: false });
                   } else {
                       this.alertService.error('An error occurred during registration.', { autoClose: false });
                   }
                   this.loading = false;
               }
           );
   }


 prepareRequest() {
        const user: User = new User();
        const student: Student = new Student();
        student.firstName = this.registerUserForm.value.firstName;
        student.lastName = this.registerUserForm.value.lastName;
        student.email = this.registerUserForm.value.email;
        student.birthDate = this.registerUserForm.value.birthDate;
        student.levelOfStudy = this.registerUserForm.value.levelOfStudy;
        student.program = this.registerUserForm.value.program;
        student.faculty = this.registerUserForm.value.faculty;

        user.student = student;

        user.passWord = this.registerUserForm.value.passWord;
        user.confirmPassWord = this.registerUserForm.value.confirmPassWord;

        return user;
      }

}