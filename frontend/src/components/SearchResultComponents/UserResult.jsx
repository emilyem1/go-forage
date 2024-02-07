import React from "react";
import {
  Card,
  Box,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

const UserResult = (props) => {
  const { user, setUserSelected, setSelectedRoute } = props;
  const handleClick = () => {
    setUserSelected(user);
    setSelectedRoute("USERBLOGS");
  };

  return (
    <Card
      sx={{
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
      <CardMedia
        component="img"
        alt={user.fullname}
        height="100"
        width="100"
        src={`${user.photo_url}`}
        sx={{ objectFit: "cover" }}
      />

      <CardContent
        sx={{
          flex: 1,
          padding: 2,
        }}
      >
        <Typography gutterBottom variant="h6">
          {user.fullname}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user.email}
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
        <Button size="small">Follow</Button>
      </Box>
    </Card>
  );
};

export default UserResult;
