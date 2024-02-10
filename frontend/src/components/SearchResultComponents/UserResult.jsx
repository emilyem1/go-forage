import React from "react";
import FollowButton from "../FollowButton";

import {
  Card,
  Box,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Avatar,
} from "@mui/material";

const UserResult = (props) => {
  const {
    user,
    setUserSelected,
    setSelectedRoute,
    updatefriendData,
    friendData,
    userData,
  } = props;
  const handleClick = () => {
    setUserSelected(user);
    setSelectedRoute("USERBLOGS");
  };
  // console.log (typeof user.id)
  return (
    <Card
      sx={{
        paddingInline: "10px",
        width: 350,
        height: 100,
        display: "flex",
        justifyContent: "space",
        alignItems: "center",
        boxShadow: 3,
        borderRadius: 3,
        transition: "box-shadow 0.3s ease",
        "&:hover": {
          boxShadow: 5,
        },
      }}
    >
      <Avatar
        alt={user.fullname}
        src={`${user.photo_url}`}
        sx={{ width: 90, height: 90 }}
      />

      <CardContent
        sx={{
          flex: 1,
          padding: 1,
        }}
      >
        <Typography gutterBottom variant="h6">
          {user.fullname}
        </Typography>
        
      </CardContent>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div onClick={handleClick}>
          <Button size="small">Blogs</Button>
        </div>
        <FollowButton
          userData={userData}
          blog={{
            user_id: user.id,
            username: user.fullname,
            avatar: user.photo_url,
            user_email: user.email,
          }}
          friendData={friendData}
          updatefriendData={updatefriendData}
        />
      </Box>
    </Card>
  );
};

export default UserResult;
