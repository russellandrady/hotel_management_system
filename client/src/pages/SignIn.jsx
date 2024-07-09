import { useState } from "react";
import "../styles/style_for_login.css";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const [formdata, setFormdata] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {

    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await response.json();

      if (data.success === false) {
        return;
      }
      navigate("/bookings");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="login-box">
      <div className="login-header">
        <header>Login</header>
      </div>
      <form method="post" onSubmit={handleSubmit}>
        <div className="input-box">
          <input
            type="email"
            className="input-field"
            name="email"
            id="email"
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>
        <div className="input-box">
          <input
            type="password"
            className="input-field"
            name="password"
            id="password"
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>
        <div className="input-submit">
          <button className="submit-btn" id="submit" type="submit"></button>
          <label>Sign In</label>
        </div>
      </form>
      <div className="sign-up-link">
        <p>
          Don't have account?{" "}
          <Link to={"/sign-up"} className="move-link">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
