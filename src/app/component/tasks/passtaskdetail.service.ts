import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { Observable ,  throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';

@Injectable()
export class PassTaskDetailService {
    referenceJournalData;
constructor(private _http: Http, private store: Store<AppState>) {}
public passJournalDetail(journal) {
    console.log(journal, "journal");
    this.referenceJournalData = journal;
}
/**
 * specialInstruction service
 */
public specialInstruction() {
    return this._http.get(`file:///D:/WMS/wms/src/app/model/sampledata.json`).pipe(map(data => {})).subscribe(result => {
        console.log(result);
      });
}
}

