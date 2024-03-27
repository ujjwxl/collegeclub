import React from 'react'
import { useState } from 'react';
import './DetailsFormComponent.css'

const DetailsFormComponent = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const courses = ['Engineering', 'Medical', 'Management', 'Sciences', 'Agriculture', 'Law', 'Acting'];

    const [groupCount, setGroupCount] = useState(1);

    const handleAddButtonClick = () => {
        setGroupCount(groupCount + 1);
    };

    const handleRemoveButtonClick = () => {
        setGroupCount(groupCount - 1);
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

            {[...Array(groupCount)].map((_, index) => (
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

                    <button onClick={handleRemoveButtonClick}>Remove</button>
                </div>
            ))}

            <button onClick={handleAddButtonClick}>ADD</button>
        </div>
    )
}

export default DetailsFormComponent
