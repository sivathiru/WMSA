import { Action } from '@ngrx/store';
import { Wms, WmsUser } from '../model/wms.model';
import * as WmsActions from '../actions/wms.action';

// Section 1
// const initialState: Wms = {
//     ARTID: '',
//     ArtComments: null,
//     ArtStatus: '',
//     Date_Assign: '',
//     Date_Complete: '',
//     Jcode: '',
//     MSPages: '',
//     TaskID: null,
//     TaskName: '',
//     Username: '',
//     Workname: ''
// };
const initialState: WmsUser = {
      UserName: 'Krupa',
      Password: '',
    //   ArtComments: '',
    //   ArtStatus: '',
    //   Date_Assign: '',
    //   Date_Complete: '',
    //   Jcode: '',
    //   MSPages: '',
    //   TaskID: 5875,
    //   TaskName: '',
    //   Username: '',
    //   Workname: ''
};



// Section 2
export function reducer(state: Wms[] = [], action: WmsActions.Actions) {

    // Section 3
    switch (action.type) {
        case WmsActions.ADD_WMS:
       // console.log("action.payload sf");
            return [...state, action.payload];
        case WmsActions.UPDATE_WMS:
       // console.log("action.payload sf");
             return [...state, action.payload];
        case WmsActions.STYLE_MANUAL:
             return [...state, action.payload];
        default:
       // console.log("sf");
            return state;
    }
}
export function reducerOne(state: WmsUser[] = [initialState], action: WmsActions.Actions) {
    // Section 3
    switch (action.type) {
        case WmsActions.LOGIN_USER:
             return [...state, action.payload];
        default:
       // console.log("sf");
            return state;
    }
}
