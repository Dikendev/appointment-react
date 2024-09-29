import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../../context/global-context";
import { user1 } from "../../context/mock-data";
import EventContext from "../../components/context/event-context";

const FormAddNewEvent = () => {
  const { setEvents, closeModal } = useContext(GlobalContext);
  const { selectedDay, selectedHour } = useContext(EventContext);

  const [formData, setFormData] = useState({
    cliente: "",
    day: selectedDay,
    startHour: selectedHour,
    service: "",
    endHour: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("Preencha todos os campos");
      return;
    }

    setEvents((prev) => [...prev, { user: user1, color: "blue", ...formData }]);
    console.log("success", formData);
    closeModal(false);
  };

  const validateForm = () => {
    return (
      formData.cliente !== "" &&
      formData.day !== "" &&
      formData.startHour !== "" &&
      formData.endHour !== "" &&
      formData.service !== ""
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      closeModal(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
        <div className="w-full flex justify-end text-red-600 font-bold">
          <span
            className="cursor-pointer"
            onClick={() => {
              closeModal(false);
            }}
          >
            x
          </span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="cliente"
            >
              Cliente
            </label>
            <input
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              type="text"
              name="cliente"
              id="cliente"
              value={formData.cliente}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="day"
              className="block text-sm font-medium text-gray-700"
            >
              Dia
            </label>
            <input
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              type="text"
              name="day"
              id="day"
              value={formData.day}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="startHour"
              className="block text-sm font-medium text-gray-700"
            >
              Hora de inicio
            </label>
            <input
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              type="text"
              name="startHour"
              id="startHour"
              value={formData.startHour}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="endHour"
              className="block text-sm font-medium text-gray-700"
            >
              Hora de fim
            </label>
            <input
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              type="text"
              name="endHour"
              id="endHour"
              value={formData.endHour}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="service"
              className="block text-sm font-medium text-gray-700"
            >
              Serviço
            </label>
            <input
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              type="text"
              name="service"
              id="service"
              value={formData.service}
              onChange={handleChange}
            />
          </div>

          <button
            className="w-full py-2 px-4 bg-indigo-600 text-white font-bold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            type="submit"
          >
            Adicionar
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormAddNewEvent;
