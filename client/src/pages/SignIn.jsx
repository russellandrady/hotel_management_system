import "../styles/style_for_login.css";
import { Link } from "react-router-dom";

export default function SignIn() {
  return (
    <div className="login-box">
      <div className="login-header">
        <header>Login</header>
      </div>
      <form method="post" action="/login">
        <div className="input-box">
          <input
            type="email"
            className="input-field"
            name="email"
            id="email"
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
      <p>Don't have account? <Link to={"/sign-up"}><div className="move-link">Sign Up</div></Link></p>
      </div>
    </div>
  )
}
