import React, { useState, useEffect } from 'react';
import axios from 'axios';
import profileImage from '../../assets/profile-placeholder-image.jpg';
import { format, render, cancel, register } from 'timeago.js';
import './Notification.css';

const Notifications = () => {

    const [notifications, setNotifications] = useState([]);

    const userId = localStorage.getItem('id');

    useEffect(() => {
        const fetchUserData = async () => {
            if (!userId) {
                return;
            }

            try {
                const response = await axios.get(
                    `http://localhost:5000/auth/user/${userId}`
                );
                setNotifications(response.data.notifications.reverse());
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className="dashboard-box create-job-box">
            <div className="dashboard-box-container create-job-container">
                <h2>Notifications</h2>
                {notifications.map((notification) => (
                    <div className='notification-container'>
                        <p>{notification.content}</p>
                        <p>{format(notification.date)}</p>
                    </div>
                ))}
            </div>
        </div>
    );

};

export default Notifications;
