import { SET_USER_DATA } from "../types";

const initialState = {
  userData: "",
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        userData: action.data,
      };
    default:
      return state;
  }
};
