import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Popup from "./Popup";

const EditRole = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    axios
      .get(`http://localhost:3000/auth/roles/${id}`)
      .then((res) => {
        setRole(res.data.Result[0]);
      })
      .catch((err) => {
        console.error(err);
        setPopup({
          show: true,
          message: "שגיאה בטעינת הנתונים",
          type: "error",
        });
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setRole((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/auth/roles/${id}`, role)
      .then(() => {
        setPopup({
          show: true,
          message: " התפקיד עודכן בהצלחה!",
          type: "success",
        });

        setTimeout(() => {
          navigate("/dashboard/roles");
        }, 3000);
      })
      .catch((err) => {
        console.error(err);
        setPopup({
          show: true,
          message: "אירעה שגיאה בעת העדכון",
          type: "error",
        });
      });
  };

  return (
    <div className="container">
      <div className="form-group">
        <h2 className="title">עריכת תפקיד</h2>

        <form onSubmit={handleSubmit}>
          <label>
            <strong>שם תפקיד:</strong>
          </label>
          <input
            type="text"
            name="role_name"
            value={role.role_name}
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
            עדכן תפקיד
          </button>
        </form>
      </div>

      {/* פופאפ */}
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

export default EditRole;
