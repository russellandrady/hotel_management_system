import { useState } from "react";
import "../styles/style_for_login.css";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formdata, setFormdata] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      setError(false);
      e.preventDefault();
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await response.json();
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
  return (
    <div className="login-box">
      <div className="login-header">
        <header>Register</header>
      </div>
      <form method="post" onSubmit={handleSubmit}>
        <div className="input-box">
          <input
            type="text"
            className="input-field"
            name="username"
            id="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-box">
          <input
            type="email"
            className="input-field"
            name="email"
            id="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-box">
          <input
            type="password"
            className="input-field"
            name="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-submit">
          <button className="submit-btn" id="submit" type="submit"></button>
          <label>Register</label>
        </div>
      </form>
      <div className="sign-up-link">
        <p>Already have account? <Link to={"/"} className="move-link">Login</Link></p>
      </div>
    </div>
  )
}
