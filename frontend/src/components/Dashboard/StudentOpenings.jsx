import React, { useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import './CreateJob.css';

const StudentOpenings = () => {

    return (
        <div className="dashboard-box create-job-box">
            <div className="dashboard-box-container create-job-container">
                <h3>There are no openings to show at the moment!</h3>
            </div>
        </div>
    )
}

export default StudentOpenings;
