import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import axios from "axios";

interface PaidCourseApplicant {
  userId: string;
  userName: string;
  courseId: string;
  courseName: string;
  paymentId: string;
  orderId: string;
  instructorName: string;
  purchasedAt: string; // Consider using Date type if stored as ISO string
}

function PaidCourseApplicants(): JSX.Element {
  const [applicants, setApplicants] = useState<PaidCourseApplicant[]>([]);
  const [selectedApplicant, setSelectedApplicant] =
    useState<PaidCourseApplicant | null>(null);

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      const response = await axios.get<PaidCourseApplicant[]>(
        "http://localhost:5000/admin/getpaidcourseapplicants"
      );
      setApplicants(response.data);
    } catch (error) {
      console.error("Error fetching paid course applicants:", error);
    }
  };

  const openModal = (applicant: PaidCourseApplicant) => {
    setSelectedApplicant(applicant);
  };

  const closeModal = () => {
    setSelectedApplicant(null);
  };

  return (
    <div>
      <Navbar />
      <div className="flex h-screen">
        <Sidebar />

        <div className="w-5/6">
          <div className="container p-4 py-8">
            <h1 className="text-3xl font-semibold mb-4">Course Admission</h1>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 shadow-md border border-gray-200 rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      User ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Username
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Course ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Course Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Payment ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {applicants.map((applicant, index) => (
                    <tr key={applicant.userId}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {applicant.userId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {applicant.userName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {applicant.courseId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {applicant.courseName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {applicant.paymentId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <button
                          className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded-lg text-sm transition-colors"
                          onClick={() => openModal(applicant)}
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
            {selectedApplicant && (
              <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
                  <h2 className="text-xl font-semibold mb-4">
                    {selectedApplicant.userName}'s Payment Details
                  </h2>
                  <p>User ID: {selectedApplicant.userId}</p>
                  <p>Course ID: {selectedApplicant.courseId}</p>
                  <p>Course Name: {selectedApplicant.courseName}</p>
                  <p>Payment ID: {selectedApplicant.paymentId}</p>
                  <p>Order ID: {selectedApplicant.orderId}</p>
                  <p>Instructor: {selectedApplicant.instructorName}</p>
                  <p>Purchased At: {selectedApplicant.purchasedAt}</p>

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

export default PaidCourseApplicants;
