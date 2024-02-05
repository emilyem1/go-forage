// import "../styles/Comments.scss";
import * as React from "react";
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@mui/material";

const Comments = (props) => {
  const { comment } = props;
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt={comment.username} src={comment.avatar} />
      </ListItemAvatar>
      <ListItemText
        primary={comment.username}
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {comment.message}
            </Typography>
          </React.Fragment>
        }
      />
    </ListItem>
  );
};

export default Comments;
