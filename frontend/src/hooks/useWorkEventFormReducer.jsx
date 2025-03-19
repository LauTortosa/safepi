import { act, useReducer } from "react";

const initialState = {
    category: "",
    date: "",
    description: "",
    typeWorkEvent: "",
    location: "",
    witnesses: "",
    firstAid: "",
    impact: "",
    userId: 0
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

export const useWorkEventFormReducer = () => {
    return useReducer(formReducer, initialState);
};