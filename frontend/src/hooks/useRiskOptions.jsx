import { useEffect, useState } from "react";
import api from "../api/axiosConfig";


export const useRiskOptions = () => {
    const [probability, setProbability] = useState([]);
    const [impacts, setImpacts] = useState([]);
    const [states, setStates] = useState([]);
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("authToken");

        api.get("/risks/probability", { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
            setProbability(response.data);
        })
        .catch((error) => {
            console.error("Error al cargar las opciones del select probability", error);
        });

        api.get("/risks/impacts", { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
            setImpacts(response.data);
        })
        .catch((error) => {
            console.error("Error al cargar las opciones del select impact", error);
        })

        api.get("/risks/states", { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
            setStates(response.data);
        })
        .catch((error) => {
            console.error("Error al cargar las opciones del select state", error)
        })

        api.get("/risks/locations", { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
            setLocations(response.data);
        })
        .catch((error) => {
            console.error("Error al cargar las opciones del select location", error)
        })
    });

    return {probability, impacts, states, locations}
};