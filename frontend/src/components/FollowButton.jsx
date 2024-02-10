import React, { useState } from "react";
import { Box, Button, Modal } from "@mui/material";

function FollowButton(props) {
  const { blog, userData, friendData, updatefriendData } = props;
  const user_id = parseInt(userData.user_id);
  const friendsIDs = friendData[user_id]
    ? friendData[user_id].map((friend) => friend.id)
    : [];

  const [isHovered, setIsHovered] = useState(false);

  const onFollowClick = async () => {
    if (userData.isLoggedIn) {
      try {
        const response = await fetch("http://localhost:8001/api/friends", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user_id,
            FRIEND_USER_ID: blog.user_id,
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to add friend. Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log("Friend added:", responseData);

        updatefriendData({
          id: blog.user_id,
          name: blog.username,
          avatar: blog.avatar,
          email: blog.user_email,
        });
      } catch (error) {
        console.error("Error when posting:", error.message);
      }
    } else {
      console.log("log in to follow friends!");
    }
  };

  const onUnfollowClick = async () => {
    if (userData.isLoggedIn) {
      try {
        const response = await fetch(
          "http://localhost:8001/api/friends/delete",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: user_id, FRIEND_USER_ID: blog.user_id }),
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to post friends/delete. Status: ${response.status}`
          );
        }

        const responseData = await response.json();
        console.log("Friend deleted:", responseData);

        updatefriendData({
          id: blog.user_id,
          name: blog.username,
          avatar: blog.avatar,
          email: blog.user_email,
        });

      } catch (error) {
        console.error("Error when posting:", error.message);
      }
    } else {
      console.log("log in to use follow friends!");
    }
  };

  return (
    <div>
      {blog.user_id !== user_id && (
        <div>
          {!!!friendsIDs.includes(blog.user_id) ? (
            <Button onClick={onFollowClick} variant="contained" color="primary">
              Follow
            </Button>
          ) : (
            <Button
              onClick={onUnfollowClick}
              variant="contained"
              color={isHovered ? "error" : "primary"}
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
