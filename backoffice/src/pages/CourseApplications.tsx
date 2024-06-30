import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import axios, { AxiosError, AxiosResponse } from "axios";

interface CourseApplication {
  applicantId: string;
  courseId: string;
  courseName: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  // Add more fields as needed
}

function Users(): JSX.Element {
  const [applications, setApplications] = useState<CourseApplication[]>([]);
  const [selectedApplication, setSelectedApplication] =
    useState<CourseApplication | null>(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axios.get<CourseApplication[]>(
        "http://localhost:5000/admin/getcourseapplications"
      );
      setApplications(response.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  const openModal = (application: CourseApplication) => {
    setSelectedApplication(application);
    // Logic to open modal
  };

  const closeModal = () => {
    setSelectedApplication(null);
    // Logic to close modal
  };

  return (
    <div>
      <Navbar />
      <div className="flex h-screen">
        <Sidebar />

        <div className="w-5/6">
          <div className="container p-4 py-8">
            <h1 className="text-3xl font-semibold mb-4">Course Applications</h1>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 shadow-md border border-gray-200 rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Course
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {applications.map((app, index) => (
                    <tr key={app.applicantId}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {app.fullName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {app.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {app.phoneNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {app.courseName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <button
                          className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded-lg text-sm transition-colors"
                          onClick={() => openModal(app)}
                        >
                          View more
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Modal */}
            {selectedApplication && (
              <div className="fixed inset-0 flex items-center justify-center z-10">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
                  <h2 className="text-xl font-semibold mb-4">
                    {selectedApplication.fullName}'s Application Details
                  </h2>
                  {/* Render all details here */}
                  <p>Email: {selectedApplication.email}</p>
                  <p>Phone: {selectedApplication.phoneNumber}</p>
                  {/* Add more details as per your application structure */}

                  <button
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg mt-4"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
