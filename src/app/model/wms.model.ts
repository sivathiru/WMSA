export interface Wms {
    ARTID: string;
    ArtComments: null;
    ArtStatus: string;
    Date_Assign: string;
    Date_Complete: string;
    Jcode: string;
    MSPages: string;
    TaskID: number;
    TaskName: string;
    Username: string;
    Workname: string;
}

export class WmsUser {
    UserName: string;
    Password: string;
    // ArtComments: string;
    // ArtStatus: string;
    // Date_Assign: string;
    // Date_Complete: string;
    // Jcode: string;
    // MSPages: string;
    // TaskID: number;
    // TaskName: string;
    // Username: string;
    // Workname: string;
    constructor(UserName?: string, Password?: string) {
    // constructor(UserName?: string, Password?: string, ArtComments?: null, ArtStatus?: string, Date_Assign?: string, Date_Complete?: string, 
    //     Jcode?: string, MSPages?: string, TaskID?: number, TaskName?: string, Username?: string, Workname?: string) {
      this.UserName = UserName;
      this.Password = Password;
    //   this.ArtComments = ArtComments;
    //   this.ArtStatus = ArtStatus;
    //   this.Date_Assign = Date_Assign;
    //   this.Date_Complete = Date_Complete;
    //   this.Jcode = Jcode;
    //   this.MSPages = MSPages;
    //   this.TaskID = TaskID;
    //   this.TaskName = TaskName;
    //   this.Username = Username;
    //   this.Workname = Workname;
    }
}
export interface  UsersWms {
    users: Array<Wms>;
}
