import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Search from "./pages/Search";
import Apply from "./pages/Apply";
import EmployerMain from "./pages/EmployerMain";
import ProfileEmployer from "./pages/Profile-Employer/ProfileEmployer";
import ProfileSeeker from "./pages/Profile-Seeker/ProfileSeeker";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Layout from "./Layout/Layout";
import SavedJobs from "./pages/SavedJobs";
import ResumeBuilder from "./pages/ResumeBuilder";
import Applications from "./pages/Applications";
import ResetPassword from "./pages/ResetPassword";
import ForgetPassword from "./pages/ForgetPassword";
import PostJob from "./pages/PostJob";

function App() {

  return (
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
          <Route path="/forget-password" element={<ForgetPassword/>} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
