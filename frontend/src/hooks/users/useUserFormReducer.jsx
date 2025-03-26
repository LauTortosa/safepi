import { useReducer } from "react";

const initialState = {
    name: "",
    last_name: "",
    birthday: "",
    start_date: "",
    position: "",
    username: "", 
    email: "", 
    password: "", 
    role: "",
};

const formReducer = (state, action) => {
    switch (action.type) {
        case "SET_FIELD":
            return { ...state, [action.field]: action.value };
        case "SET_FORM":
            return { ...state, ...action.payload };
        case "RESET_FORM":
            return initialState;
        default:
            return state;
    }
};

export const useUserFormReducer = () => {
    return useReducer(formReducer, initialState);
};

export default useUserFormReducer;