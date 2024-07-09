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
import { Ambassador } from "../types/Ambassador";

const AmbassadorDetails: React.FC = () => {

    const { ambassadorId } = useParams<{ ambassadorId: string }>();

    const [ambassadorData, setAmbassadorData] = useState<Ambassador>();
  
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
      try {
        const response = await axios.put(
          `http://localhost:5000/admin/updateonboardingstatus/${ambassadorData?.userId}`,
          {
            status,
            message,
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
        .get(`http://localhost:5000/auth/user/${ambassadorId}`)
        .then((response: AxiosResponse) => {
            setAmbassadorData(response.data);
        })
        .catch((error: AxiosError) => {
          alert("Could not get ambassador details!");
          console.log(error);
        });
    }, [ambassadorId]);
  
    const handleVerifyCompany = (ambassadorId: string) => {
      axios
        .put(`http://localhost:5000/admin/verifycollege/${ambassadorId}`)
        .then((response: AxiosResponse) => {
          if (response.status === 200) {
            setVerifyModalOpen(false);
            alert("Ambassador verified");
          }
        })
        .catch((error: AxiosError) => {
          alert("Ambassador could not be verified");
          console.log(error);
        });
    };
  
    const handleShowMore = () => {
      setShowMoreDetails((prev) => !prev);
    };
  

  return (
    <>
      <Navbar />
      <div className="flex h-screen">
        <Sidebar />
        <div className="w-5/6">
          {ambassadorData ? (
            <>
              <div className="p-2">
                <h1 className="text-sm">
                  <span className="text-base font-bold">User ID:</span>{" "}
                  {ambassadorData.userId} /{" "}
                  <span className="text-base font-bold">
                    {ambassadorData.fullName}
                  </span>
                </h1>
              </div>

              <div className="flex bg-white shadow-lg rounded-lg overflow-hidden m-4">
                {/* Left Column */}
                <div className="w-1/2 p-6 bg-gray-100">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Created By: {ambassadorData.fullName}
                  </h2>
                  <p className="text-gray-700">
                    Phone: {ambassadorData.contactNumber}
                  </p>
                  <p className="text-gray-700">Email: {ambassadorData.email}</p>
                  <div>
                    <h2 className="font-bold mt-8">Actions</h2>
                    <button
                      className="bg-orange-500 text-white p-2 rounded-lg"
                      onClick={handleClickOpen}
                    >
                      {ambassadorData.isVerified ? "Verified" : "Verify Company"}
                    </button>

                    <button
                      className="bg-orange-500 ml-2 text-white p-2 rounded-lg"
                      onClick={openModal}
                    >
                      Activation
                    </button>
                    <Link to={`/ambassador/edit/${ambassadorId}`}>
                      <button className="bg-orange-500 ml-2 text-white p-2 rounded-lg">
                        Edit
                      </button>
                    </Link>
                  </div>

                  <Dialog
                    open={verifyModalOpen}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Are you sure you want to verify this company?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Are you sure you want to verify this user?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Disagree</Button>
                      <Button
                        onClick={() => handleVerifyCompany(ambassadorData?.userId)}
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
                        src={ambassadorData.profilePicture}
                        alt="No image uploaded"
                        className="w-1/12 h-auto rounded-full mr-4"
                      />
                      <p className="text-gray-800">
                        {ambassadorData.organizationName}
                      </p>
                    </div>
                    <hr />

                    <div className="flex p-2 justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold mr-2 text-gray-700">
                        Company Name:
                      </h2>
                      <p className="text-gray-800">
                        {ambassadorData.organizationName}
                      </p>
                    </div>
                    <hr />

                    <div className="flex p-2 justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold mr-2 text-gray-700">
                        Founded Year:
                      </h2>
                      {/* <p className="text-gray-800">{ambassadorData.foundedYear}</p> */}
                    </div>
                    <hr />

                    <div className="flex p-2 justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold mr-2 text-gray-700">
                        Location:
                      </h2>
                      <p className="text-gray-800">
                        {ambassadorData.district}, {ambassadorData.state}
                      </p>
                    </div>
                    <hr />

                    <div className="flex p-2 justify-between items-center mt-2 mb-4">
                      <h2 className="text-lg font-semibold mr-2 text-gray-700">
                        Onboarding Status:
                      </h2>
                      <div
                        className={`px-2 py-1 rounded-full ${getBackgroundColor(
                            ambassadorData.onboardingStatus
                        )}`}
                      >
                        <p className="text-gray-800">
                          {ambassadorData.onboardingStatus}
                        </p>
                      </div>
                    </div>
                    <hr />

                    <div className="flex p-2 justify-between items-center mt-2 mb-4">
                      <h2 className="text-lg font-semibold mr-2 text-gray-700">
                        Payment Status:
                      </h2>
                      <div
                        className={`px-2 py-1 rounded-full ${
                            ambassadorData.paymentStatus
                            ? "bg-green-400"
                            : "bg-red-500"
                        }`}
                      >
                        <p className="text-gray-800">
                          {ambassadorData.paymentStatus === true
                            ? "Completed"
                            : "Pending"}
                        </p>
                      </div>
                    </div>
                    <hr />
                  </div>
                </div>
              </div>
              {showMoreDetails && (
                <div className="m-4">
                  <div>
                    <h1 className="text-xl font-bold mb-2">About Ambassador</h1>
                    {/* <p>{companyData.aboutCompany}</p> */}
                  </div>
                  
                  <div>
                    <h1 className="text-xl font-bold mb-2">Payment Details</h1>
                    <p>Order ID: {ambassadorData.orderId}</p>
                    <p>Payment ID: {ambassadorData.paymentId}</p>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold mb-2">Gallery Images</h1>
                    <div className="flex flex-wrap">
                      {ambassadorData.galleryImages.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt=""
                          className="w-1/3 mb-2 mr-2"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <p>Loading company details...</p>
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
                  <strong>Name:</strong> {ambassadorData?.organizationName}
                </p>
                <p>
                  <strong>Email:</strong> {ambassadorData?.email}
                </p>
                <p>
                  <strong>Mobile No:</strong> {ambassadorData?.contactNumber}
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

export default AmbassadorDetails;

function getBackgroundColor(status: string) {
    switch (status) {
      case "UNDER_REVIEW":
        return "bg-yellow-400";
      case "PENDING":
        return "bg-red-400";
      case "COMPLETED":
        return "bg-green-400";
      default:
        return "bg-gray-300";
    }
  }
  