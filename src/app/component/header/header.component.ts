import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Base64 } from 'js-base64';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
    selector: 'app-header',
 templateUrl: 'header.component.html',
   styleUrls: ['header.component.css']
})
export class HeaderComponent {
    activity = 'Pending';
    showLoginUser: string;
    constructor(private router: Router, private toastrService: ToastrService, private _location: Location) {
        const userDecodedData = Base64.decode(localStorage.getItem('storeUser'));
        const getUserName = userDecodedData.split('+');
        this.showLoginUser = getUserName[0];
    }

    logoutArticle() {
        const logoutStoredUser = localStorage.removeItem('storeUser');
        if (logoutStoredUser === undefined) {
            this.router.navigate(['login']);
        }
        this.toastrService.success('Logout Successfully', 'Success!');
    }

    backToHome() {
        this._location.back();
    }
}
