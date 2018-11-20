// Section 1
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Wms, WmsUser } from '../model/wms.model';

// Section 2
export const ADD_WMS       = '[WMS] Add';
export const REMOVE_WMS    = '[WMS] Remove';
export const UPDATE_WMS    = '[WMS] Update';
export const GET_JOURNAL   = '[WMS] Get';
export const STYLE_MANUAL  = '[WMS] Style';
export const LOGIN_USER    = '[WMS] Login';

// Section 3
export class AddWms implements Action {
    readonly type = ADD_WMS;
    constructor(public payload: Wms) {
    }
}

export class RemoveWms implements Action {
    readonly type = REMOVE_WMS;
    constructor(public payload: number) {}
}

export class UpdateWms implements Action {
    readonly type = UPDATE_WMS;
    constructor(public payload: Wms) {
    }
}

export class GetJournal implements Action {
    readonly type = GET_JOURNAL;
    constructor(public payload: Wms) {

    }
}

export class StyleManual implements Action {
    readonly type = STYLE_MANUAL;
    constructor(public payload: Wms) {
    }
}

export class UserLogin implements Action {
    readonly type = LOGIN_USER;
    constructor(public payload: WmsUser) {
    }
}


// Section 4
export type Actions = AddWms | RemoveWms | UpdateWms | GetJournal | StyleManual | UserLogin;
