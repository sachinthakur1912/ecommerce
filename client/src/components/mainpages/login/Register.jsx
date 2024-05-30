import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/register", { ...user });
      localStorage.setItem("firstRegister", true);
      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  console.log(user);
  return (
    <div className="login-page">
       <h3 className="login-heading">Register</h3>

      <form onSubmit={registerHandler} className="form-container">
        <div className="input-field">
        <div className="input-container">
        <label>Name</label>
        <input
          type="text"
          name="name"
          required
          placeholder="Please Enter Your Name"
          value={user.name}
          onChange={onChangeHandler}
        />
        </div>
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
       
       
        
        
        <div className="register-button-container">
          <button type="submit">Sign Up</button>
          <Link to="/login">Back to login</Link>
        </div>
      </form>
    </div>
  );
}
