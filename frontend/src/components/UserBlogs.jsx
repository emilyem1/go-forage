import { useState, useEffect } from "react";
import BlogListItem from "./BlogListItem";
// import "../styles/MushroomList.scss";
import { Box } from "@mui/material";
import {
  Card,
  Avatar,
  CardHeader,
} from "@mui/material";
import { ThemeProvider } from '@mui/material/styles'; 

const UserBlogs = (props) => {
  const {
    blogs,
    setSelectedRoute,
    setBlogSelected,
    bookmarkedBlogs,
    userData,
    onBookmarkClick,
    userSelected,
    setUserSelected,
    friendData,
    theme,
    updatefriendData
  } = props;

  const [icons, setIcons] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8001/api/icons?email=${userSelected.email}`
        );
        const data = await response.json();
        setIcons(data);
      } catch (error) {
        console.error("Error fetching icon data:", error);
      }
    };
    fetchData();
  }, [userSelected.email]);

  return (
    <ThemeProvider theme={theme}>
      <main>
        <div>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              flexWrap: "wrap",
              padding: "10px",
              gap: "2rem",
            }}
          >
            <Card
              sx={{
                boxShadow: 3,
                borderRadius: 3,
              }}
            >
              <CardHeader
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
                avatar={
                  <Avatar
                    sx={{ width: 90, height: 90 }}
                    alt={userSelected.fullname}
                    src={userSelected.photo_url}
                  />
                }
                subheader={
                  <div>
                    <h2>{userSelected.fullname}</h2>
                    <h3>
                      {`${
                        blogs.filter((blog) => blog.user_id === userSelected.id)
                          .length
                      } Blogs`}
                    </h3>
                    {icons.map((icon) => (
                      <img
                        style={{ width: "22px" }}
                        src={`images/${icon.icon}`}
                      />
                    ))}
                  </div>
                }
              />
            </Card>
            {blogs
              .filter((blog) => blog.user_id === userSelected.id)
              .map((blog) => (
                <BlogListItem
                  className="mushroom-list"
                  key={blog.id}
                  blog={blog}
                  setBlogSelected={setBlogSelected}
                  setSelectedRoute={setSelectedRoute}
                  bookmarkedBlogs={bookmarkedBlogs}
                  userData={userData}
                  onBookmarkClick={onBookmarkClick}
                  setUserSelected={setUserSelected}
                  friendData={friendData}
                  updatefriendData={updatefriendData}
                />
              ))}
          </Box>
        </div>
      </main>
    </ThemeProvider>
  );
};

export default UserBlogs;
