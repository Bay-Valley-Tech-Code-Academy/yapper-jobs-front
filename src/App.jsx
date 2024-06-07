import React, { useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Search from "./pages/Search";
import Apply from "./pages/Apply/Apply";
import EmployerMain from "./pages/Employer-Main/EmployerMain";
import ProfileEmployer from "./pages/Profile-Employer/ProfileEmployer";
import ProfileSeeker from "./pages/Profile-Seeker/ProfileSeeker";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Layout from "./Layout/Layout";
import SavedJobs from "./pages/SavedJobs";
import ResumeBuilder from "./pages/Resume-Builder/ResumeBuilder";
import Applications from "./pages/Applications/Applications";
import ResetPassword from "./pages/Reset-Password/ResetPassword";
import ForgetPassword from "./pages/Forget-Password/ForgetPassword";
import PostJob from "./pages/Post-Job/PostJob";
// import { AuthProvider } from "./contexts/AuthContext";
import useUserStore from "./store/user-store";

function App() {
  const { fetchUser } = useUserStore(); // Destructure the fetchUser function from the user store

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    // Fetch user data when the component mounts (application initializes)
    if(jwt){
      console.log("fetching user")
      fetchUser();
    }
  }, [fetchUser]); // Ensure useEffect runs only once

  return (
    // <AuthProvider>
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          {/* Routes with Navbar */}
          <Route element={<Layout />}>
            <Route path="/search" element={<Search />} />
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
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
    // </AuthProvider>
  );
}

export default App;
