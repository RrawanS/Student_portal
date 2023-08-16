import { Component,OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators,AbstractControl,ValidatorFn, ValidationErrors } from '@angular/forms';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { AccountService } from '../_services';

@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {
    user: User | null;

    constructor(  private httpClient: HttpClient,
    private accountService: AccountService) {
        this.user = this.accountService.userValue;
    }

    selectedFile: File;
    imgURL: any;
    retrievedImage: any;
    base64Data: any;
    retrieveResonse: any;
    message: string;
    imageName: any;

public onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }
    ngOnInit(): void {
        this.getImage();
      }




  onUpload() {
    console.log(this.selectedFile);
    const uploadImageData = new FormData();
     uploadImageData.append('userId', this.user.id.toString());
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);


    this.httpClient.post('http://localhost:8080/image/upload', uploadImageData, { observe: 'response' })
        .subscribe((response) => {
          if (response.status === 200) {
            this.message = 'Image uploaded successfully';
          } else {
            this.message = 'Image not uploaded successfully';
          }
        });



  }

      getImage() {
          this.httpClient.get('http://localhost:8080/image/get/' + this.user.id)
            .subscribe(
              res => {
                this.retrieveResonse = res;
                this.base64Data = this.retrieveResonse.picByte;
                this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
              }
            );
        }

}