import React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  FaHome,
  FaUserShield,
  FaUsers,
  FaClock,
  FaPhone,
  FaBook,
  FaTasks,
  FaHistory,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

function Dashboard() {
  return (
    <div className="main-dashboard">
      {/* תפריט צד */}
      <div className="sidebar">
        <div className="sidebar-header">
          <span className="title-sidebar">לוח בקרה</span>
        </div>
        <ul className="sidebar-menu">
          <li className="sidebar-item">
            <Link className="sidebar-link" to="/dashboard">
              <FaHome className="icon" /> לוח בקרה
            </Link>
          </li>
          <li className="sidebar-item">
            <Link className="sidebar-link" to="/dashboard/roles">
              <FaUserShield className="icon" /> ניהול תפקידים
            </Link>
          </li>
          <li className="sidebar-item">
            <Link className="sidebar-link" to="/dashboard/users">
              <FaUsers className="icon" /> ניהול עובדים
            </Link>
          </li>
          <li className="sidebar-item">
            <Link className="sidebar-link" to="/dashboard/hours">
              <FaClock className="icon" /> ניהול שעות עבודה
            </Link>
          </li>
          <li className="sidebar-item">
            <Link className="sidebar-link" to="/dashboard/leads">
              <FaPhone className="icon" /> ניהול פניות
            </Link>
          </li>
          <li className="sidebar-item">
            <Link className="sidebar-link" to="/dashboard/courses">
              <FaBook className="icon" /> ניהול קורסים
            </Link>
          </li>
          <li className="sidebar-item">
            <Link className="sidebar-link" to="/dashboard/tasks">
              <FaTasks className="icon" /> ניהול משימות
            </Link>
          </li>
          <li className="sidebar-item">
            <Link className="sidebar-link" to="/dashboard/logs">
              <FaHistory className="icon" /> לוג פעילות
            </Link>
          </li>
          <li className="sidebar-item">
            <Link className="sidebar-link" to="/dashboard/profile">
              <FaCog className="icon" /> הגדרות חשבון
            </Link>
          </li>
          <li className="sidebar-item">
            <Link className="sidebar-link" to="/logout">
              <FaSignOutAlt className="icon" /> יציאה
            </Link>
          </li>
        </ul>
      </div>

      {/* תוכן ראשי */}
      <div className="">
        <div className="">
          <h4>מכללת Links להכשרה מקצועית</h4>

          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
