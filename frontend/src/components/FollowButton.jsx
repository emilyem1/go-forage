import React, { useState } from "react";
import { Box, Button, Modal } from "@mui/material";

function FollowButton(props) {
  const { blog, userData, friendData, updatefriendData } = props;
  const user_id = parseInt(userData.user_id);

  const friendsIDs = friendData[user_id]
    ? friendData[user_id].map((friend) => friend.id)
    : [];

  const [isHovered, setIsHovered] = useState(false);

  // const handleLikeClick = async () => {
  //   if (userData.isLoggedIn) {
  //     if (bookmarkSelect) {
  //       try {
  //         const response = await fetch(
  //           "http://localhost:8001/api/bookmarks/delete",
  //           {
  //             method: "POST",
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify({ user_id: user_id, blog_id: blog.id }),
  //           }
  //         );

  //         if (!response.ok) {
  //           throw new Error(
  //             `Failed to post bookmark/delete. Status: ${response.status}`
  //           );
  //         }

  //         const responseData = await response.json();
  //         console.log("Bookmark deleted:", responseData);

  //         // Reset the comment box values after submission
  //         onBookmarkClick(blog);
  //       } catch (error) {
  //         console.error("Error when posting:", error.message);
  //       }
  //     } else {
  //       try {
  //         const response = await fetch("http://localhost:8001/api/bookmarks", {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({ user_id: user_id, blog_id: blog.id }),
  //         });

  //         if (!response.ok) {
  //           throw new Error(
  //             `Failed to post bookmark. Status: ${response.status}`
  //           );
  //         }

  //         const responseData = await response.json();
  //         console.log("Bookmark posted:", responseData);

  //         // Reset the comment box values after submission
  //         onBookmarkClick(blog);
  //       } catch (error) {
  //         console.error("Error when posting:", error.message);
  //       }
  //     }
  //   } else {
  //     console.log("log in to use bookmarks!");
  //   }
  // };

  return (
    <div>
      {blog.user_id !== user_id && (
        <div>
          {!!!friendsIDs.includes(blog.user_id) ? (
            <Button
              onClick={() => {
                console.log(
                  "Old Friends:",
                  JSON.stringify(friendData[user_id])
                );
                updatefriendData({
                  id: blog.user_id,
                  name: blog.username,
                  avatar: blog.avatar,
                  email: blog.user_email,
                });
                console.log(
                  "New Friends:",
                  JSON.stringify(friendData[user_id])
                );
              }}
              variant="contained"
              color="primary"
            >
              Follow
            </Button>
          ) : (
            <Button
              onClick={() => {
                updatefriendData({
                  id: blog.user_id,
                  name: blog.username,
                  avatar: blog.avatar,
                  email: blog.user_email,
                });
              }}
              variant="contained"
              color="primary"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {isHovered ? "Unfollow" : "Following"}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default FollowButton;
