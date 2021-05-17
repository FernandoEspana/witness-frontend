import axios from 'axios';
import { types } from '../types/types';
import  Swal  from 'sweetalert2';

export const loginEmailPassword = (email, password, history ) => {
  return async (dispatch) => {
    try {
      const  { data: witness }  = await axios({
        method: 'POST',
        baseURL: 'http://localhost:8000',
        url: '/witness/login',
        data: {
          email,
          password,
        }
      });
      history.push('/home');
      dispatch(login(witness._id, witness.name)); 
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Fallo de Autenticación',
        text: `${error}`,
      });
    }
  }
}

export const login = (_id, name) => {
  return {
    type:types.login,
    payload: {
      _id,
      name
    }
  }
}

export const logout = () => {
  return {type: types.logout}
}