import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = (props) => {
  // Handle search logic here
  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    // Perform search based on the searchTerm
    console.log(`Searching for: ${searchTerm}`);
  };

  return (
    <TextField
      label="Search..."
      variant="outlined"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleSearch} size="large">
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;