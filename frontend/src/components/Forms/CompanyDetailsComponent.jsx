import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const CompanyDetailsComponent = () => {

    const [newsCount, setNewsCount] = useState(1);

    const [aboutCompany, setAboutCompany] = useState("");
    const [companyMission, setCompanyMission] = useState("");
    const [registrationNumber, setRegistrationNumber] = useState("");
    const [promo, setPromo] = useState("");
    const [industryType, setIndustryType] = useState("");

    const userId = sessionStorage.getItem("id");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const newsData = [];
            for (let i = 0; i < newsCount; i++) {
                const newsTitle = e.target[`newsTitle${i}`].value;
                const refLink = e.target[`refLink${i}`].value;
                newsData.push({ newsTitle, refLink });
            }

            await axios
                .post(`http://localhost:5000/auth/detailsform/${userId}`, {
                    aboutCompany,
                    companyMission,
                    news: newsData,
                    registrationNumber,
                    promo,
                    industryType
                })
                .then((res) => {
                    if (res.status === 200) {
                        alert("Details form sent successfully!");
                    }
                })
                .catch((e) => {
                    alert("Please fill all the required fields!");
                    console.log(e);
                });
        } catch (e) {
            console.log(e);
        }
    };

    const handleAddNews = () => {
        setNewsCount(newsCount + 1);
    };

    const handleRemoveNews = () => {
        setNewsCount(newsCount - 1);
    };

    return (
        <div className="details-form">
            <form onSubmit={handleSubmit}>
                <h2>Business Details</h2>

                <hr />

                <h3>About company</h3>
                <textarea
                    onChange={(e) => setAboutCompany(e.target.value)}
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                ></textarea>
                <hr />

                <h3>Why join us? (Mission and Vision)</h3>
                <textarea
                    onChange={(e) => setCompanyMission(e.target.value)}
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                ></textarea>
                <hr />

                <h3>News and Articles</h3>
                {[...Array(newsCount)].map((_, index) => (
                    <div className="form-input-flex-two" key={index}>
                        <div className="form-input-group">
                            <label htmlFor="collegename">News Title*</label>
                            <input
                                type="text"
                                name={`newsTitle${index}`}
                                placeholder="Add news title"
                            />
                        </div>

                        <div className="form-input-group">
                            <label htmlFor="collegename">Ref. Link*</label>
                            <input
                                type="text"
                                name={`refLink${index}`}
                                placeholder="Add a reference link"
                            />
                        </div>

                        <button
                            type="button"
                            className="form-remove-button"
                            onClick={handleRemoveNews}
                        >
                            Remove
                        </button>
                    </div>
                ))}

                <button
                    type="button"
                    className="form-remove-button form-add-button"
                    onClick={handleAddNews}
                >
                    ADD
                </button>
                <hr />

                <h3>Other Details</h3>
                <div className="form-input-flex-two">
                    <div className="form-input-group">
                        <label htmlFor="collegename">Registration No.*</label>
                        <input
                            type="text"
                            onChange={(e) => setRegistrationNumber(e.target.value)}
                            placeholder="Enter registration no."
                        />
                    </div>

                    <div className="form-input-group">
                        <label htmlFor="collegename">Promo/Documentary Video*</label>
                        <input
                            type="text"
                            onChange={(e) => setPromo(e.target.value)}
                            placeholder="Enter the promo video link"
                        />
                    </div>
                </div>
                <div className="form-input-flex-two">
                    <div className="form-input-group">
                        <label htmlFor="collegename">Industry Type</label>
                        <input
                            type="text"
                            onChange={(e) => setIndustryType(e.target.value)}
                            placeholder="Enter industry type"
                        />
                    </div>
                </div>
                <hr />

                <button type="submit" className="form-submit-button">
                    Save and Continue
                </button>
            </form>
        </div>
    )
}

export default CompanyDetailsComponent;
