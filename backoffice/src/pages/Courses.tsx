import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import axios, { AxiosError, AxiosResponse } from "axios";

interface CourseFormData {
  courseName: string;
  instructorName: string;
  price: string;
  briefDescription: string;
  rating: string;
  category: string;
  courseDuration: string;
  courseLevel: string;
  language: string;
  detailedDescription: string;
  aboutInstructor: string;
  whatYouWillLearn: string[];
}

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<CourseFormData[]>([]);
  const [selectedTab, setSelectedTab] = useState<"all" | "add">("all");
  const [formData, setFormData] = useState<CourseFormData>({
    courseName: "",
    instructorName: "",
    price: "",
    briefDescription: "",
    rating: "",
    category: "",
    courseDuration: "",
    courseLevel: "",
    language: "",
    detailedDescription: "",
    aboutInstructor: "",
    whatYouWillLearn: [""],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseFormData | null>(
    null
  );

  // Function to open modal and set selected course
  const handleViewMore = (course: CourseFormData) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleTabChange = (tab: "all" | "add") => {
    setSelectedTab(tab);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleWhatYouWillLearnChange = (index: number, value: string) => {
    const newWhatYouWillLearn = [...formData.whatYouWillLearn];
    newWhatYouWillLearn[index] = value;
    setFormData({
      ...formData,
      whatYouWillLearn: newWhatYouWillLearn,
    });
  };

  const handleAddMore = () => {
    setFormData({
      ...formData,
      whatYouWillLearn: [...formData.whatYouWillLearn, ""],
    });
  };

  const handleRemove = (index: number) => {
    const newWhatYouWillLearn = [...formData.whatYouWillLearn];
    newWhatYouWillLearn.splice(index, 1);
    setFormData({
      ...formData,
      whatYouWillLearn: newWhatYouWillLearn,
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/getcccourses")
      .then((response: AxiosResponse) => {
        setCourses(response.data);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(formData.category);

    axios
      .post("http://localhost:5000/admin/addcourse", formData)
      .then((response) => {
        console.log(response.data);
        setFormData({
          courseName: "",
          instructorName: "",
          price: "",
          briefDescription: "",
          rating: "",
          category: "",
          courseDuration: "",
          courseLevel: "",
          language: "",
          detailedDescription: "",
          aboutInstructor: "",
          whatYouWillLearn: [""],
        });
      })
      .catch((error) => {
        console.error("Error adding course:", error);
      });
  };

  return (
    <>
      <Navbar />
      <div className="flex h-screen">
        <Sidebar />
        <div className="w-5/6 p-4">
          <div className="flex justify-around mb-8">
            <div
              className={`w-1/3 bg-slate-500 mt-4 p-4 text-center rounded-xl cursor-pointer transition-colors duration-300 ${
                selectedTab === "all"
                  ? "bg-blue-500 text-white"
                  : "bg-slate-500 text-gray-200 hover:bg-gray-700"
              }`}
              onClick={() => handleTabChange("all")}
            >
              <p className="text-xl">All Courses</p>
            </div>

            <div
              className={`w-1/3 bg-slate-500 mt-4 p-4 text-center rounded-xl cursor-pointer transition-colors duration-300 ${
                selectedTab === "add"
                  ? "bg-blue-500 text-white"
                  : "bg-slate-500 text-gray-200 hover:bg-gray-700"
              }`}
              onClick={() => handleTabChange("add")}
            >
              <p className="text-xl">Add Course</p>
            </div>
          </div>

          <div>
            {selectedTab === "all" && (
              <div>
                <h1 className="text-3xl mb-6 font-semibold text-gray-800">
                  All Courses
                </h1>
                <table className="min-w-full divide-y divide-gray-200 shadow-md border border-gray-200 rounded-lg">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Course Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Instructor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Rating
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {courses.map((course, index) => (
                      <tr
                        key={index}
                        className="transition-all hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {course.courseName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {course.instructorName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {course.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {course.rating}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <button
                            className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded-lg text-sm transition-colors"
                            onClick={() => handleViewMore(course)}
                          >
                            View more
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Display list of all courses added */}
              </div>
            )}
            {selectedTab === "add" && (
              <form
                className="w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                onSubmit={handleSubmit}
              >
                <div className="mb-4">
                  <h2 className="text-2xl font-bold mb-4">Add Course</h2>
                </div>

                {/* Course Name and Instructor Name */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label
                      htmlFor="courseName"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Course Name*
                    </label>
                    <input
                      type="text"
                      id="courseName"
                      name="courseName"
                      placeholder="Enter course name"
                      value={formData.courseName}
                      onChange={handleInputChange}
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="instructorName"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Instructor Name*
                    </label>
                    <input
                      type="text"
                      id="instructorName"
                      name="instructorName"
                      placeholder="Enter instructor name"
                      value={formData.instructorName}
                      onChange={handleInputChange}
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                </div>

                {/* Price and Brief Description */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label
                      htmlFor="price"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Price*
                    </label>
                    <input
                      type="text"
                      id="price"
                      name="price"
                      placeholder="Enter price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="category"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Category*
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="">Select a category</option>
                      <option value="Programming">Programming</option>
                      <option value="Soft Skills">Soft Skills</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="briefDescription"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Brief Description*
                    </label>
                    <input
                      type="text"
                      id="briefDescription"
                      name="briefDescription"
                      placeholder="Enter brief description"
                      value={formData.briefDescription}
                      onChange={handleInputChange}
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                </div>

                {/* Rating and Course Duration */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label
                      htmlFor="rating"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Rating*
                    </label>
                    <input
                      type="number"
                      id="rating"
                      name="rating"
                      placeholder="Enter rating"
                      value={formData.rating}
                      onChange={handleInputChange}
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="courseDuration"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Course Duration*
                    </label>
                    <input
                      type="text"
                      id="courseDuration"
                      name="courseDuration"
                      placeholder="Enter course duration"
                      value={formData.courseDuration}
                      onChange={handleInputChange}
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                </div>

                {/* Course Level and Language */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label
                      htmlFor="courseLevel"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Course Level*
                    </label>
                    <input
                      type="text"
                      id="courseLevel"
                      name="courseLevel"
                      placeholder="Enter course level"
                      value={formData.courseLevel}
                      onChange={handleInputChange}
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="language"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Language*
                    </label>
                    <input
                      type="text"
                      id="language"
                      name="language"
                      placeholder="Enter language"
                      value={formData.language}
                      onChange={handleInputChange}
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                </div>

                {/* What You Will Learn */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    What You Will Learn*
                  </label>
                  {formData.whatYouWillLearn.map((item, index) => (
                    <div key={index} className="flex mb-2">
                      <input
                        type="text"
                        placeholder="Enter what you will learn"
                        value={item}
                        onChange={(e) =>
                          handleWhatYouWillLearnChange(index, e.target.value)
                        }
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      {index > 0 && (
                        <button
                          type="button"
                          className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          onClick={() => handleRemove(index)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleAddMore}
                  >
                    Add More
                  </button>
                </div>

                {/* Detailed Description and About Instructor */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="mb-4 col-span-2">
                    <label
                      htmlFor="detailedDescription"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Detailed Description*
                    </label>
                    <textarea
                      id="detailedDescription"
                      name="detailedDescription"
                      placeholder="Enter detailed description"
                      value={formData.detailedDescription}
                      onChange={handleInputChange}
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 resize-none"
                    />
                  </div>

                  <div className="mb-4 col-span-2">
                    <label
                      htmlFor="aboutInstructor"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      About Instructor*
                    </label>
                    <textarea
                      id="aboutInstructor"
                      name="aboutInstructor"
                      placeholder="Enter about instructor"
                      value={formData.aboutInstructor}
                      onChange={handleInputChange}
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 resize-none"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="mb-6">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Add Course
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      {isModalOpen && selectedCourse && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
          <div className="bg-white w-2/3 h-5/6 p-8 rounded-lg z-50 max-w-lg overflow-y-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">
                {selectedCourse.courseName}
              </h2>
              <p className="text-gray-600 mb-2">
                {selectedCourse.instructorName}
              </p>
              <p className="text-gray-600 mb-2">
                Rating: {selectedCourse.rating}
              </p>
              <p className="text-gray-600 mb-2">
                Price: {selectedCourse.price}
              </p>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">About this course</h3>
              <p className="text-gray-800 mb-2">
                {selectedCourse.briefDescription}
              </p>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">Detailed Description</h3>
              <p className="text-gray-800 mb-2">
                {selectedCourse.detailedDescription}
              </p>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">About the Instructor</h3>
              <p className="text-gray-800 mb-2">
                {selectedCourse.aboutInstructor}
              </p>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">What You Will Learn</h3>
              <ul className="list-disc list-inside text-gray-800">
                {selectedCourse.whatYouWillLearn.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="flex justify-end">
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Courses;
