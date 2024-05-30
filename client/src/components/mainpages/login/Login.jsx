import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/login", { ...user });
      localStorage.setItem("firstLogin", true);
      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  // console.log(user)
  return (
    <div className="login-page">
      <h3 className="login-heading">Login</h3>
      <form onSubmit={loginHandler} className="form-container">
        <div className="input-field">
        <div className="input-container">
        <label>Email Address</label>
        <input
          type="email"
          name="email"
          required
          placeholder="Please Enter Your Email"
          value={user.email}
          onChange={onChangeHandler}
        />
        </div>
        <div className="input-container">
          <label>Password</label>
        <input
          type="password"
          name="password"
          required
          placeholder="Please Enter Your Password"
          value={user.password}
          onChange={onChangeHandler}
        />
        </div>
        
        </div>
      
        <div className="button-container">
          <button type="submit">Login</button>
          <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
}
