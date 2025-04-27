import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Popup from "./Popup"; // ודא שהנתיב נכון בהתאם למבנה שלך

const AddRole = () => {
  const [role, setRole] = useState({
    role_name: "",
    can_manage_users: false,
    can_view_reports: false,
    can_assign_leads: false,
    can_edit_courses: false,
    can_manage_tasks: false,
    can_access_all_data: false,
  });

  const [popup, setPopup] = useState({ show: false, message: "", type: "" });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setRole((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/auth/add_role", role)
      .then(() => {
        setPopup({
          show: true,
          message: "🎉 תפקיד נוסף בהצלחה!",
          type: "success",
        });

        // איפוס טופס
        setRole({
          role_name: "",
          can_manage_users: false,
          can_view_reports: false,
          can_assign_leads: false,
          can_edit_courses: false,
          can_manage_tasks: false,
          can_access_all_data: false,
        });

        // ניווט אחרי זמן קצר
        setTimeout(() => {
          navigate("/dashboard/roles");
        }, 3000);
      })
      .catch((err) => {
        console.error(err);
        setPopup({
          show: true,
          message: "אירעה שגיאה בהוספת התפקיד",
          type: "error",
        });
      });
  };

  return (
    <div className="container">
      <div className="form-group">
        <h2 className="title">הוספת תפקיד חדש</h2>

        <form onSubmit={handleSubmit}>
          <label>
            <strong>שם תפקיד:</strong>
          </label>
          <input
            type="text"
            name="role_name"
            value={role.role_name}
            placeholder="הקלד שם תפקיד"
            onChange={handleChange}
            className="form-add"
          />

          <label>
            <input
              type="checkbox"
              name="can_manage_users"
              checked={role.can_manage_users}
              onChange={handleChange}
            />
            ניהול משתמשים
          </label>

          <label>
            <input
              type="checkbox"
              name="can_view_reports"
              checked={role.can_view_reports}
              onChange={handleChange}
            />
            צפייה בדוחות
          </label>

          <label>
            <input
              type="checkbox"
              name="can_assign_leads"
              checked={role.can_assign_leads}
              onChange={handleChange}
            />
            שייכות פניות
          </label>

          <label>
            <input
              type="checkbox"
              name="can_edit_courses"
              checked={role.can_edit_courses}
              onChange={handleChange}
            />
            עריכת קורסים
          </label>

          <label>
            <input
              type="checkbox"
              name="can_manage_tasks"
              checked={role.can_manage_tasks}
              onChange={handleChange}
            />
            ניהול משימות
          </label>

          <label>
            <input
              type="checkbox"
              name="can_access_all_data"
              checked={role.can_access_all_data}
              onChange={handleChange}
            />
            גישה לכל הנתונים
          </label>

          <button type="submit" className="btn-add">
            הוסף תפקיד
          </button>
        </form>
      </div>

      {/* הפופאפ */}
      {popup.show && (
        <Popup
          message={popup.message}
          type={popup.type}
          onClose={() => setPopup({ show: false, message: "", type: "" })}
        />
      )}
    </div>
  );
};

export default AddRole;
