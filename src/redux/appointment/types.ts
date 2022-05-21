export interface AppointmentState {
  loading: boolean;
  list: any;
}

export enum ActionTypes {
  START = "LOADER_START",
  STOP = "LOADER_STOP",
  CREATE_APPOINTMENT = "CREATE_APPOINTMENT",
}

export interface ListType {
  start: string;
  end: string;
  capacity: number;
}
