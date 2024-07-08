import React, { useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { College } from "../types/College";

const CollegeDetails: React.FC = () => {
  const { collegeId } = useParams();

  const [collegeData, setCollegeData] = useState<College>();

  const [showMoreDetails, setShowMoreDetails] = useState<boolean>(false);

  const [verifyModalOpen, setVerifyModalOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setVerifyModalOpen(true);
  };

  const handleClose = () => {
    setVerifyModalOpen(false);
  };

  const [message, setMessage] = useState<string>("");
  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const [showModal, setShowModal] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");

  const handleActionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const saveStatus = async () => {

    console.log(status)
    console.log(message)
    try {
      const response = await axios.put(
        `http://localhost:5000/admin/updateonboardingstatus/${collegeData?.userId}`,
        {
          status,
          message
        }
      );
      alert("Status updated");
      console.log("Onboarding status updated:", response.data.message);
      closeModal();
    } catch (error: any) {
      console.error("Error updating feedback status:", error.message);
      alert("Failed to update feedback status");
    }
  };

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
  },[]);
  
  console.log(collegeData);

  const handleVerifyCollege = (collegeId: string) => {
    axios
      .put(`http://localhost:5000/admin/verifycollege/${collegeId}`)
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          setVerifyModalOpen(false);
          alert("College verified and listed on the platform");
        }
      })
      .catch((error: AxiosError) => {
        alert("College could not be verified");
        console.log(error);
      });
  };

  const getBackgroundColor = (status: string) => {
    switch (status) {
      case "UNDER_REVIEW":
        return "bg-yellow-400";
      case "PENDING":
        return "bg-red-500";
      case "COMPLETED":
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
                    <button
                      className="bg-orange-500 text-white p-2 rounded-lg"
                      onClick={handleClickOpen}
                    >
                      {collegeData.isVerified ? "Verified" : "Verify College  "}
                    </button>

                    <button
                      className="bg-orange-500 ml-2 text-white p-2 rounded-lg"
                      onClick={openModal}
                    >
                      Activation
                    </button>
                    <Link to={`/college/edit/${collegeId}`}>
                      <button className="bg-orange-500 ml-2 text-white p-2 rounded-lg">
                        Edit
                      </button>
                    </Link>

                    {/* <button className="bg-orange-500 text-white p-2 rounded-lg ml-2">
                      Activation
                    </button> */}
                  </div>

                  <Dialog
                    open={verifyModalOpen}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Are you sure you want to verify this college?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Verifying college will make list this college on the
                        CollegeClub platform. Make sure you have verified all
                        the college details.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Disagree</Button>
                      <Button
                        onClick={() => handleVerifyCollege(collegeData?.userId)}
                        autoFocus
                      >
                        Agree
                      </Button>
                    </DialogActions>
                  </Dialog>
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

                    <div
                      className={`flex p-2 justify-between items-center mt-2 mb-4`}
                    >
                      <h2 className="text-lg font-semibold mr-2 text-gray-700">
                        Payment Status:
                      </h2>
                      <div
                        className={`px-2 py-1 rounded-full ${collegeData.paymentStatus
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

          {showModal && (
            <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
              <div className="bg-white p-8 rounded-lg max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium">Onboading Status</h2>
                  <button
                    className="text-gray-500 hover:text-gray-800"
                    onClick={closeModal}
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <p>
                  <strong>Name:</strong> {collegeData?.organizationName}
                </p>
                <p>
                  <strong>Email:</strong> {collegeData?.email}
                </p>
                <p>
                  <strong>Mobile No:</strong> {collegeData?.contactNumber}
                </p>

                <div className="mt-4">
                  <label className="block mb-1">Select Action:</label>
                  <select
                    className="px-3 py-2 border rounded"
                    value={status}
                    onChange={handleActionChange}
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="UNDER_REVIEW">UNDER_REVIEW</option>
                    <option value="COMPLETED">COMPLETED</option>
                  </select>

                  <label className="block mb-1">Message:</label>
                  <input
                    type="text"
                    value={message}
                    onChange={handleMessageChange}
                    required
                    className="w-5/6 px-3 py-2 border rounded"
                  />
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
                    onClick={saveStatus}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CollegeDetails;
