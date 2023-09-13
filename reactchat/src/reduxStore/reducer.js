import { userDataType, userRegistartion } from "./action";

const initialData = {
  usersData: [],
  isLoading: false,
  isError: false,
};

const initialRegsistration = {
  userRegister: [],
  isLoading: false,
  isError: false,
};

export const reducer = (state = initialData, action) => {
  switch (action.type) {
    case userDataType.LOAD:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case userDataType.LOADED:
      return {
        ...state,
        usersData: action.usersData,
        isLoading: false,
      };
    default:
      return state;
  }
};

export const reducerRegister = (state = initialRegsistration, action) => {
  switch (action.type) {
    case userRegistartion.LOAD:
      return {
        ...state,
        isLoading: true,
      };
    case userRegistartion.LOADED:
      return {
        ...state,
        userRegister: action.userRegister,
        isLoading: false,
      };
    default:
      return state;
  }
};
