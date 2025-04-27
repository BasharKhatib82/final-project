import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Popup from "./Popup"; // ודא שהנתיב נכון אצלך

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "",
    role_id: null,
  });

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = () => {
    axios
      .get("http://localhost:3000/auth/roles")
      .then((res) => {
        setRoles(res.data.Result);
      })
      .catch((err) => {
        console.error(err);
        setPopup({
          show: true,
          message: "שגיאה בטעינת התפקידים",
          type: "error",
        });
      });
  };

  const handleEdit = (role_id) => {
    window.location.href = `/dashboard/edit_role/${role_id}`;
  };

  const handleDelete = (role_id) => {
    setPopup({
      show: true,
      message: "⚠️ האם אתה בטוח שברצונך למחוק את התפקיד ?",
      type: "confirm",
      role_id: role_id,
    });
  };

  const confirmDelete = (role_id) => {
    axios
      .delete(`http://localhost:3000/auth/roles/${role_id}`)
      .then(() => {
        setPopup({
          show: true,
          message: "✅ התפקיד נמחק בהצלחה",
          type: "success",
        });
        fetchRoles();
      })
      .catch(() => {
        setPopup({
          show: true,
          message: "!אירעה שגיאה במחיקה",
          type: "error",
        });
      });
  };

  return (
    <div className="container">
      <div className="main">
        <h3 className="title">רשימת תפקידים</h3>
        <div className="add-wrapper">
          <Link to="/dashboard/add_role" className="btn-add-dash">
            הוספת תפקיד חדש
          </Link>
        </div>

        <table>
          <thead>
            <tr>
              <th>מזהה</th>
              <th>שם תפקיד</th>
              <th>ניהול משתמשים</th>
              <th>צפייה בדוחות</th>
              <th>שייך פניות</th>
              <th>עריכת קורסים</th>
              <th>ניהול משימות</th>
              <th>גישה לכל הנתונים</th>
              <th>פעולה</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.role_id}>
                <td>{role.role_id}</td>
                <td>{role.role_name}</td>
                <td>{role.can_manage_users ? "✓" : "✗"}</td>
                <td>{role.can_view_reports ? "✓" : "✗"}</td>
                <td>{role.can_assign_leads ? "✓" : "✗"}</td>
                <td>{role.can_edit_courses ? "✓" : "✗"}</td>
                <td>{role.can_manage_tasks ? "✓" : "✗"}</td>
                <td>{role.can_access_all_data ? "✓" : "✗"}</td>
                <td className="action-buttons">
                  <button
                    className="btn-edit"
                    onClick={() => handleEdit(role.role_id)}
                  >
                    עריכה
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(role.role_id)}
                  >
                    מחיקה
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* פופאפ רגיל או אישור מחיקה */}
      {popup.show && popup.type !== "confirm" && (
        <Popup
          message={popup.message}
          type={popup.type}
          onClose={() =>
            setPopup({ show: false, message: "", type: "", role_id: null })
          }
        />
      )}

      {popup.show && popup.type === "confirm" && (
        <Popup
          message={popup.message}
          type="confirm"
          onClose={() =>
            setPopup({ show: false, message: "", type: "", role_id: null })
          }
          onConfirm={() => {
            confirmDelete(popup.role_id);
            setPopup({ show: false, message: "", type: "", role_id: null });
          }}
        />
      )}
    </div>
  );
};

export default Roles;
