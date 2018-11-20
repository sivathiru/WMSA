import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable ,  throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthenticationService {
constructor(private _http: Http, private router: Router, private toastrService: ToastrService,) {}
public authenticateUser(userEncodedData) {
    return this._http.get(`http://eproof.hurix.com/hope_webapi/authenticateuser/${userEncodedData}`)
    .pipe(map((Response: any) => Response.json()), catchError(error => this.onError(error)));
 }
 onError(res: Response) {
  this.toastrService.error('Username and Password does not match', 'Error!');
  // alert('Username and Password does not match');
  this.router.navigate(['login']);
   console.log(res, 'sd');
    const statusCode = res.status;
    const body = res.json();
    console.log(statusCode, body, 'status');
    const error = {
      statusCode: statusCode,
      error: body
    };
    return throwError(error);
  }
}

