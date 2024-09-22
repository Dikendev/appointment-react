import { useCallback, useEffect, useMemo, useState } from "react";
import { createSwapy } from "swapy";

const DEFAULT = {
  "1": "a",
  "3": "c",
  "4": "d",
  "2": null,
};

export const HomePage = () => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState("");

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const appointments = [
    {
      name: "Haircut",
      date: "2021-06-01",
      time: "10:00",
    },
  ];

  const appointments2 = [
    {
      name: "Haircut 2",
      date: "2021-06-01",
      time: "10:00",
    },
  ];

  const appointments3 = [
    {
      name: "Haircut 3",
      date: "2021-06-01",
      time: "10:00",
    },
  ];

  const clients = [
    {
      name: "John Doe",
      age: 25,
      appointments: appointments,
    },
    {
      name: "Jane Doe",
      age: 20,
      appointments: appointments2,
    },
    {
      name: "John Doe 2",
      age: 30,
      appointments: appointments3,
    },
  ];

  const clients2 = [
    {
      name: "John Doe",
      age: 25,
      appointments: appointments,
    },
    {
      name: "Jane Doe",
      age: 20,
      appointments: appointments2,
    },
  ];

  const handleMouseDown = (e: any, index: string) => {
    // console.log("handleMouseDown", index);
    console.log("slot", index);
    setSelectedSlot(index);
  };

  const handleMouseUp = (e: any, index: string) => {
    // console.log("handleMouseUp", index);

    console.log("slot", index);
    setSelectedSlot("");
  };

  const handleOptions = (event: any, data: any) => {
    console.log("handleOptions EXECUTING");
    setIsModalOpen((prev) => !prev);
    newDAta(data);
  };

  const newDAta = useCallback(
    (data) => {
      if (selectedBooking === data.name) {
        console.log("Selected booking is the same, not updating.");
        return;
      }
      console.log("USEMEMO", data);
      setSelectedBooking(data.name);
    },
    [selectedBooking]
  );

  useEffect(() => {
    console.log("useEffect");
    const container = document.querySelector(".container");
    const swapy = createSwapy(container, {
      animation: "none",
    });

    swapy.onSwap(({ data }) => {
      console.log("onSwap", data);
    });

    return () => {
      swapy.destroy();
    };
  }, []);

  return (
    <>
      <table className="container">
        <thead className="table_header">
          <tr>
            <th>Hora</th>
            <th>Dia 1</th>
            <th>Dia 2</th>
          </tr>
        </thead>
        <tbody className="table_new">
          {clients.map((client: any, index: any) => (
            <tr key={client.name}>
              <td>8:00</td>
              <td className={`slot ${index}`} data-swapy-slot={index}>
                <div className={`item ${index}`} data-swapy-item={index}>
                  <div
                    className={selectedSlot === client.name ? "selected" : ""}
                    onMouseDown={(e) => handleMouseDown(e, client.name)}
                    onMouseUp={(e) => handleMouseUp(e, client.name)}
                  >
                    {client.name} - {client.appointments[0].name} -{" "}
                    <button onClick={(event) => handleOptions(event, client)}>
                      options
                    </button>
                  </div>
                </div>
              </td>
              <td className={`slot ${index + 20}`} data-swapy-slot={index + 20}>
                <div
                  className={`item ${index + 20}`}
                  data-swapy-item={index + 20}
                >
                  <div
                    className={selectedSlot === client.name ? "selected" : ""}
                    onMouseDown={(e) => handleMouseDown(e, client.name)}
                    onMouseUp={(e) => handleMouseUp(e, client.name)}
                  >
                    {client.name} - {client.appointments[0].name} -{" "}
                    <button onClick={(event) => handleOptions(event, client)}>
                      options
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <div>
          {" "}
          <span>Usuário:{selectedBooking} </span>
          <br />
          <span> X - delete {} O - Edit</span>
        </div>
      )}
    </>
  );
};
