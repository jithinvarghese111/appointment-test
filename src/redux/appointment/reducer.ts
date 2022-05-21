import { Reducer } from "redux";
import { ActionTypes, AppointmentState } from "./types";

const initialState: AppointmentState = {
  loading: false,
  list: [],
};

export const appointment: Reducer<AppointmentState> = (
  state: AppointmentState = initialState,
  action
) => {
  switch (action.type) {
    case ActionTypes.START:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.STOP:
      return {
        ...state,
        loading: false,
      };
    case ActionTypes.CREATE_APPOINTMENT:
      return {
        ...state,
        list: action.payload,
      };
    default:
      return state;
  }
};
