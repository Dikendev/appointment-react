import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../../context/global/global-context";
import BookingContext from "../../context/booking-context";
import { DateUtils } from "../../utils/date-utils";

const FormAddNewEvent = () => {
  const { setBookings, closeModal } = useContext(GlobalContext);
  const { selectedHour, procedures, availableHours } =
    useContext(BookingContext);

  const [formData, setFormData] = useState({
    client: { name: "" },
    startAt: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      Number(selectedHour.split(":")[0]),
      Number(selectedHour.split(":")[1])
    ),
    finishAt: "Select",
    procedure: "",
    total: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("Preencha todos os campos");
      return;
    }

    createBooking(e);

    // setBookings([formData]);
    console.log("success", formData);
    closeModal(false);
  };

  const createBooking = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("createBooking", formData);
  };

  const validateForm = () => {
    return formData.client.name !== "" && formData.finishAt !== null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const dateEndChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOnProcedureSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOnNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    console.log("name", name);
    console.log("value", value);

    setFormData({
      ...formData,
      [name]: { name: value },
    });
  };

  // const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;

  //   setFormData({
  //     ...formData,
  //     [name]: new Date(value),
  //   });
  // };

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
              htmlFor="client"
            >
              Client
            </label>
            <input
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              type="text"
              name="client"
              id="client"
              value={formData.client.name}
              onChange={handleOnNameChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="startAt"
              className="block text-sm font-medium text-gray-700"
            >
              Hora de inicio
            </label>
            <input
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              type="text"
              name="startAt"
              id="startAt"
              value={DateUtils.dateAndHour(formData.startAt)}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="finishAt"
              className="block text-sm font-medium text-gray-700"
            >
              Hora de fim
            </label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              name="finishAt"
              id="finishAt"
              value={formData.finishAt}
              onChange={dateEndChange}
            >
              {availableHours.map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="procedure"
              className="block text-sm font-medium text-gray-700"
            >
              Procedure
            </label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              name="procedure"
              id="procedure"
              value={formData.procedure}
              onChange={handleOnProcedureSelect}
            >
              {procedures.map((procedure) => (
                <option key={procedure.name} value={procedure.id}>
                  {procedure.name} - {procedure.price} reais
                </option>
              ))}
            </select>
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
