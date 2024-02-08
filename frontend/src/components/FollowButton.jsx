import React from "react";
import { Box, Button, Modal } from "@mui/material";

function FollowButton(props) {
  const { blog, onBookmarkClick, bookmarkSelect, user_id, userData } = props;

  const handleLikeClick = async () => {
    if (userData.isLoggedIn) {
      if (bookmarkSelect) {
        try {
          const response = await fetch(
            "http://localhost:8001/api/bookmarks/delete",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ user_id: user_id, blog_id: blog.id }),
            }
          );

          if (!response.ok) {
            throw new Error(
              `Failed to post bookmark/delete. Status: ${response.status}`
            );
          }

          const responseData = await response.json();
          console.log("Bookmark deleted:", responseData);

          // Reset the comment box values after submission
          onBookmarkClick(blog);
        } catch (error) {
          console.error("Error when posting:", error.message);
        }
      } else {
        try {
          const response = await fetch("http://localhost:8001/api/bookmarks", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: user_id, blog_id: blog.id }),
          });

          if (!response.ok) {
            throw new Error(
              `Failed to post bookmark. Status: ${response.status}`
            );
          }

          const responseData = await response.json();
          console.log("Bookmark posted:", responseData);

          // Reset the comment box values after submission
          onBookmarkClick(blog);
        } catch (error) {
          console.error("Error when posting:", error.message);
        }
      }
    } else {
      console.log("log in to use bookmarks!");
    }
  };

  return (
    <div>
          <Button
            onClick={() => {
              console.log("Follow");
            }}
            variant="contained"
            color="primary"
          >
            Follow           
          </Button>

    </div>
  );
}

export default FollowButton;
