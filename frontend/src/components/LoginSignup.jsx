import "../styles/LoginSignup.scss";
import { useState } from "react";

const LoginSignup = (props) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    action: "login", // default to login
  });

  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    fullname: "", // for signup only
    action: "signup", // default to signup
  });

  const handleInputChange = (form, e) => {
    const formData = form === "login" ? loginData : signupData;
    const setFormData = form === "login" ? setLoginData : setSignupData;

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (form, e) => {
    e.preventDefault();
    const formData = form === "login" ? loginData : signupData;

    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <main>
      <div className="formContainer">
        {/* Login Form */}
        <form
          onSubmit={(e) => handleFormSubmit("login", e)}
          id="login-form"
          className="form"
        >
          <h2>Login</h2>
          <label htmlFor="email">E-mail Address:</label>
          <input
            onChange={(e) => handleInputChange("login", e)}
            type="email"
            className="input-field"
            placeholder="E-mail Address"
            name="email"
            required
          />
          <label htmlFor="email">Password:</label>
          <input
            onChange={(e) => handleInputChange("login", e)}
            type="password"
            className="input-field"
            placeholder="Enter Password"
            name="password"
            required
          />
          <input type="hidden" name="action" value="login" />
          <button type="submit" className="submit-btn">
            Login
          </button>
          <p>
            Don't have an account? <button>Sign Up</button>
          </p>
        </form>

        {/* Signup Form */}
        <form
          onSubmit={(e) => handleFormSubmit("signup", e)}
          id="signup-form"
          className="form"
        >
          <h2>Sign Up</h2>
          <label htmlFor="email">E-mail Address:</label>
          <input
            onChange={(e) => handleInputChange("signup", e)}
            type="email"
            className="input-field"
            placeholder="E-mail Address"
            name="email"
            required
          />
          <label htmlFor="fullname">Full Name:</label>
          <input
            onChange={(e) => handleInputChange("signup", e)}
            type="text"
            className="input-field"
            placeholder="Enter Name"
            name="fullname"
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            onChange={(e) => handleInputChange("signup", e)}
            type="password"
            className="input-field"
            placeholder="Enter Password"
            name="password"
            required
          />
          <label htmlFor="profilePhoto">Profile Photo: (Optional)</label>
          <input
            onChange={(e) => handleInputChange("signup", e)}
            type="text"
            className="input-field"
            placeholder="Link..."
            name="profilePhoto"
          />
          <input type="hidden" name="action" value="signup" />
          <button type="submit" className="submit-btn">
            Sign Up
          </button>
          <p>
            Already have an account? <button>Log In</button>
          </p>
        </form>
      </div>
    </main>
  );
};

export default LoginSignup;
