import { useEffect, useState } from "react";
import { workEventCategoryLabel, workEventTypeWorkEventLabel } from "../utils/displayLabels";
import api from "../api/axiosConfig";

export const useWorkEventOptions = () => {
    const [categories, setCategories] = useState([]);
    const [typeWorkEvents, setTypeWorkEvents] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("authToken");

        Promise.all([
            api.get("/workEvents/categories", { headers: { Authorization: `Bearer ${token}`} }),
            api.get("/workEvents/typeWorkEvents", { headers: { Authorization: `Bearer ${token}`} }),

        ])
        .then(([catRes, typeRes]) => {
            setCategories(catRes.data.map((cat) => ({ value: cat, label: workEventCategoryLabel[cat] })));
            setTypeWorkEvents(typeRes.data.map((type) => ({ value: type, label: workEventTypeWorkEventLabel[type] })));
        })
        .catch((error) => {
            console.error("Erro al cargar las opciones del select", error);
        });
    }, []);

    return { categories, typeWorkEvents };
};
