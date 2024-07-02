import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";

interface Event {
  id: number;
  message: string;
  date: string;
  targets: string[];
}

const Users = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [view, setView] = useState<"all" | "add">("all");
  const [formData, setFormData] = useState({
    message: "",
    date: "",
    targets: [] as string[],
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admin/getevents");
        setEvents(response.data);

      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();

  }, []);

  const handleCheckboxChange = (target: string) => {
    const currentTargets = [...formData.targets];
    const index = currentTargets.indexOf(target);
    if (index === -1) {
      currentTargets.push(target);
    } else {
      currentTargets.splice(index, 1);
    }
    setFormData({
      ...formData,
      targets: currentTargets,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newEvent: Event = {
      id: 1,
      message: formData.message,
      date: formData.date,
      targets: formData.targets,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/admin/createevent",
        newEvent
      );

      console.log("Event created:", response.data);

      setEvents([...events, newEvent]);

      setFormData({
        message: "",
        date: "",
        targets: [],
      });

      alert('Event created successfully');

      setView("all");
    } catch (error) {
      alert("Event could not be created");
      console.error("Error creating event:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex h-screen">
        <Sidebar />
        <div className="w-5/6 p-4">
          <div className="p-4">
            {/* <div className="flex justify-around mb-4">
              <button
                className={`bg-blue-500 text-white px-4 py-2 rounded-lg focus:outline-none focus:shadow-outline ${view === "all" ? "bg-blue-700" : ""
                  }`}
                onClick={() => setView("all")}
              >
                All Events
              </button>
              <button
                className={`bg-blue-500 text-white px-4 py-2 rounded-lg focus:outline-none focus:shadow-outline ${view === "add" ? "bg-blue-700" : ""
                  }`}
                onClick={() => setView("add")}
              >
                Add an Event
              </button>
            </div> */}

            <div className="flex justify-around mb-8">
              <div
                className={`w-1/3 bg-slate-500 mt-4 p-4 text-center rounded-xl cursor-pointer transition-colors duration-300 ${view === 'all' ? 'bg-blue-500 text-white' : 'bg-slate-500 text-gray-200 hover:bg-gray-700'}`}
                onClick={() => setView("all")}
              >
                <p className="text-xl">All Events</p>
              </div>

              <div
                className={`w-1/3 bg-slate-500 mt-4 p-4 text-center rounded-xl cursor-pointer transition-colors duration-300 ${view === 'add' ? 'bg-blue-500 text-white' : 'bg-slate-500 text-gray-200 hover:bg-gray-700'}`}
                onClick={() => setView("add")}
              >
                <p className="text-xl">Add Events</p>
              </div>
            </div>

            {view === "all" && (
              <div>
                <h2 className="text-xl font-bold mb-2">All Events</h2>
                <table className="min-w-full divide-y divide-gray-200 shadow-md border border-gray-200 rounded-lg">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Message
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Targets
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {events.map((event) => (
                      <tr key={event.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {event.message}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {event.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {event.targets.join(", ")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {view === "add" && (
              <form
                className="w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                onSubmit={handleSubmit}
              >
                <h2 className="text-xl font-bold mb-2">Add an Event</h2>

                <div className="mb-4">
                  <label
                    htmlFor="message"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Message
                  </label>
                  <input
                    type="text"
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter message"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="date"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Targets
                  </label>
                  <div className="flex flex-wrap">
                    <label className="mr-4">
                      <input
                        type="checkbox"
                        name="targets"
                        value="College"
                        checked={formData.targets.includes("College")}
                        onChange={() => handleCheckboxChange("College")}
                        className="mr-1"
                      />
                      College
                    </label>
                    <label className="mr-4">
                      <input
                        type="checkbox"
                        name="targets"
                        value="Company"
                        checked={formData.targets.includes("Company")}
                        onChange={() => handleCheckboxChange("Company")}
                        className="mr-1"
                      />
                      Company
                    </label>
                    <label className="mr-4">
                      <input
                        type="checkbox"
                        name="targets"
                        value="CC-Ambassador"
                        checked={formData.targets.includes("CC-Ambassador")}
                        onChange={() => handleCheckboxChange("CC-Ambassador")}
                        className="mr-1"
                      />
                      CC Ambassador
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="targets"
                        value="Student"
                        checked={formData.targets.includes("Student")}
                        onChange={() => handleCheckboxChange("Student")}
                        className="mr-1"
                      />
                      Student
                    </label>
                  </div>
                </div>

                <div className="mb-6">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Create Event
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
