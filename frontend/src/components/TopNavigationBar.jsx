import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Overiding the default colour of MUI
const custom = {
  main: '#4D6A66',
};
const theme = createTheme({
  palette: {
    primary: custom,
  },
});

const TopNavigation = (props) => {
  const { route, userData } = props;
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogout = () => {
    return fetch("http://localhost:8001/api/logout", {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response)
        if (response.ok) {
          console.log("Logout successful");
          setValue(4);
          route("LOGINSIGNUP");
        } else {
          console.error("Logout failed");
        }
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Tabs value={value} onChange={handleChange} textColor="primary"
            indicatorColor="primary">
            <Tab label="Map" onClick={() => {route("PUBLIC");}}  />
            <Tab label="Blogs" onClick={() => {route("BLOGLIST");}}/>
            <Tab label="Mushrooms" onClick={() => {route("MUSHROOMS");}}/>
            <Tab label="Field Journal" onClick={() => {route("FIELDJOURNAL");}}/>
            {userData.isLoggedIn && (
              <Tab label="Account" onClick={() => {route("ACCOUNT");}}/>
            )}
            {userData.isLoggedIn && (
              <Tab label="Logout" onClick={() => {handleLogout()}}/>
            )}
            {!userData.isLoggedIn && (
              <Tab label="Login/Signup" onClick={() => {route("LOGINSIGNUP");}}/>
            )}
          </Tabs>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default TopNavigation;