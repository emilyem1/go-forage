import React, { useState, useEffect } from "react";
import { List, Card, Box } from "@mui/material";
import MushroomResult from "./SearchResultComponents/MushroomResult";
import UserResult from "./SearchResultComponents/UserResult";

const SearchResults = (props) => {
  const { searchTerm } = props;
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    // Make a request to the backend route with the search term
    fetch(
      `http://localhost:8001/api/search?term=${encodeURIComponent(searchTerm)}`
    )
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the search results
        setSearchResults(data);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
      });
  }, [searchTerm]);

  return (
    <main>
      <h2>Search Results</h2>
      <p>Search term: {searchTerm}</p>
      {searchResults && (
        <div>
          {/* Display user results */}
          {searchResults.users && (
            <div>
              <h3>User Results</h3>
              <Box sx={{display: 'flex', justifyContent:'space-evenly', flexWrap: 'wrap', gap: '2rem'}}>
                {searchResults.users.rows.map((user) => (
                  <UserResult key={user.id} user = {user}></UserResult>
                ))}
              </Box>
            </div>
          )}

          {/* Display mushroom results */}
          {searchResults.mushrooms && (
            <div>
              <h3>Mushroom Results</h3>
              <Box sx={{display: 'flex', justifyContent:'space-evenly', flexWrap: 'wrap', gap: '2rem'}}>
                {searchResults.mushrooms.rows.map((mushroom) => (
                  <MushroomResult key={mushroom.id} mushroom = {mushroom}></MushroomResult>
                ))}
              </Box>
            </div>
          )}

          {/* Display blog results */}
          {searchResults.blogs && (
            <div>
              <h3>Blog Results</h3>
              <List>
                {searchResults.blogs.rows.map((blog) => (
                  <Card key={blog.id}>{blog.title}</Card>
                ))}
              </List>
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default SearchResults;
