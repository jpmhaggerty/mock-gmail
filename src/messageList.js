import * as React from "react";
import { Card, CardMedia, CardContent, Grid, Tooltip } from "@material-ui/core";
import {
  alpha,
  AppBar,
  Badge,
  Box,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  AccountCircle,
  MailIcon,
  MenuIcon,
  MoreIcon,
  NotificationsIcon,
  SearchIcon,
} from "@mui/icons-material";

const MessageList = ({ messages }) => {
  console.log("Passed to messageList:", messages);
  let listMessages = messages.map((message, index) => (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card variant="outlined" className="card">
        <CardContent style={{ backgroundColor: "lightgrey" }}>
          <span key="index">
            <h4>{message.sender}</h4>
            <p>{message.subject}</p>
            <p>{message.message}</p>
          </span>
        </CardContent>
      </Card>
    </Grid>
  ));
  return <ul>{listMessages}</ul>;
};

export default MessageList;

//    <span key="index"><h4>{message.sender}</h4><p>{message.subject}</p></span>
