import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import { Base64 } from 'js-base64';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import * as WmsActions from '../../actions/wms.action';
import { Observable } from 'rxjs';
import { Wms, WmsUser } from '../../model/wms.model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  profileForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
  });

    constructor(
      private _auth: AuthenticationService,
      private router: Router,
      private toastrService: ToastrService,
      private spinner: NgxSpinnerService,
      private store: Store<AppState>
      ) {
      }
   ngOnInit() {
    localStorage.removeItem('storeUser');
    this.spinner.show();
    setTimeout(() => {
        this.spinner.hide();
    }, 1000);
   }
  getErrorMessage() {
    return this.profileForm.hasError('required') ? 'You must enter a value' : '';
  }
  onSubmit() {
    const userEncodedData = Base64.encode(`${this.profileForm.value.userName}+#+${this.profileForm.value.password}`);
    this.store.dispatch(new WmsActions.UserLogin(
      {
        UserName: this.profileForm.value.userName,
        Password: this.profileForm.value.password
      }
    ));
    const storeLocalData = localStorage.setItem('storeUser', JSON.stringify(userEncodedData));
    console.log(userEncodedData, 'userEncodedData');
    this._auth.authenticateUser(userEncodedData).subscribe(data => {
        if (!data) {
          alert('Incorrect Username or password');
        } else {
          console.log(data, 'data user');
          this.router.navigate(['dashboard']);
          this.toastrService.success('Login Successfully', 'Success!');
        }
    });
  }
}
