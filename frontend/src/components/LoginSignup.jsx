import React, { useState } from "react";
import { TextField, Button, Box, Tabs, Tab, Paper } from "@mui/material";
import "../styles/LoginSignup.scss";
import { ThemeProvider } from "@mui/material/styles";

const LoginSignup = (props) => {
  const { setSelectedRoute, setValue, theme } = props;

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    action: "login", // default to login
  });

  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    fullname: "", // for signup only
    profilePhoto: "", // for signup only
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

      if (formData.action === "login") {
        // Check the response for login success or failure
        if (data.success) {
          console.log("Login successful");
          setSelectedRoute("ACCOUNT");
          setValue(4);
        } else {
          console.log("Login failed");
        }
      }

      if (formData.action === "signup") {
        // Check the response for signup success or failure
        if (data.success) {
          console.log("Signup successful");
          setSelectedRoute("ACCOUNT");
          setValue(4);
          //  successful signup
        } else {
          console.log("Signup failed");
          // Handle signup failure
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [tabValue, setTabValue] = useState("login");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <main>
      <ThemeProvider theme={theme}>
        <Box
          container
          justifyContent="center"
          alignItems="center"
          className="formContainer"
          sx={{ display: "flex", margin: "auto", padding:"3% 0" }}
        >
          <Paper sx={{ width: "400px" }}>
            <Tabs value={tabValue} onChange={handleTabChange} centered>
              <Tab label="Login" value="login" />
              <Tab label="Sign Up" value="signup" />
            </Tabs>
            <Box sx={{ p: 2 }}>
              {tabValue === "login" && (
                <form
                  onSubmit={(e) => handleFormSubmit("login", e)}
                  id="login-form"
                  className="form"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <TextField
                    onChange={(e) => handleInputChange("login", e)}
                    type="email"
                    label="E-mail Address"
                    name="email"
                    variant="outlined"
                    required
                  />
                  <TextField
                    onChange={(e) => handleInputChange("login", e)}
                    type="password"
                    label="Password"
                    name="password"
                    variant="outlined"
                    required
                  />
                  <Button type="submit" variant="contained" color="primary">
                    Login
                  </Button>
                  <p>
                    Don't have an account?{" "}
                    <Button onClick={() => setTabValue("signup")}>
                      Sign Up
                    </Button>
                  </p>
                </form>
              )}
              {tabValue === "signup" && (
                <form
                  onSubmit={(e) => handleFormSubmit("signup", e)}
                  id="signup-form"
                  className="form"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <TextField
                    onChange={(e) => handleInputChange("signup", e)}
                    type="email"
                    label="E-mail Address"
                    name="email"
                    variant="outlined"
                    required
                  />
                  <TextField
                    onChange={(e) => handleInputChange("signup", e)}
                    type="text"
                    label="Full Name"
                    name="fullname"
                    variant="outlined"
                    required
                  />
                  <TextField
                    onChange={(e) => handleInputChange("signup", e)}
                    type="password"
                    label="Password"
                    name="password"
                    variant="outlined"
                    required
                  />
                  <TextField
                    onChange={(e) => handleInputChange("signup", e)}
                    type="text"
                    label="Profile Photo (Optional)"
                    name="profilePhoto"
                    variant="outlined"
                  />
                  <Button type="submit" variant="contained" color="primary">
                    Sign Up
                  </Button>
                  <p>
                    Already have an account?{" "}
                    <Button onClick={() => setTabValue("login")}>Log In</Button>
                  </p>
                </form>
              )}
            </Box>
          </Paper>
        </Box>
      </ThemeProvider>
    </main>
  );
};

export default LoginSignup;
