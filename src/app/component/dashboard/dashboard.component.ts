import { Component, OnChanges, OnInit, OnDestroy, SimpleChanges } from '@angular/core';
import { DashDataService } from './dashdata.service';
import { faCoffee } from '@fortawesome/fontawesome-free/js/fontawesome';
import { Router } from '@angular/router';
import { PassTaskDetailService } from '../tasks/passtaskdetail.service';
import { Observable ,  throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import * as WmsActions from '../../actions/wms.action';
import { Base64 } from 'js-base64';
import { NgxSpinnerService } from 'ngx-spinner';
import { Wms, WmsUser } from '../../model/wms.model';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
    faCoffee = faCoffee;
    selectionType: any;
    articleTask = false;
    initialStateData = {};
    data;
    parseDetail: any;
    userEncodedData;
    fullUserEncodeddata;
    unsubscribeUserDashData;
    userAccountList: Observable<WmsUser[]>;
    authCheckUser;

    constructor(
        private _dash: DashDataService,
        private router: Router,
        private _pass: PassTaskDetailService,
        private store: Store<AppState>,
        private spinner: NgxSpinnerService,
        private _auth: AuthenticationService
    ) {
    }

    ngOnInit() {
        this.userAccountList = this.store.select('wmsUser');  /* user login name and password  */
        const directUrlAccessDenied = JSON.parse(localStorage.getItem('storeUser'));
        const decodeUrlUseraccess = Base64.decode(directUrlAccessDenied);
        const decodeUrlUseraccessSplit = decodeUrlUseraccess.split('+');
        // const removeUrlAccess = decodeUrlUseraccessSplit.indexOf('#');
        console.log(decodeUrlUseraccessSplit, 'data available');
        this._auth.authenticateUser(directUrlAccessDenied).subscribe(data => {
            if (data) {
                 console.log(data.User_Name, decodeUrlUseraccessSplit[0], data.User_Password, decodeUrlUseraccessSplit[2], 'yes nio');

                if (data.User_Name === decodeUrlUseraccessSplit[0] && data.User_Password === decodeUrlUseraccessSplit[2]) {
                    console.log('yes');
                } else {
                    alert('no');
                    this.router.navigate(['login']);
                }
                console.log(data.User_Name, data.User_Password, 'no data');
            } else {
            console.log('ati auth data');
            console.log(data, 'auth data');
            }
        });
        console.log(decodeUrlUseraccessSplit, 'directUrlAccessDenied removeUrlAccess');
        if (!directUrlAccessDenied) {
            this.router.navigate(['login']);
        }
        const getLocalUser = JSON.parse(localStorage.getItem('storeUser'));
        console.log(getLocalUser, 'getLocalUser');
        this.unsubscribeUserDashData = this._dash.userDashData(getLocalUser).subscribe(data => {
            console.log(data, 'data changes');
            this.data = data[0];
        });
        this.spinner.show();
        setTimeout(() => {
            this.spinner.hide();
        }, 1000);
    }
    singleArticlePages(item) {
        const selectedArticleId = localStorage.setItem('storeUserArtId', item.ARTID);
        this.initialStateData = {
            ARTID: item.ARTID,
            ArtComments: item.ArtComments,
            ArtStatus: item.ArtStatus,
            Date_Assign: item.Date_Assign,
            Date_Complete: item.Date_Complete,
            Jcode: item.Jcode,
            MSPages: item.MSPages,
            TaskID: item.TaskID,
            TaskName: item.TaskName,
            Username: item.Username,
            Workname: item.Workname
        };

        this.userEncodedData = {
            ARTID: item.ARTID,
            ArtComments: item.ArtComments,
            ArtStatus: item.ArtStatus,
            Date_Assign: item.Date_Assign,
            Date_Complete: item.Date_Complete,
            Jcode: item.Jcode,
            MSPages: item.MSPages,
            TaskID: item.TaskID,
            TaskName: item.TaskName,
            Username: item.Username,
            Workname: item.Workname
        };

        this.userEncodedData = Base64.encode(JSON.stringify(this.userEncodedData));
        this.fullUserEncodeddata = Base64.encode(`${item.TaskID}`);

        const saveTkId = localStorage.setItem('tkid', this.userEncodedData);
        const saveJournalDetails = localStorage.setItem('fjd', this.fullUserEncodeddata);
        this._dash.userPassDashData(this.fullUserEncodeddata).subscribe(data => {
            this.parseDetail = JSON.parse(data.toString());
        },
            error => {
                console.error('Error saving!');
                return throwError(error);  // Angular 6/RxJS 6
            });
        this.articleTask = true;
        this.router.navigate(['task']);
    }
    ngOnDestroy() {
        this.unsubscribeUserDashData.unsubscribe();
    }
}
