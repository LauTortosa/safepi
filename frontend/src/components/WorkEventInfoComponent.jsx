const WorkEventInfoView = ({ workEvent }) => {
    return (
        <div className="p-6 w-full">
            <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-blue-500 max-w-7xl mx-auto">
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                    {workEvent.name} {workEvent.last_name}
                </h2>
                <div className="grid grid-cols-2 gap-4">
                    <p><strong>📅 Fecha:</strong> {workEvent.date}</p>
                    <p><strong>📂 Categoría:</strong> {workEvent.category}</p>
                    <p><strong>📌 Tipo:</strong> {workEvent.typeWorkEvent}</p>
                    <p><strong>⚠️ Impacto:</strong> {workEvent.impact}</p>
                    <p><strong>📝 Descripción:</strong> {workEvent.description}</p>
                    <p><strong>📍 Ubicación:</strong> {workEvent.location}</p>
                    <p><strong>👀 Testigos:</strong> {workEvent.witnesses || "No especificado"}</p>
                    <p><strong>⛑️ Primeros auxilios:</strong> {workEvent.firstAid || "No aplicado"}</p>
                </div>
            </div>
        </div>
    );
};

export default WorkEventInfoView;
