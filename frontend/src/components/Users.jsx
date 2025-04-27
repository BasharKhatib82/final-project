import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:3000/auth/users")
      .then((res) => {
        setUsers(res.data.Result);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="container">
      <div className="main">
        <h3 className="title">רשימת עובדים</h3>
        <div className="add-wrapper">
          <Link to="/dashboard/add_user" className="btn-add-dash">
            הוספת עובד חדש
          </Link>
        </div>
        <table>
          <thead>
            <tr>
              <th>תעודת זהות</th>
              <th>שם פרטי</th>
              <th>שם משפחה</th>
              <th>תפקיד</th>
              <th>אימייל</th>
              <th>פעולה</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.user_id}>
                <td>{user.user_id}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.role}</td>
                <td>{user.email}</td>
                <td className="action-buttons">
                  <button className="btn-edit">עריכה</button>
                  <button className="btn-delete">מחיקה</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
