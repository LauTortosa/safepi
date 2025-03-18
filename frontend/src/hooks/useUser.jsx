import { useEffect, useState } from "react"

export const useUser = (userId, token) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        api.get(`/users/${userId}`, { headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => {
            setUser(response.data);
        })
        .catch((error) => {
            console.error("Error al obtener usuario", error);
        }) 
    }, [userId, token]);

    return { user };
};

export default useUser;