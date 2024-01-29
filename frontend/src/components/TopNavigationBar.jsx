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
  const { route } = props;
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
            <Tab label="Login/Signup" onClick={() => {route("LOGINSIGNUP");}}/>
            <Tab label="Account" onClick={() => {route("ACCOUNT");}}/>
          </Tabs>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default TopNavigation;