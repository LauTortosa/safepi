import NavbarComponent from "../components/NavbarComponent";
import SidebarComponent from "../components/SidebarComponent";

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
          role: ""
        })
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
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Nombre</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={onInputChange}
                    placeholder="Nombre"
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Apellidos</span>
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={onInputChange}
                    placeholder="Apellidos"
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Fecha de nacimiento</span>
                  </label>
                  <input
                    type="date"
                    id="birthday"
                    name="birthday"
                    value={formData.birthday}
                    onChange={onInputChange}
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">
                      Fecha de antiguedad laboral
                    </span>
                  </label>
                  <input
                    type="date"
                    id="start_date"
                    name="start_date"
                    value={formData.start_date}
                    onChange={onInputChange}
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Posición laboral</span>
                  </label>
                  <select
                    name="position"
                    value={formData.position}
                    onChange={onInputChange}
                    className="select select-bordered"
                  >
                    <option value="" disabled>
                      Selecciona una opción
                    </option>
                    {positions.map((position, index) => (
                      <option key={index} value={position}>
                        {position}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Nombre de usuario</span>
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={onInputChange}
                    placeholder="Usuario"
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={onInputChange}
                    placeholder="Email"
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Contraseña</span>
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={onInputChange}
                    placeholder="Contraseña"
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Rol de usuario</span>
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={onInputChange}
                    className="select select-bordered"
                  >
                    <option value="" disabled>
                      Selecciona una opción
                    </option>
                    {roles.map((role, index) => (
                      <option key={index} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>
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
