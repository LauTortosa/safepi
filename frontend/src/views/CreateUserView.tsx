import NavbarComponent from "../components/NavbarComponent";
import SidebarComponent from "../components/SidebarComponent";
import InputComponent from "../components/InputComponent";
import SelectComponent from "../components/SelectComponent";

import api from "../api/axiosConfig";
import { useState, useEffect } from "react";

const CreateUserView: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    birthday: "",
    start_date: "",
    position: "",
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const [positions, setPositions] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [isUserCreated, setIsUserCreated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    api
      .get("/users/positions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPositions(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar opciones del select position", error);
      });

    api
      .get("/users/roles", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setRoles(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar opciones del select role", error);
      });
  }, []);

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");

    api
      .post("/users", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const token = response.data.token;
        if (token) {
          localStorage.setItem("authToken", token);
        }

        setIsUserCreated(true);

        setFormData({
          name: "",
          last_name: "",
          birthday: "",
          start_date: "",
          position: "",
          username: "",
          email: "",
          password: "",
          role: "",
        });
      })
      .catch((error) => {
        console.error("Error al crear el usuario", error);
      });
  };

  return (
    <div>
      <NavbarComponent />
      <div className="min-h-screen max-w-auto bg-gray-100 flex flex-col pt-16">
        <h1 className="text-3xl font-semibold text-center mb-6 pt-16 text-blue-900 w-full">
          CREAR USUARIO
        </h1>

        <div className="flex ">
          <SidebarComponent />
          <form
            onSubmit={handleSubmit}
            className="flex-1 flex justify-center px-6"
          >
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
              <div>
                <InputComponent
                  label="Nombre"
                  type="text"
                  value={formData.name}
                  id="name"
                  name="name"
                  onChange={onInputChange}
                  placeholder="Nombre"
                />
                <InputComponent
                  label="Apellidos"
                  type="text"
                  value={formData.last_name}
                  id="last_name"
                  name="last_name"
                  onChange={onInputChange}
                  placeholder="Apellidos"
                />
                <InputComponent
                  label="Fecha de nacimiento"
                  type="date"
                  value={formData.birthday}
                  id="birthday"
                  name="birthday"
                  onChange={onInputChange}
                  placeholder=""
                />
                <InputComponent
                  label="Fecha de antigüedad laboral"
                  type="date"
                  value={formData.start_date}
                  id="start_date"
                  name="start_date"
                  onChange={onInputChange}
                  placeholder=""
                />
                <SelectComponent
                  span="Posición laboral"
                  name="position"
                  value={formData.position}
                  onChange={onInputChange}
                  options={positions}
                />
                <InputComponent
                  label="Nombre de usuario"
                  type="text"
                  value={formData.username}
                  id="username"
                  name="username"
                  onChange={onInputChange}
                  placeholder="Nombre de usuario"
                />
                <InputComponent
                  label="Email"
                  type="email"
                  value={formData.email}
                  id="email"
                  name="email"
                  onChange={onInputChange}
                  placeholder="Email"
                />
                <InputComponent
                  label="Contraseña"
                  type="password"
                  value={formData.password}
                  id="password"
                  name="password"
                  onChange={onInputChange}
                  placeholder="Contraseña"
                />
                <SelectComponent
                  span="Rol de usuario"
                  name="role"
                  value={formData.role}
                  onChange={onInputChange}
                  options={roles}
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="mt-8 btn bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-all"
                >
                  Crear usuario
                </button>
              </div>

              {isUserCreated && (
                <dialog id="my_modal_1" className="modal" open>
                  <div className="modal-overlay bg-gray-900 opacity-50" />
                  <div className="modal-box bg-gray-100 text-gray-800 rounded-lg p-6 shadow-lg">
                    <h3 className="font-bold text-lg text-blue-900">
                      Usuario creado!
                    </h3>
                    <p className="py-4 text-gray-500">
                      El usuario ha sido creado correctamente.
                    </p>
                    <div className="modal-action">
                      <button
                        className="btn bg-blue-500 hover:bg-blue-700 text-white"
                        onClick={() =>
                          (
                            document.getElementById(
                              "my_modal_1"
                            ) as HTMLDialogElement
                          )?.close()
                        }
                      >
                        Cerrar
                      </button>
                    </div>
                  </div>
                </dialog>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUserView;
