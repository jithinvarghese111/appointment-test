import { combineReducers } from "redux";
import { appointment } from "./appointment/reducer";

const rootReducer = combineReducers({
  appointment: appointment,
});

export default rootReducer;
