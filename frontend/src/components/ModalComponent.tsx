
interface ModalComponentProps {
    isUserCreated: boolean;
    title: string;
    content: string;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ isUserCreated, title, content }) => {
  return (
    <div>
      {isUserCreated} && (
        <dialog id="my_modal_1" className="modal" open>
          <div className="modal-overlay bg-gray-900 opacity-50" />
          <div className="modal-box bg-gray-100 text-gray-800 rounded-lg p-6 shadow-lg">
            <h3 className="font-bold text-lg text-blue-900">{title}</h3>
            <p className="py-4 text-gray-500">{content}</p>
            <div className="modal-action">
              <button
                className="btn bg-blue-500 hover:bg-blue-700 text-white"
                onClick={() =>
                  (
                    document.getElementById("my_modal_1") as HTMLDialogElement
                  )?.close()
                }
              >
                Cerrar
              </button>
            </div>
          </div>
        </dialog>
      )
    </div>
  );
};

export default ModalComponent;
