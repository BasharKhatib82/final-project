import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [values, setValues] = useState({
    user_id: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/userlogin", values)
      .then((result) => {
        if (result.data.success) {
          navigate("/dashboard");
        } else {
          setError(result.data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div className="main">
        <div className="login">
          <h2>התחברות למערכת</h2>
          <div className="massage-err">{error && error}</div>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="user_id" className="label-login">
                <strong>תעודת זהות : </strong>
              </label>
              <input
                type="number"
                name="user_id"
                autoComplete="off"
                placeholder="הקלד תעודת זהות"
                onChange={(e) =>
                  setValues({ ...values, user_id: e.target.value })
                }
                className="form-login"
              />
            </div>
            <div>
              <label htmlFor="password" className="label-login">
                <strong>סיסמה : </strong>
              </label>
              <input
                type="password"
                name="password"
                placeholder="הכנס סיסמה"
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
                className="form-login"
              />
            </div>
            <button className="btn-login">התחברות</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
