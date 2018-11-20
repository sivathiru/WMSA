import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable()
export class UploadFileService {
  constructor(private http: HttpClient) {}
  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const apiBaseURL = 'http://eproof.hurix.com/hope_webapi/UploadFiles/';
    let apiCreateEndpoint = `${apiBaseURL}SE1FKyMrNzk1Nzk1KyMrQ29weWVkaXRpbmc=`;

    const formdata: FormData = new FormData();
    formdata.append('file', file, file.name);
    console.log(formdata, 'formdata');
    const req = new HttpRequest('POST', apiCreateEndpoint, formdata, {
      reportProgress: true,
      responseType: 'text'
    }
    );
    return this.http.request(req);
  }
}
