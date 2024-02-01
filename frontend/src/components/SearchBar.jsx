import { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = (props) => {
  const {setSearchTerm, route} = props;
  const [currentSearch, setCurrentSearch] = useState('')

  const handleSearch = (event) => {
    event.preventDefault();
    // Perform search based on the searchTerm
    console.log(`Searching for: ${currentSearch}`);
    setSearchTerm(currentSearch);
    route(`SEARCH_RESULTS`);
  };

  return (
    <form onSubmit={handleSearch}>
      <TextField
        label="Search..."
        variant="outlined"
        value={currentSearch}
        onChange={(e) => setCurrentSearch(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton type="submit" size="large">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
};

export default SearchBar;