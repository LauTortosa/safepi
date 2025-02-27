import { useEffect } from "react";
import api from "../api/axiosConfig";

export const useRiskOptions = () => {
    const probability = [
        { value: "BAJA", label: "Baja" },
        { value: "MEDIA", label: "Media" },
        { value: "ALTA", label: "Alta" },
    ];
    
    const impacts = [
        { value: "BAJO", label: "Bajo" },
        { value: "MEDIO", label: "Medio" },
        { value: "ALTO", label: "Alto" },
    ]; 

    const states = [
        { value: "PENDIENTE", label: "Pendiente" },
        { value: "REVISANDO", label: "Revisando" },
        { value: "SOLUCIONADO", label: "Solucionado" },
        { value: "CERRADO", label: "Cerrado" },
    ]; 

    const locations = [
        { value: "ZONA_1", label: "Zona 1" },
        { value: "ZONA_2", label: "Zona 2" },
        { value: "ZONA_3", label: "Zona 3" },
        { value: "ZONA_4", label: "Zona 4" },
    ];

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

    return { probability, impacts, states, locations };
};