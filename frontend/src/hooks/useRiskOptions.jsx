import { useEffect, useState } from "react";
import api from "../api/axiosConfig";


export const useRiskOptions = () => {
    const [probability, setProbability] = useState([]);
    const [impacts, setImpacts] = useState([]);
    const [states, setStates] = useState([]);
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("authToken");

        Promise.all([
            api.get("/risks/probability", { headers: { Authorization: `Bearer ${token}` } }),
            api.get("/risks/impacts", { headers: { Authorization: `Bearer ${token}` } }),
            api.get("/risks/states", { headers: { Authorization: `Bearer ${token}` } }),
            api.get("/risks/locations", { headers: { Authorization: `Bearer ${token}` } })

        ])
        .then(([probRes, impactRes, stateRes, locationRes]) => {
            setProbability(probRes.data);
            setImpacts(impactRes.data);
            setStates(stateRes.data);
            setLocations(locationRes.data);
        })
        .catch((error) => {
            console.error("Error al cargar las opciones del select", error);
        });
    }, []);

    return {probability, impacts, states, locations}
};