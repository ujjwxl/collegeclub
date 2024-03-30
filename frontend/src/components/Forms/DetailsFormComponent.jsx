import React from 'react'
import { useState } from 'react';
import './DetailsFormComponent.css'

const DetailsFormComponent = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const courses = ['Engineering', 'Medical', 'Management', 'Sciences', 'Agriculture', 'Law', 'Acting'];

    const [coursesCount, setCoursesCount] = useState(1);
    const [departmentsCount, setDepartmentsCount] = useState(1);
    const [newsCount, setNewsCount] = useState(1);
    const [rankingCount, setRankingCount] = useState(1);

    const handleAddCourse = () => {
        setCoursesCount(coursesCount + 1);
    };

    const handleRemoveCourse = () => {
        setCoursesCount(coursesCount - 1);
    }

    const handleAddDepartment = () => {
        setDepartmentsCount(departmentsCount + 1);
    }

    const handleRemoveDepartment = () => {
        setDepartmentsCount(departmentsCount - 1);
    }

    const handleAddNews = () => {
        setNewsCount(newsCount + 1);
    }

    const handleRemoveNews = () => {
        setNewsCount(newsCount - 1);
    }

    const handleAddRanking = () => {
        setRankingCount(rankingCount + 1);
    }

    const handleRemoveRanking = () => {
        setRankingCount(rankingCount - 1);
    }

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleCourseSelect = (course) => {
        if (!selectedCourses.includes(course)) {
            setSelectedCourses([...selectedCourses, course]);
        }
    };

    const handleCourseRemove = (course) => {
        setSelectedCourses(selectedCourses.filter((c) => c !== course));
    };

    const handleClick = () => {
        console.log(selectedCourses)
    }

    return (
        <div className='details-form'>
            {/* dropdown */}
            {/* <div className="dropdown">
                <div className="dropdown-content">
                    {courses.map((course) => (
                        <span key={course} onClick={() => handleCourseSelect(course)}>
                            {course}
                        </span>
                    ))}
                </div>
            </div>
            <div>
                {selectedCourses.map((course) => (
                    <div key={course}>
                        <span>{course}</span>
                        <span onClick={() => handleCourseRemove(course)}>&times;</span>
                    </div>
                ))}
            </div>

            <button onClick={handleClick}>Go</button> */}
            <h2>Business Details</h2>
            <div className="dropdown">
                <div className="dropdown-header" onClick={toggleDropdown}>
                    Select Courses
                </div>
                {isOpen && (
                    <div className="dropdown-content">
                        {courses.map((course) => (
                            <div key={course} onClick={() => handleCourseSelect(course)}>
                                {course}
                            </div>
                        ))}
                    </div>
                )}
                <div className='dropdown-selected-items'>
                    {selectedCourses.map((course) => (
                        <div key={course} className='dropdown-selected-item'>
                            <span>{course}</span>
                            <span onClick={() => handleCourseRemove(course)}>&times;</span>
                        </div>
                    ))}
                </div>
            </div>

            <hr />

            <h3>About college</h3>
            <textarea name="" id="" cols="30" rows="10"></textarea>
            <hr />

            <h3>Admission Process</h3>
            <textarea name="" id="" cols="30" rows="10"></textarea>
            <hr />

            <h3>Courses</h3>
            {/* <div className="form-input-flex-two">
                <div className="form-input-group">
                    <label htmlFor="collegename">Course Name*</label>
                    <input type="text" placeholder='Enter the course name' />
                </div>

                <div className="form-input-group">
                    <label htmlFor="collegename">Min. Qualification*</label>
                    <input type="text" placeholder='Add qualification' />
                </div>

                <div className="form-input-group">
                    <label htmlFor="collegename">Duration*</label>
                    <input type="text" placeholder='Years' />
                </div>

                <div className="form-input-group">
                    <label htmlFor="collegename">Fee*</label>
                    <input type="text" placeholder='Ex- 1-2L' />
                </div>

                <div className="form-input-group">
                    <label htmlFor="collegename">Distance*</label>
                    <input type="text" placeholder='YES/NO' />
                </div>
            </div> */}

            {[...Array(coursesCount)].map((_, index) => (
                <div className="form-input-flex-two" key={index}>
                    <div className="form-input-group">
                        <label htmlFor="collegename">Course Name*</label>
                        <input type="text" placeholder='Enter the course name' />
                    </div>

                    <div className="form-input-group">
                        <label htmlFor="collegename">Min. Qualification*</label>
                        <input type="text" placeholder='Add qualification' />
                    </div>

                    <div className="form-input-group">
                        <label htmlFor="collegename">Duration*</label>
                        <input type="text" placeholder='Years' />
                    </div>

                    <div className="form-input-group">
                        <label htmlFor="collegename">Fee*</label>
                        <input type="text" placeholder='Ex- 1-2L' />
                    </div>

                    <div className="form-input-group">
                        <label htmlFor="collegename">Distance*</label>
                        <input type="text" placeholder='YES/NO' />
                    </div>

                    <button className='form-remove-button' onClick={handleRemoveCourse}>Remove</button>
                </div>
            ))}

            <button className='form-remove-button form-add-button' onClick={handleAddCourse}>ADD</button>
            <hr />


            <h3>Departments</h3>
            {[...Array(departmentsCount)].map((_, index) => (
                <div className="form-input-flex-two" key={index}>
                    <div className="form-input-group">
                        <label htmlFor="collegename">Department Name*</label>
                        <input type="text" placeholder='eg: Name' />
                    </div>

                    <div className="form-input-group">
                        <label htmlFor="collegename">Description*</label>
                        <input type="text" placeholder='eg: Details' />
                    </div>

                    <div className="form-input-group">
                        <label htmlFor="collegename">Placement %*</label>
                        <input type="text" placeholder='Years' />
                    </div>

                    <button className='form-remove-button' onClick={handleRemoveDepartment}>Remove</button>
                </div>
            ))}

            <button className='form-remove-button form-add-button' onClick={handleAddDepartment}>ADD</button>
            <hr />

            <h3>News</h3>
            {[...Array(newsCount)].map((_, index) => (
                <div className="form-input-flex-two" key={index}>
                    <div className="form-input-group">
                        <label htmlFor="collegename">News Title*</label>
                        <input type="text" placeholder='Add news title' />
                    </div>

                    <div className="form-input-group">
                        <label htmlFor="collegename">Ref. Link*</label>
                        <input type="text" placeholder='Add a reference link' />
                    </div>

                    <button className='form-remove-button' onClick={handleRemoveNews}>Remove</button>
                </div>
            ))}

            <button className='form-remove-button form-add-button' onClick={handleAddNews}>ADD</button>
            <hr />

            <h3>Ranking</h3>
            {[...Array(rankingCount)].map((_, index) => (
                <div className="form-input-flex-two" key={index}>
                    <div className="form-input-group">
                        <label htmlFor="collegename">Agency Name*</label>
                        <input type="text" placeholder='Add agency name' />
                    </div>

                    <div className="form-input-group">
                        <label htmlFor="collegename">Rank*</label>
                        <input type="text" placeholder='Enter the rank' />
                    </div>

                    <div className="form-input-group">
                        <label htmlFor="collegename">Year*</label>
                        <input type="text" placeholder='Add year' />
                    </div>

                    <button className='form-remove-button' onClick={handleRemoveRanking}>Remove</button>
                </div>
            ))}

            <button className='form-remove-button form-add-button' onClick={handleAddRanking}>ADD</button>
            <hr />

            <h3>Other Details</h3>
            <div className="form-input-flex-two">
                <div className="form-input-group">
                    <label htmlFor="collegename">Overall placement*</label>
                    <input type="text" placeholder='Add agency name' />
                </div>

                <div className="form-input-group">
                    <label htmlFor="collegename">Promo/Documentary Video*</label>
                    <input type="text" placeholder='Enter the rank' />
                </div>

                <div className="form-input-group">
                    <label htmlFor="collegename">Scholarship offered?*</label>
                    <input type="text" placeholder='Add year' />
                </div>
            </div>
            <hr />

            <button className='form-submit-button'>Save and Continue</button>
        </div>
    )
}

export default DetailsFormComponent
