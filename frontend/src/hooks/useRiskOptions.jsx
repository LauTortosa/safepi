import { useEffect, useState } from "react";
import { riskImpactLabel, riskLocationLabel, riskProbabilityLabel, riskStateLabel } from "../utils/displayLabels";
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
            setProbability(probRes.data.map((prob) => ({ value: prob, label: riskProbabilityLabel[prob] })));
            setImpacts(impactRes.data.map((impact) => ({ value: impact, label: riskImpactLabel[impact] })));
            setStates(stateRes.data.map((state) => ({ value: state, label: riskStateLabel[state] })));
            setLocations(locationRes.data.map((location) => ({ value: location, label: riskLocationLabel[location] })));
        })
        .catch((error) => {
            console.error("Error al cargar las opciones del select", error);
        });
    }, []);

    return { probability, impacts, states, locations };
};