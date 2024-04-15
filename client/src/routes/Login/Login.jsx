import './Login.scss';
import { useState } from "react";
import apiRequest from "../../lib/apiRequest";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const formData = new FormData(e.target);

    const username = formData.get("username")
    const password = formData.get("password")

    try {
      const res = await apiRequest.post("/auth/login", {
        username,
        password,
      })

      navigate("/")
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input
            name="username"
            required
            minLength={3}
            maxLength={20}
            type="text"
            placeholder="Username"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
          />
          <button disabled={isLoading}>Login</button>
          {error && <span>{error}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;