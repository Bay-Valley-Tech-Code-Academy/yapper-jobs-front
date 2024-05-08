import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function NavBar() {
  const navigate = useNavigate();

  return (
    <>
      <div className="navbar">
        <div className="title">
          <h1 onClick={() => navigate("/main")}>Yapper Jobs 🗣️</h1>
        </div>
        <div className="nav-links">
          {/* For Seekers */}
          <ul>
            <Link to="/saved-jobs">
              <li className="link">Your Jobs</li>
            </Link>
            <Link to="/resume-builder">
              <li className="link">Resume Builder</li>
            </Link>
            <Link to="/profile-seeker">
              <li className="link">Profile</li>
            </Link>
          </ul>
          {/* For Employers */}
          <ul>
            <Link to="/post-job">
              <li className="link">Post Job</li>
            </Link>
            <Link to="/applications">
              <li className="link">View Applications</li>
            </Link>
            <Link to="/profile-employer">
              <li className="link">Profile</li>
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
}

export default NavBar;
