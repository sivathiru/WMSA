import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

// const httpOptions = {
//     headers: new HttpHeaders({ 'Content-Type': 'application/docx' })
// };
@Injectable()
export class DashDataService {
constructor(private _http: HttpClient) {}
public userDashData(getLocalUser) {
    return forkJoin(
          this._http.get(`http://eproof.hurix.com/hope_webapi/GetListbyUser/${getLocalUser}`)
    );
 }
 public userGetStyleData(styleid) {
    return forkJoin(
        this._http.get(`http://eproof.hurix.com/hope_webapi/GetFile/QUhQKyMrODA3MjExKyMrQ29weWVkaXRpbmc=`)
        // this._http.get(`http://eproof.hurix.com/hope_webapi/GetFile/${styleid}`)
    );
 }
 public userDownloadData(styleid) {
     console.log(styleid, 'styleid');
     const headers = new HttpHeaders();
     // headers.append('Content-Type', 'application/octet-stream');
     // headers = headers.append('Accept', 'application/json');
     return this._http.get(`http://eproof.hurix.com/hope_webapi/GetFile/${styleid}`, { headers: headers, responseType: 'blob' as 'json' });
   // return this._http.get(`http://eproof.hurix.com/hope_webapi/GetFile/${styleid}`);
        // this._http.get(`http://eproof.hurix.com/hope_webapi/GetFile/${styleid}`)
 //   );
 }

 public userRefernceData(styleid) {
    console.log(styleid, 'styleid');
    const headers = new HttpHeaders();
    // headers.append('Content-Type', 'application/octet-stream');
    // headers = headers.append('Accept', 'application/json');
    return this._http.get(`http://eproof.hurix.com/hope_webapi/GetReference/${styleid}`, { headers: headers, responseType: 'blob' as 'json' });
  // return this._http.get(`http://eproof.hurix.com/hope_webapi/GetFile/${styleid}`);
       // this._http.get(`http://eproof.hurix.com/hope_webapi/GetFile/${styleid}`)
//   );
}
public userStyleManualData(styleid) {
    console.log(styleid, 'styleid');
    const headers = new HttpHeaders();
    // headers.append('Content-Type', 'application/octet-stream');
    // headers = headers.append('Accept', 'application/json');
    return this._http.get(`http://eproof.hurix.com/hope_webapi/GetStyle/${styleid}`, { headers: headers, responseType: 'blob' as 'json' });
  // return this._http.get(`http://eproof.hurix.com/hope_webapi/GetFile/${styleid}`);
       // this._http.get(`http://eproof.hurix.com/hope_webapi/GetFile/${styleid}`)
//   );
}
public userPassDashData(taskId) {
    return forkJoin(
          this._http.get(`http://eproof.hurix.com/hope_webapi/GetListbyTaskid/${taskId}`)
    );
 }
}
