import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SearchBar from './SearchBar';

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
  const { route, userData, value, setValue, setSearchTerm } = props;

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
          setValue(3);
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
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Tabs value={value} onChange={handleChange} textColor="primary"
            indicatorColor="primary" sx = {{alignSelf: 'center'}}>
            <Tab label="Map" onClick={() => {route("PUBLIC");}}  />
            <Tab label="Blogs" onClick={() => {route("BLOGLIST");}}/>
            <Tab label="Mushrooms" onClick={() => {route("MUSHROOMS");}}/>
            {userData.isLoggedIn && (
              <Tab label="Field Journal" onClick={() => {route("FIELDJOURNAL");}}/>
            )}
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
          <Box sx={{alignSelf: 'flex-end', marginTop: '-3.5rem'}}><SearchBar route={route} setSearchTerm={setSearchTerm}/></Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default TopNavigation;