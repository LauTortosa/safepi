import { useReducer } from "react";

const initalState = {
    date: "", 
    workStatus: "",
    doctorNotes: "", 
    nextCheckupDate: "",
    comments: ""
};

const formReducer = (state, action) => {
    switch (action.type) {
        case "SET_FIELD":
            return { ...state, [action.field]: action.value };
        case "SET_FORM":
            return { ...state, ...action.payload };
        case "RESET_FORM":
            return initalState;
        default:
            return state;
    }
};

export const useFollowUpFormReducer = () => {
    return useReducer(formReducer, initalState);
};

export default useFollowUpFormReducer;