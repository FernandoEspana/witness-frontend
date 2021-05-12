import { types } from "../types/types";

export const loginAction = (_id, name ) => ({
  type: types.login,
  payload: {
    _id,
    name,
  }
})