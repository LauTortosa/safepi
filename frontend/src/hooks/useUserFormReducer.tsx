import { useReducer } from "react";

type FormData = {
    name: string;
    last_name: string;
    birthday: string;
    start_date: string;
    position: string;
    username: string;
    email: string;
    password: string;
    role: string;
};

type Action = 
    | { type: "SET_FIELD"; field: string; value: string }
    | { type: "RESET_FORM" };

const formReducer = (state: FormData, action: Action): FormData => {
    switch (action.type) {
        case "SET_FIELD":
            return { ...state, [action.field]: action.value };
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