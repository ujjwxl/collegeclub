import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import axios, { AxiosError, AxiosResponse } from "axios";

interface TableData {
  role: string;
  description: string;
}

interface RolePermissions {
  [key: string]: boolean;
}

const Settings: React.FC = () => {
  const [addUserModal, setAddUserModal] = useState<boolean>(false);
  const [rolesModal, setRolesModal] = useState<boolean>(false);
  const [rolesChangeModal, setRolesChangeModal] = useState<boolean>(false);
  const [editingRole, setEditingRole] = useState<string>(""); // State to track which role is being edited
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [mobileNo, setMobileNo] = useState<string>("");
  const [role, setRole] = useState<string>("");

  const userId = sessionStorage.getItem("id");

  const [userRole, setUserRole] = useState<string>("");
  const [permissions, setPermissions] = useState<{ [key: string]: boolean }>(
    {}
  );

  useEffect(() => {
    const fetchRoleAndPermissions = async () => {
      try {
        const roleResponse = await axios.get(
          `http://localhost:5000/admin/adminrole/${userId}`
        );
        const roleData = roleResponse.data.role;
        setUserRole(roleData);

        const permissionsResponse = await axios.get(
          `http://localhost:5000/admin/getroleperms/${roleData}`
        );
        const permissionsData = permissionsResponse.data;
        setPermissions(permissionsData);
      } catch (error) {
        alert("Could not fetch role and permissions");
        console.error(error);
      }
    };

    fetchRoleAndPermissions();
  }, [userId]);

  const handleAddUser = () => {
    axios
      .post("http://localhost:5000/admin/create", {
        email,
        password,
        name,
        mobileNo,
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
    setName("");
    setMobileNo("");
    setRole("");
  };

  const data: TableData[] = [
    { role: "Super Admin", description: "All perms." },
    { role: "Admin", description: "Selected perms." },
    { role: "Manager", description: "Selected perms." },
    { role: "Executive", description: "Selected perms." },
  ];

  const permissionsList = [
    "Partners",
    "New onboarding",
    "Total leads",
    "Work Request",
    "Course application",
    "New admission",
    "Call request",
    "Events",
    "Message",
    "HR",
    "Courses",
    "Users",
    "Create admin",
  ];

  // const openRoleEditModal = (role: string) => {
  //   console.log(role)

  //   axios.get(`http://localhost:5000/admin/getroleperms/${role}`)
  //   .then((response: AxiosResponse) => {

  //   })

  //   setEditingRole(role);
  //   setSelectedPermissions([]);
  //   setRolesChangeModal(true);
  // };

  const openRoleEditModal = (role: string) => {
    setEditingRole(role);

    axios
      .get(`http://localhost:5000/admin/getroleperms/${role}`)
      .then((response: AxiosResponse<{ [key: string]: boolean }>) => {
        const permissions = Object.keys(response.data).filter(
          (permission) => response.data[permission]
        );
        setSelectedPermissions(permissions);
        setRolesChangeModal(true);
      })
      .catch((error: AxiosError) => {
        console.error("Error fetching role permissions: ", error);
        alert("Failed to fetch role permissions");
      });
  };

  // const saveRolePermissions = () => {
  //   // Implement save logic here
  //   setRolesChangeModal(false);
  // };

  // const saveRolePermissions = () => {
  //   const permissionsToSend: RolePermissions = selectedPermissions.reduce(
  //     (acc, permission) => {
  //       acc[permission] = true;
  //       return acc;
  //     },
  //     {} as RolePermissions
  //   );

  //   console.log(permissionsToSend)

  //   axios
  //     .post(`http://localhost:5000/admin/saveroleperms/${editingRole}`, {
  //       permissions: permissionsToSend,
  //     })
  //     .then((response) => {
  //       alert("Role permissions saved successfully!");
  //       setRolesChangeModal(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error saving role permissions: ", error);
  //       alert("Failed to save role permissions");
  //     });
  // };

  const saveRolePermissions = () => {
    const permissionsToSend: RolePermissions = {};

    // Initialize all permissions to false
    permissionsList.forEach((permission) => {
      permissionsToSend[permission] = false;
    });

    // Set selected permissions to true
    selectedPermissions.forEach((permission) => {
      permissionsToSend[permission] = true;
    });

    console.log(permissionsToSend);

    axios
      .post(`http://localhost:5000/admin/saveroleperms/${editingRole}`, {
        permissions: permissionsToSend,
      })
      .then((response) => {
        alert("Role permissions saved successfully!");
        setRolesChangeModal(false);
      })
      .catch((error) => {
        console.error("Error saving role permissions: ", error);
        alert("Failed to save role permissions");
      });
  };

  return (
    <>
      <Navbar />
      <div className="flex h-screen">
        <Sidebar />
        <div className="w-5/6">
          <h1 className="font-bold text-3xl mx-4">Settings</h1>
          <div className="flex w-full justify-around">
            {permissions["Create admin"] && (
              <div
                className="w-1/5 bg-slate-500 mt-4 p-12 text-center rounded-xl"
                onClick={() => setRolesModal(true)}
              >
                <p className="text-xl text-white">Roles and Permissions</p>
              </div>
            )}

            {permissions["Create admin"] && (
              <div
                className="w-1/5 bg-slate-500 mt-4 p-12 text-center rounded-xl"
                onClick={() => setAddUserModal(true)}
              >
                <p className="text-xl text-white">Add User</p>
              </div>
            )}

            <div className="w-1/5 bg-slate-500 mt-4 p-12 text-center rounded-xl">
              <p className="text-xl text-white">FAQs</p>
            </div>
          </div>

          {addUserModal && (
            // <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            
            <div className="bg-white m-4 p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Add User</h2>
              <form>
              <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="mt-1 block w-full border-gray-300 p-2 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="mobileNo" className="block text-sm font-medium text-gray-700">Mobile Number</label>
                  <input
                    type="text"
                    id="mobileNo"
                    className="mt-1 block w-full border-gray-300 p-2 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    value={mobileNo}
                    onChange={(e) => setMobileNo(e.target.value)}
                    required
                  />
                </div>
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
                    className="w-1/4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                  >
                    Create
                  </button>
                  <button
                    type="button"
                    onClick={() => setAddUserModal(false)}
                    className="w-1/4 mt-4 ml-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
            // </div>
          )}

          {rolesModal && (
            <div className="overflow-x-auto m-4">
              <table className="table-auto min-w-full bg-white border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-200">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          className="px-3 py-1 text-xs bg-blue-500 text-white rounded-md"
                          onClick={() =>
                            openRoleEditModal(item.role.toLocaleLowerCase())
                          }
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Roles Change Modal */}
          {rolesChangeModal && (
            <div className="fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
                <h2 className="text-2xl font-bold mb-4">
                  Edit Permissions for {editingRole}
                </h2>
                <form>
                  {permissionsList.map((permission, index) => (
                    <div key={index} className="mb-2">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          value={permission}
                          checked={selectedPermissions.includes(permission)}
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            setSelectedPermissions((prev) => {
                              if (isChecked) {
                                return [...prev, permission];
                              } else {
                                return prev.filter(
                                  (item) => item !== permission
                                );
                              }
                            });
                          }}
                          className="form-checkbox"
                        />
                        <span className="ml-2">{permission}</span>
                      </label>
                    </div>
                  ))}
                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={saveRolePermissions}
                      className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setRolesChangeModal(false)}
                      className="ml-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                    >
                      Cancel
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
