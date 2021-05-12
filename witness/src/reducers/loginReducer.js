import { types } from "../types/types";

export const loginReducer = ( state= {}, action ) => {
  switch (action.type) {
    case types.login:
      return {
        ...state,
        _id: action.payload._id,
        name: action.payload.name,
      }
    case types.logout:
      return {}  
    default:
      return state;
  }
}
