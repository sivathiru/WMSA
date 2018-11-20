import { Wms, WmsUser } from './model/wms.model';

export interface AppState {
  readonly wms: Wms[];
  readonly wmsUser: WmsUser[];
}
