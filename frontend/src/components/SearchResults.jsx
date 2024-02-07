import React, { useState, useEffect } from "react";
import { List, Card, Box } from "@mui/material";
import Carousel from "react-material-ui-carousel";

import MushroomResult from "./SearchResultComponents/MushroomResult";
import UserResult from "./SearchResultComponents/UserResult";
import BlogResult from "./SearchResultComponents/BlogResult";

// ... (previous imports)

const SearchResults = (props) => {
  const {
    searchTerm,
    setBlogSelected,
    setSelectedRoute,
    setValue,
    setMushroomSelected,
    setUserSelected,
  } = props;
  const [searchResults, setSearchResults] = useState(null);
  const itemsPerPage = 3; // Set the number of results per page

  const pagination = function (arrayToPaginate, itemsPerPage) {
    return arrayToPaginate.reduce(
      (paginatedArray, currentItem, currentIndex) => {
        if (currentIndex % itemsPerPage !== 0) {
          // Still within the current page, append the current item
          paginatedArray[paginatedArray.length - 1].push(currentItem);
        } else {
          // Start of a new page, create a new page (chunk) and append the current item
          paginatedArray.push([currentItem]);
        }

        return paginatedArray;
      },
      []
    );
  };

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
            <section
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h3>User Results</h3>
              <Carousel
                navButtonsAlwaysVisible={true}
                autoPlay={false}
                animation={"slide"}
                duration={750}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  width: "90%",
                }}
              >
                {pagination(searchResults.users.rows, itemsPerPage).map(
                  (page, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "2rem",
                        padding: "0rem 4rem",
                      }}
                    >
                      {page.map((user) => (
                        <UserResult
                          key={user.id}
                          user={user}
                          setUserSelected={setUserSelected}
                          setSelectedRoute={setSelectedRoute}
                        ></UserResult>
                      ))}
                    </div>
                  )
                )}
              </Carousel>
            </section>
          )}

          {/* Display mushroom results */}
          {searchResults.mushrooms && (
            <section
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h3>Mushroom Results</h3>
              <Carousel
                navButtonsAlwaysVisible={true}
                autoPlay={false}
                animation={"slide"}
                duration={750}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  width: "80%",
                }}
              >
                {pagination(searchResults.mushrooms.rows, itemsPerPage).map(
                  (page, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "2rem",
                      }}
                    >
                      {page.map((mushroom) => (
                        <MushroomResult
                          key={mushroom.id}
                          mushroom={mushroom}
                          setSelectedRoute={setSelectedRoute}
                          setValue={setValue}
                          setMushroomSelected={setMushroomSelected}
                        ></MushroomResult>
                      ))}
                    </div>
                  )
                )}
              </Carousel>
            </section>
          )}

          {/* Display blog results */}
          {searchResults.blogs && (
            <section
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h3>Blog Results</h3>
              <Carousel
                navButtonsAlwaysVisible={true}
                autoPlay={false}
                animation={"slide"}
                duration={750}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  width: "80%",
                }}
              >
                {pagination(searchResults.blogs.rows, itemsPerPage).map(
                  (page, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "2rem",
                      }}
                    >
                      {page.map((blog) => (
                        <BlogResult
                          key={blog.id}
                          blog={blog}
                          setBlogSelected={setBlogSelected}
                          setSelectedRoute={setSelectedRoute}
                          setValue={setValue}
                        ></BlogResult>
                      ))}
                    </div>
                  )
                )}
              </Carousel>
            </section>
          )}
        </div>
      )}
    </main>
  );
};

export default SearchResults;
