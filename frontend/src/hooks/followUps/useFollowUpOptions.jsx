import { useEffect, useState } from "react";
import api from "../../api/axiosConfig";

import { followUpWorkStatusLabel } from "../../utils/displayLabels";

export const useFollowUpOptions = () => {
    const [workStatus, setWorkStatus] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("authToken");

        api.get("/followUps/workStatus", { headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => {
            setWorkStatus(response.data.map((work) => ({ 
                value: work, 
                label: followUpWorkStatusLabel[work]
            })));
        })
        .catch((error) => {
            console.error("Error al cargas las opciones del select", error);
        });
    }, []);
    
    return { workStatus };
};

export default useFollowUpOptions;