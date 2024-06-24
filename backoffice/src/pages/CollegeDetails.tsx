import React, { useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { College } from "../types/College";

const CollegeDetails: React.FC = () => {
  const { collegeId } = useParams();

  const [collegeData, setCollegeData] = useState<College>();

  const [showMoreDetails, setShowMoreDetails] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/auth/user/${collegeId}`)
      .then((response: AxiosResponse) => {
        setCollegeData(response.data);
      })
      .catch((error: AxiosError) => {
        alert("Could not get user details!");
        console.log(error);
      });
  });

  const getBackgroundColor = (status: string) => {
    switch (status) {
      case "Under-Review":
        return "bg-yellow-400";
      case "Pending":
        return "bg-red-500";
      case "Completed":
        return "bg-green-400";
      default:
        return "";
    }
  };

  const handleShowMore = () => {
    setShowMoreDetails((prev) => !prev);
  };

  const renderNewsTable = () => {
    if (!collegeData || !collegeData.news || collegeData.news.length === 0) {
      return null;
    }

    return (
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">News</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reference Link
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                News Title
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {collegeData.news.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{item.refLink}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.newsTitle}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderDepartmentsTable = () => {
    if (
      !collegeData ||
      !collegeData.departments ||
      collegeData.departments.length === 0
    ) {
      return null;
    }

    return (
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Departments</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Placement Percentage
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {collegeData.departments.map((dept, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {dept.departmentName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {dept.placementPercentage}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {dept.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderRankingsTable = () => {
    if (
      !collegeData ||
      !collegeData.rankings ||
      collegeData.rankings.length === 0
    ) {
      return null;
    }

    return (
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Rankings</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Year
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Agency Name
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {collegeData.rankings.map((rank, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{rank.year}</td>
                <td className="px-6 py-4 whitespace-nowrap">{rank.rank}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {rank.agencyName}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderCoursesTable = () => {
    if (
      !collegeData ||
      !collegeData.courses ||
      collegeData.courses.length === 0
    ) {
      return null;
    }

    return (
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Courses</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Course Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Course Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Minimum Qualification
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Distance
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {collegeData.courses.map((course, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {course.courseName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {course.courseType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {course.duration}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{course.fee}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {course.minQualification}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {course.distance}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderStudentsTable = () => {
    if (
      !collegeData ||
      !collegeData.students ||
      collegeData.students.length === 0
    ) {
      return null;
    }

    return (
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Students</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Full Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Course
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone Number
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {collegeData.students.map((student, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {student.fullName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{student.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {student.course}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {student.phoneNumber}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="flex h-screen ">
        <Sidebar />
        <div className="w-5/6">
          {collegeData ? (
            <>
              <div className="p-2">
                <h1 className="text-sm">
                  <span className="text-base font-bold">User ID:</span>{" "}
                  {collegeData.userId} /{" "}
                  <span className="text-base font-bold">
                    {collegeData.organizationName}
                  </span>
                </h1>
              </div>

              <div className="flex bg-white shadow-lg rounded-lg overflow-hidden m-4">
                {/* Left Column */}
                <div className="w-1/2 p-6 bg-gray-100">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Created By: {collegeData.fullName}
                  </h2>
                  <p className="text-gray-700">
                    Phone: {collegeData.contactNumber}
                  </p>
                  <p className="text-gray-700">Email: {collegeData.email}</p>
                  <div>
                    <h2 className="font-bold mt-8">Actions</h2>
                    <button className="bg-orange-500 text-white p-2 rounded-lg">
                      {collegeData.isVerified ? "Verified" : "Verify College  "}
                    </button>
                    <button className="bg-orange-500 text-white p-2 rounded-lg ml-2">
                      Activation
                    </button>
                  </div>
                </div>

                {/* Right Column */}
                <div className="w-1/2 p-6">
                  <div className="flex justify-between">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">
                      Basic Details
                    </h1>
                    <button
                      className="w-1/5 bg-blue-500 text-white rounded-lg"
                      onClick={handleShowMore}
                    >
                      {showMoreDetails ? "Show Less" : "Show More"}
                    </button>
                  </div>

                  <div className="mt-4 border-solid border-2">

                    <div className="flex p-2 justify-between items-center">
                      <img
                        src={collegeData.profilePicture}
                        alt="No image uploaded"
                        className="w-1/12  h-auto rounded-full mr-4"
                      />
                      <p className="text-gray-800">
                        {collegeData.organizationName}
                      </p>
                    </div>
                    <hr />

                    <div className="flex p-2 justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold mr-2 text-gray-700">
                        College Name:
                      </h2>
                      <p className="text-gray-800">
                        {collegeData.organizationName}
                      </p>
                    </div>
                    <hr />

                    <div className="flex p-2 justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold mr-2 text-gray-700">
                        Approved by:
                      </h2>
                      <p className="text-gray-800">{collegeData.approvedBy}</p>
                    </div>
                    <hr />

                    <div className="flex p-2 justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold mr-2 text-gray-700">
                        Location:
                      </h2>
                      <p className="text-gray-800">
                        {collegeData.district}, {collegeData.state}
                      </p>
                    </div>
                    <hr />


                    <div className="flex p-2 justify-between items-center mt-2 mb-4">
                      <h2 className="text-lg font-semibold mr-2 text-gray-700">
                        Onboarding Status:
                      </h2>
                      <div
                        className={`px-2 py-1 rounded-full ${getBackgroundColor(
                          collegeData.onboardingStatus
                        )}`}
                      >
                        <p className="text-gray-800">
                          {collegeData.onboardingStatus}
                        </p>
                      </div>
                    </div>
                    <hr />

                    <div className={`flex p-2 justify-between items-center mt-2 mb-4`}>
                      <h2 className="text-lg font-semibold mr-2 text-gray-700">
                        Payment Status:
                      </h2>
                      <div
                        className={`px-2 py-1 rounded-full ${
                          collegeData.paymentStatus
                            ? "bg-green-400"
                            : "bg-red-500"
                        }`}
                      >
                        <p className="text-gray-800">
                          {collegeData.paymentStatus === true
                            ? "Completed"
                            : "Pending"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {showMoreDetails && (
                <div className="m-4">
                  <div>
                    <h1 className="text-xl font-bold mb-2">About College</h1>
                    <p>{collegeData.aboutCollege}</p>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold mb-2">Institute Type</h1>
                    <p>Provided: {collegeData.instituteType}</p>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold mb-2">Payment Details</h1>
                    <p>Order ID: {collegeData.orderId}</p>
                    <p>Payment ID: {collegeData.paymentId}</p>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold mb-2">Gallery Images</h1>
                    <div className="flex flex-wrap">
                      {collegeData.galleryImages.map((image) => (
                        <img src={image} alt="" className="w-1/3 mb-2 mr-2" />
                      ))}
                    </div>
                  </div>
                  {renderNewsTable()}
                  {renderDepartmentsTable()}
                  {renderCoursesTable()}
                  {renderRankingsTable()}
                  {renderStudentsTable()}
                  <div>
                    <h1 className="text-xl font-bold mb-2">Scholarship</h1>
                    <p>Provided: {collegeData.scholarship}</p>
                  </div>
                </div>
              )}
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default CollegeDetails;
