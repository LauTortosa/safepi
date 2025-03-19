import ContentBoxComponent from "../components/ContentBoxComponent";
import { useAuthUser } from "../hooks/useAuthUser";
import { useUserFormReducer } from "../hooks/useUserFormReducer";

const WorkEventCreateView = () => {
    const [formData, dispatch] = useUserFormReducer();
    const { token, userRole } = useAuthUser();

    const formFields = [
        { label: "Categoria", type: "select", name: "category", options: categories },

    ];
    return (
        <ContentBoxComponent
            title={"AÑADIR INCIDENTE/ACCIDENTE"}
            userRole={userRole}
            sidebarOptions={[
                { path: "/list-workevents", label: "Lista de Incidentes/Accidentes"},
                { path: "/create-workevent", label: "Añadir Incidente/Accidente"},
            ]}
        >


        </ContentBoxComponent>
    );
};

export default WorkEventCreateView;