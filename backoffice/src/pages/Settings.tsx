import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import axios, { AxiosError, AxiosResponse } from "axios";

const Settings: React.FC = () => {
  const [addUserModal, setAddUserModal] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");

  const handleAddUser = () => {
    axios
      .post("http://localhost:5000/admin/create", {
        email,
        password,
        role,
      })
      .then((response: AxiosResponse) => {
        alert("Admin created successfully!");
      })
      .catch((error: AxiosError) => {
        console.log(error);
        alert("Could not create admin");
      });

    // Reset form and close modal
    setEmail("");
    setPassword("");
    setRole("");
  };

  return (
    <>
      <Navbar />
      <div className="flex h-screen">
        <Sidebar />
        <div className="w-5/6">
          <h1 className="font-bold text-3xl mx-4">Settings</h1>
          <div className="flex w-full justify-around">
            <div className="w-1/5 bg-slate-500 mt-4 p-12 text-center rounded-xl">
              <p className="text-xl text-white">Roles and Permissions</p>
            </div>

            <div
              className="w-1/5 bg-slate-500 mt-4 p-12 text-center rounded-xl"
              onClick={() => setAddUserModal(true)}
            >
              <p className="text-xl text-white">Add User</p>
            </div>

            <div className="w-1/5 bg-slate-500 mt-4 p-12 text-center rounded-xl">
              <p className="text-xl text-white">FAQs</p>
            </div>
          </div>

          {addUserModal && (
            <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Add User</h2>
                <form>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="mt-1 block w-full border-gray-300 p-2 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="mt-1 block w-full border-gray-300 p-2 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <fieldset>
                      <legend className="block text-sm font-medium text-gray-700">
                        Role
                      </legend>
                      <div className="mt-1 space-x-4">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            value="super admin"
                            checked={role === "super admin"}
                            onChange={() => setRole("super admin")}
                            className="form-radio"
                          />
                          <span className="ml-2">Super Admin</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            value="admin"
                            checked={role === "admin"}
                            onChange={() => setRole("admin")}
                            className="form-radio"
                          />
                          <span className="ml-2">Admin</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            value="manager"
                            checked={role === "manager"}
                            onChange={() => setRole("manager")}
                            className="form-radio"
                          />
                          <span className="ml-2">Manager</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            value="executive"
                            checked={role === "executive"}
                            onChange={() => setRole("executive")}
                            className="form-radio"
                          />
                          <span className="ml-2">Executive</span>
                        </label>
                      </div>
                    </fieldset>
                  </div>
                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={handleAddUser}
                      className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                      Create
                    </button>
                    <button
                      type="button"
                      onClick={()=> setAddUserModal(false)}
                      className="w-full mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Settings;
