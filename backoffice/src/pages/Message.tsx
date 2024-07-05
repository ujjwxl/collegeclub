import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

const Feedbacks = () => {
    const [feedbacks, setFeedbacks] = useState<any[]>([]);
    const [feedbackType, setFeedbackType] = useState<string>('');
    const [selectedFeedback, setSelectedFeedback] = useState<any | null>(null);
    const [action, setAction] = useState<string>(''); // State to manage selected action
    const [showModal, setShowModal] = useState(false);

    const getFeedbacks = async (type: string) => {
        try {
            const response = await axios.get(`http://localhost:5000/admin/feedbacks/${type}`);
            setFeedbacks(response.data);
            setFeedbackType(type);
        } catch (error) {
            alert('Could not get feedbacks');
            console.error(error);
        }
    };

    const openModal = (feedback: any) => {
        setSelectedFeedback(feedback);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedFeedback(null);
        setShowModal(false);
    };

    const handleActionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setAction(event.target.value);
    };

    const saveFeedbackStatus = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/admin/updateFeedback/${selectedFeedback.feedbackId}`, {
                status: action
            });
            const updatedFeedbacks = feedbacks.map(feedback => {
                if (feedback.id === selectedFeedback.id) {
                    return { ...feedback, status: action };
                }
                return feedback;
            });

            setFeedbacks(updatedFeedbacks);
            console.log('Feedback status updated:', response.data.message);
            closeModal();
            window.location.reload();
        } catch (error: any) {
            console.error('Error updating feedback status:', error.message);
            alert('Failed to update feedback status');
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex h-screen">
                <Sidebar />
                <div className="w-5/6">
                    <div className="flex w-full justify-around">
                        <div
                            className="w-1/5 bg-slate-500 mt-4 p-12 text-center rounded-xl"
                            onClick={() => getFeedbacks('feedback')}
                        >
                            <p className="text-xl text-white">Feedback</p>
                        </div>

                        <div
                            className="w-1/5 bg-slate-500 mt-4 p-12 text-center rounded-xl"
                            onClick={() => getFeedbacks('complain')}
                        >
                            <p className="text-xl text-white">Complain</p>
                        </div>

                        <div
                            className="w-1/5 bg-slate-500 mt-4 p-12 text-center rounded-xl"
                            onClick={() => getFeedbacks('others')}
                        >
                            <p className="text-xl text-white">Others</p>
                        </div>
                    </div>

                    {feedbacks && feedbacks.length > 0 ? (
                        <div className="m-4">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                            S.No.
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                            Message
                                        </th>
                                        {feedbackType === 'complain' && (
                                            <>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                                    Details
                                                </th>
                                            </>
                                        )}
                                    </tr>
                                </thead>
                                <tbody className="bg-gray-100 divide-y divide-gray-200">
                                    {feedbacks.map((feedback, index) => (
                                        <tr key={feedback.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{index + 1}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{feedback.name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{feedback.email}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900 break-words">{feedback.message}</div>
                                            </td>
                                            {feedbackType === 'complain' && (
                                                <>
                                                    <td className="px-6 py-4">
                                                        {feedback.status === 'Open' && (
                                                            <p className="bg-green-600 px-3 py-1 text-sm rounded-full text-white text-center">
                                                                {feedback.status}
                                                            </p>
                                                        )}
                                                        {feedback.status === 'Review' && (
                                                            <p className="bg-yellow-500 px-3 py-1 text-sm rounded-full text-white text-center">
                                                                {feedback.status}
                                                            </p>
                                                        )}
                                                        {feedback.status === 'Done' && (
                                                            <p className="bg-red-600 px-3 py-1 text-sm rounded-full text-white text-center">
                                                                {feedback.status}
                                                            </p>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <button
                                                            className="bg-gray-500 px-2 py-1 text-sm rounded-lg text-white"
                                                            onClick={() => openModal(feedback)}
                                                        >
                                                            View more
                                                        </button>
                                                    </td>
                                                </>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p>No feedbacks available</p>
                    )}

                    {showModal && selectedFeedback && (
                        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
                            <div className="bg-white p-8 rounded-lg max-w-md w-full">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg font-medium">Complain Details</h2>
                                    <button className="text-gray-500 hover:text-gray-800" onClick={closeModal}>
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <p><strong>Name:</strong> {selectedFeedback.name}</p>
                                <p><strong>Email:</strong> {selectedFeedback.email}</p>
                                <p><strong>Mobile No:</strong> {selectedFeedback.mobileNumber}</p>
                                <p><strong>Message:</strong> {selectedFeedback.message}</p>
                                {feedbackType === 'complain' && (
                                    <div className="mt-4">
                                        <label className="block mb-1">Select Action:</label>
                                        <select
                                            className="px-3 py-2 border rounded"
                                            value={action}
                                            onChange={handleActionChange}
                                        >
                                            <option value="Open">Open</option>
                                            <option value="Review">Reviewing</option>
                                            <option value="Done">Done</option>
                                        </select>
                                    </div>
                                )}
                                <div className="mt-6 flex justify-end">
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
                                        onClick={saveFeedbackStatus}
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

export default Feedbacks;
