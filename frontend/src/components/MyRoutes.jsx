import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Header from "./Pages/Header";
import Login from "./Pages/Login";
import Dashboard from "./Dashboard";
import Home from "./Home";
import Roles from "./Roles";
import AddRole from "./AddRole";
import EditRole from "./EditRole";
import Users from "./Users";
import AddUser from "./AddUser";
import SuccessMessage from "./SuccessMessage";
import Hours from "./Hours";
import EditHours from "./EditHours";
import Leads from "./Leads";
import AddLead from "./AddLead";
import Courses from "./Courses";
import AddCourse from "./AddCourse";
import Tasks from "./Tasks";
import AddTask from "./AddTask";
import Logs from "./Logs";
import Profile from "./Profile";
import Footer from "./Pages/Footer";
import "../assets/styles/Pages.css";

function MyRoutes() {
  return (
    <>
      <Header />
      <div className="main">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/userlogin" element={<Login />}></Route>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="" element={<Home />}></Route>
            <Route path="/dashboard/roles" element={<Roles />}></Route>
            <Route path="/dashboard/add_role" element={<AddRole />}></Route>
            <Route
              path="/dashboard/edit_role/:id"
              element={<EditRole />}
            ></Route>
            <Route path="/dashboard/users" element={<Users />}></Route>
            <Route path="/dashboard/add_user" element={<AddUser />}></Route>
            <Route
              path="/dashboard/add_user/success"
              element={<SuccessMessage />}
            ></Route>
            <Route path="/dashboard/hours" element={<Hours />}></Route>
            <Route path="/dashboard/edit_hours" element={<EditHours />}></Route>
            <Route path="/dashboard/leads" element={<Leads />}></Route>
            <Route path="/dashboard/add_lead" element={<AddLead />}></Route>
            <Route path="/dashboard/courses" element={<Courses />}></Route>
            <Route path="/dashboard/add_course" element={<AddCourse />}></Route>
            <Route path="/dashboard/tasks" element={<Tasks />}></Route>
            <Route path="/dashboard/add_task" element={<AddTask />}></Route>
            <Route path="/dashboard/logs" element={<Logs />}></Route>
            <Route path="/dashboard/profile" element={<Profile />}></Route>
          </Route>
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default MyRoutes;
