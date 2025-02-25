import { useReducer } from "react";

const initialState = {
    date: "",
    location: "",
    description: "",
    probability: "",
    impact: "",
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

export const useRiskFormReducer = () => {
    return useReducer(formReducer, initialState);
};