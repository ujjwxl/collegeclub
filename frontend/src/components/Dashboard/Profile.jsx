import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import './Profile.css'

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedNumber, setEditedNumber] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("id");
      if (!userId) return;

      try {
        const response = await axios.get(
          `http://localhost:5000/auth/user/${userId}`
        );
        setUserData(response.data);
        setEditedName(response.data.fullName);
        setEditedNumber(response.data.contactNumber);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };

  const handleNumberChange = (e) => {
    const newValue = e.target.value.replace(/\D/g, '');
    setEditedNumber(newValue);  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("id");
    console.log(userId);

    try {
      await axios.post(`http://localhost:5000/auth/updateprofile/${userId}`, {
        fullName: editedName,
        contactNumber: editedNumber,
      });

      await axios.post(`http://localhost:5000/auth/changepassword/${userId}`, {
        newPassword: newPassword
      });

      const response = await axios.get(
        `http://localhost:5000/auth/user/${userId}`
      );
      setUserData(response.data);
      setNewPassword("");

      toast("Profile updated successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast("Failed to update profile. Please try again later.");
    }
  };

  return (
    <div className="dashboard-box">
      <form onSubmit={handleSubmit}>
        <div className="profile-box-container">
          <h2>Profile Information</h2>
          {userData && (
            <>
              <div className="form-input-flex-two">
                <div className="form-input-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    value={editedName}
                    onChange={handleNameChange}
                  />
                </div>
                <div className="form-input-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    value={userData.email}
                    readOnly
                    style={{ color: "grey" }}
                  />
                </div>
              </div>
              <div className="form-input-flex-two">
                <div className="form-input-group">
                  <label htmlFor="number">Mobile Number</label>
                  <input
                    type="text"
                    value={editedNumber}
                    onChange={handleNumberChange}
                    pattern="[0-9]*"
                    maxLength={10}
                  />
                </div>
              </div>
              <hr />
              <h2>Update Password</h2>
              <div className="form-input-flex-two">
              <div className="form-input-group">
                  <label htmlFor="newPassword">Old Password</label>
                  <input
                    type="password"
                  />
                </div>
                <div className="form-input-group">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
              </div>
                
            </>
          )}
          <div className="form-input-flex-two">
            <button type="submit" className="form-submit-button">Save Changes</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
