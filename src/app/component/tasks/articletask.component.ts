import { Component, OnInit, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm } from '@angular/forms';
import { PassTaskDetailService } from '../tasks/passtaskdetail.service';
import { Observable, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { Wms } from '../../model/wms.model';
import { AppState } from '../../app.state';
import { DashDataService } from '../dashboard/dashdata.service';
import * as WmsActions from '../../actions/wms.action';
import { Base64 } from 'js-base64';
import { UploadFileService } from '../tasks/file.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ArticleModel } from './articletaskmodel';


@Component({
    selector: 'app-article-task',
    templateUrl: './articletask.component.html',
    styleUrls: ['./articletask.component.css'],
    providers: [UploadFileService]
})
export class ArticleTaskComponent implements OnInit {
    // taskForm = new FormGroup({
    //     comment: new FormControl('', Validators.required),
    // });
    journalItem: any = [];
    wmss: Observable<Wms[]>;
    userPassDashDataSub;
    itemArticleId: any = [];
    historyData: any;
    singleUserData;
    getSplitUserDetail;
    jcodeTkName;
    selectedFile: File;
    fileUrl;
    styleUrl;
    nameStyleUrl;
    ReferenceUrl;
    nameReferenceUrl;
    DownloadUrl;
    nameDownloadUrl;
    disableUploadButton;
    userSelectFile: Boolean = true;
    userUploadFile: Boolean = false;
    styleManualDataStore: Observable<Wms[]>;
    showHistory: Boolean = false;
    journalStatus: any;
    rForm: FormGroup;
    post: any;                     // A property for our submitted form
    articleid = '';
    articlename = '';
    model = new ArticleModel('', '');
    @ViewChild('fileInput') fileInput;
    selectedObject = '';
    specialInfoData;
    storeInstrDetail;
    accessAuthorizedUser: Boolean;
    downloadArticleFile;
    private selectUndefinedOptionValue: any;
    hideUnauthorisedUser: Boolean;
    constructor(
        private router: Router,
        private _pass: PassTaskDetailService,
        private store: Store<AppState>,
        private _dash: DashDataService,
        private uploadService: UploadFileService,
        private http: HttpClient,
        private sanitizer: DomSanitizer,
        private toastrService: ToastrService,
        private spinner: NgxSpinnerService,
        private fb: FormBuilder
    ) {
        this.styleManualDataStore = store.select('wms');
        // console.log(this.taskForm, 'taskform');
    }
    ngOnInit(): void {
        this.rForm = this.fb.group({
            'comment' : [''],
            'upload' : [null, Validators.required],
            'journalStatus': [null, Validators.required],
            // 'item' : [null, Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(500)])],
            // 'validate' : ''
          });
        console.log(this.fileInput.nativeElement, this.rForm,  'fileInput');
        const getSelectedArticleId = localStorage.getItem('storeUserArtId');
        const viewSelectedArticleId = JSON.parse(localStorage.getItem('storeUser'));
        const getAccessFjd = localStorage.getItem('fjd');
        const getAccessTkId = localStorage.getItem('tkid');
        const getSingleUserDetail = Base64.decode(getAccessTkId);

        this.getSplitUserDetail = getSingleUserDetail.split('+');
        this.singleUserData = JSON.parse(this.getSplitUserDetail);
        this.jcodeTkName = Base64.encode(`${this.singleUserData.Jcode}+#+${this.singleUserData.ARTID}+#+${this.singleUserData.Workname}`);
        // this.jcodeTkName = Base64.encode(`${this.singleUserData.Jcode}+#+${this.singleUserData.TaskName}`);
        this.downloadArticleFile = `http://eproof.hurix.com/hope_webapi/GetFile/${this.jcodeTkName}`;
        console.log(this.downloadArticleFile, 'this.jcodeTkName');
        this._dash.userPassDashData(getAccessFjd).subscribe(data => {
            const body = data;
            const userPassDashDataSub = JSON.parse(body.toString());
            this.historyData = userPassDashDataSub;
            this.store.dispatch(new WmsActions.StyleManual(this.historyData));
        });
        const blockingRedirectPage = localStorage.getItem('storeUser');
        if (!blockingRedirectPage) {
            this.router.navigate(['login']);
        } else {
            console.log('access granted');
        }
        this.spinner.show();
        setTimeout(() => {
            this.spinner.hide();
        }, 1000);
        console.log(this.model, 'model');
        const dashDownload = this.jcodeTkName;
        console.log(dashDownload, 'dash modek');
        this.DownloadUrl = Base64.decode(dashDownload);
        const splitDownloadUrl = this.DownloadUrl.split('+');
        const removeDownloadUrl = splitDownloadUrl.indexOf('#');
        if (removeDownloadUrl > -1) {
            splitDownloadUrl.splice(removeDownloadUrl, 1);
        }
        this.nameDownloadUrl =  `${splitDownloadUrl[0]}-${splitDownloadUrl[1]}`;
        console.log(this.nameDownloadUrl, 'this.nameDownloadUrl');
        this._dash.userDownloadData(dashDownload).subscribe(data => {
            console.log(data, 'data');
            this.downloadFile(data);
        },
        error => {
            console.error('Error saving!');
            return throwError(error);  // Angular 6/RxJS 6
        });

    //     setTimeout(() => {
    //         const dashStyleManual = 'QVJYKyMrQ29weWVkaXRpbmc=';
    //    this.styleUrl = Base64.decode(dashStyleManual);
    //    const splitStyleUrl = this.styleUrl.split('+');
    //    const removeStyleUrl = splitStyleUrl.indexOf('#');
    //    if (removeStyleUrl > -1) {
    //        splitStyleUrl.splice(removeStyleUrl, 1);
    //     }
    //     this.nameDownloadUrl =  `${splitStyleUrl[0]}-${splitStyleUrl[1]}`;
    //    this._dash.userStyleManualData(dashStyleManual).subscribe(data => {
    //        this.downloadFile(data);
    //        this.toastrService.success('File Downloaded Successfully', 'Success!');
    //    },
    //   error => {
    //       console.error('Error saving!');
    //       return throwError(error);
    //   });
    //     }, 3000);

    //      const data = 'some text';
    // const blob = new Blob([data], { type: 'application/octet-stream' });

    // this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
    this.journalStatus = [];
    console.log(this.journalStatus, 'this.journalStatus Error saving!');
    this.specialInfoData = {
        'specialInstruction': 'This XML file does not appear to have any style information associated with it. The document tree is shown below.'
    };
    // const getSelectedArticleId = localStorage.getItem('storeUserArtId');
    // const viewSelectedArticleId = JSON.parse(localStorage.getItem('storeUser'));
    const getSingleUserDetailInstruction = Base64.decode(viewSelectedArticleId);
    this.storeInstrDetail = getSingleUserDetailInstruction.split('+');

    if (this.storeInstrDetail[0] === 'FC_test') {
        this.hideUnauthorisedUser = false;
        this.accessAuthorizedUser = false;
    } else {
        this.accessAuthorizedUser = true;
        this.hideUnauthorisedUser = true;
    }
    // this._pass.specialInstruction();
    }

    updateSelectedValue(event: string): void {
        this.journalStatus = ['In-Complete', 'Complete', 'Hold'];
        console.log(event, 'event string');
    }
    onFileChanged(event) {
      this.selectedFile = event.target.files[0];
      this.userSelectFile = false;
      this.userUploadFile = true;
    }
    onUpload() {
        const uploadData = new FormData();
        if (this.selectedFile !== undefined) {
        uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
        this.http.post('http://eproof.hurix.com/hope_webapi/UploadFiles/SE1FKyMrNzk1Nzk1KyMrQ29weWVkaXRpbmc=', uploadData)
        .subscribe(event => {
            this.toastrService.success('File Uploaded Successfully', 'Success!');
            this.disableUploadButton = true;
          });
        } else {
            this.toastrService.error('Please Upload File!', 'Error!');
        }
    }
    styleManual() {
        const dashStyleManual = 'QVJYKyMrQ29weWVkaXRpbmc=';
        this.styleUrl = Base64.decode(dashStyleManual);
        const splitStyleUrl = this.styleUrl.split('+');
        const removeStyleUrl = splitStyleUrl.indexOf('#');
        if (removeStyleUrl > -1) {
            splitStyleUrl.splice(removeStyleUrl, 1);
         }
        this.nameStyleUrl =  `${splitStyleUrl[0]}-${splitStyleUrl[1]}`;
        this._dash.userStyleManualData(dashStyleManual).subscribe(data => {
            this.downloadFile(data);
            this.toastrService.success('File Downloaded Successfully', 'Success!');
        },
       error => {
           console.error('Error saving!');
           return throwError(error);
       });
    }
    reference() {
        const dashReference = 'QUZGKyMrQ29weWVkaXRpbmc=';
        this.ReferenceUrl = Base64.decode(dashReference);
        const splitReferenceUrl = this.ReferenceUrl.split('+');
        const removeReferenceUrl = splitReferenceUrl.indexOf('#');
        if (removeReferenceUrl > -1) {
            splitReferenceUrl.splice(removeReferenceUrl, 1);
         }
        this.nameReferenceUrl =  `${splitReferenceUrl[0]}-${splitReferenceUrl[1]}`;
        this._dash.userRefernceData(dashReference).subscribe(data => {
            this.downloadFile(data);
            this.toastrService.success('File Downloaded Successfully', 'Success!');
        },
       error => {
           console.error('Error saving!');
           return throwError(error);  // Angular 6/RxJS 6
       });
    }
    download() {
        const dashDownload = 'QUhQKyMrODA3MjExKyMrQ29weWVkaXRpbmc=';
        this.DownloadUrl = Base64.decode(dashDownload);
        const splitDownloadUrl = this.DownloadUrl.split('+');
        const removeDownloadUrl = splitDownloadUrl.indexOf('#');
        if (removeDownloadUrl > -1) {
            splitDownloadUrl.splice(removeDownloadUrl, 1);
        }
        this.nameDownloadUrl =  `${splitDownloadUrl[0]}-${splitDownloadUrl[1]}`;
        this._dash.userDownloadData(dashDownload).subscribe(data => {
            console.log(data, 'data');
            this.downloadFile(data);
            this.toastrService.success('File Downloaded Successfully', 'Success!');
        },
       error => {
           console.error('Error saving!');
           return throwError(error);  // Angular 6/RxJS 6
       });
    }
    downloadFile(evt) {
        const blob = new Blob([evt], { type: 'application/octet-stream' });
        // this.toastrService.success('File Downloaded Successfully', 'Success!');
       //    console.log(this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob)), 'sanitizer');
        return this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
    }
    showOnlyHistory() {
        this.showHistory = true;
    }
    submitForm(form) {
        this.onUpload();
        this.articleid = form.articleid;
        // this.item = form.articlename;
        // console.log(this.articleid, this.item, 'form');
    }
    isFieldValid(field: string) {
      //  console.log(field, 'field');
        return !this.rForm.get(field).valid && this.rForm.get(field).touched;
    }
    displayFieldCss(field: string) {
        return {
            'has-error': this.isFieldValid(field),
            'has-feedback': this.isFieldValid(field)
        };
    }
    onSubmit() {
        if (this.rForm.valid) {
            this.onUpload();
            this.router.navigate(['dashboard']);
            console.log('form submitted');
          } else {
            this.validateAllFormFields(this.rForm);
            // validate all form fields
          }
    }

    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
            control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
            this.validateAllFormFields(control);
            }
        });
    }
}
