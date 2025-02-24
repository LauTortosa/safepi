import { act, useReducer } from "react";

const formReducer = (state, action) => {
    switch (action.type) {
        case "SET_FIELD":
            return { ...state, [action.field]: action.value };
        case "SET_FORM":
            return { ...state, ...action.payload };
        case "RESET_FORM":
            return {
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
        default:
            return state;
    }
};

export const useUserFormReducer = () => {
    return useReducer(formReducer, {
        name: "",
        last_name: "",
        birthday: "",
        start_date: "",
        position: "",
        username: "", 
        email: "", 
        password: "", 
        role: "",
    });
};