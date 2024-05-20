import React, { useState } from 'react';
import './Apply.css';
import { jobs } from "../../jobs";
import { useParams } from 'react-router-dom';

function Apply() {
  const { jobId } = useParams();
  const job = jobs.find((job) => job.id === parseInt(jobId));

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [commute, setCommute] = useState('');
  const [authorizedToWork, setAuthorizedToWork] = useState('');
  const [isVeteran, setIsVeteran] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setFirstName('');
    setLastName('');
    setPhoneNumber('');
    setCity('');
    setState('');
    setCommute('');
    setAuthorizedToWork('');
    setIsVeteran('');
  };

  return (
    <div className="apply-container">
      <h2 className="apply-header">Apply To Job</h2>
      <button className="upload-resume-btn">Upload Resume</button>
      <div className="job-info">
        <div>
          <div className="job-description">
            <p>{job.jobDescription}</p>
          </div>
        </div>
        <div>
          <div className="job-info-item">
            <strong>{job.title}</strong>
          </div>
          <div className="job-info-item">
            <strong>Company:</strong> {job.company}
          </div>
          <div className="job-info-item">
            <strong>Location:</strong> {job.location}
          </div>
          <div className="job-info-item">
            <strong>Status:</strong> {job.status}
          </div>
        </div>
      </div>
      <h3 className="questions-title">Questions</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="state">State:</label>
          <input
            type="text"
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="commute">Will you be able to make the commute? (Yes/No):</label>
          <select
            id="commute"
            value={commute}
            onChange={(e) => setCommute(e.target.value)}
            required
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="authorizedToWork">Are you authorized to work in the United States? (Yes/No):</label>
          <select
            id="authorizedToWork"
            value={authorizedToWork}
            onChange={(e) => setAuthorizedToWork(e.target.value)}
            required
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="isVeteran">Are you a veteran? (Yes/No):</label>
          <select
            id="isVeteran"
            value={isVeteran}
            onChange={(e) => setIsVeteran(e.target.value)}
            required
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Apply;
