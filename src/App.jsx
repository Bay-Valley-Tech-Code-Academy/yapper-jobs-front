import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react';
import "./App.css";
import Main from "./pages/Main/Main";
import Apply from "./pages/Apply/Apply";
import EmployerMain from "./pages/Employer-Main/EmployerMain";
import ProfileEmployer from "./pages/Profile-Employer/ProfileEmployer";
import ProfileSeeker from "./pages/Profile-Seeker/ProfileSeeker";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Layout from "./components/Layout";
import SavedJobs from "./pages/Saved-Jobs/SavedJobs";
import ResumeBuilder from "./pages/Resume-Builder/ResumeBuilder";
import Applications from "./pages/Applications/Applications";
import ConfirmPassword from "./pages/Confirm-Password/ConfirmPassword";
import PostJob from "./pages/Post-Job/PostJob";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          {/* Routes with Navbar */}
          <Route element={<Layout />}>
            <Route path="/main" element={<Main />} />
            <Route path="apply/:jobId" element={<Apply />} />
            <Route path="employer-main" element={<EmployerMain />} />
            <Route path="profile-employer" element={<ProfileEmployer />} />
            <Route path="profile-seeker" element={<ProfileSeeker />} />
            <Route path="saved-jobs" element={<SavedJobs />} />
            <Route path="resume-builder" element={<ResumeBuilder />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/post-job" element={<PostJob />} />
          </Route>
          {/* Without Navbar */}
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/confirm-password" element={<ConfirmPassword />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
