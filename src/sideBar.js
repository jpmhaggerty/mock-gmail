import "./App.css";
import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import { Grid } from "@material-ui/core";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import AccountCircle from "@mui/icons-material/AccountCircle";
import FormHelperText from "@mui/material/FormHelperText";

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(message) {
    this.props.onSideFocus(message);
  }

  render() {
    let messages = this.props.messages;
    if (messages !== undefined) {
      return (
        <List>
          {messages.map((message, index) => (
            <Grid>
              <FormControl variant="standard">
                <Box
                  key="index"
                  name={message.id}
                  onClick={(event) => this.handleClick(message)}
                  sx={{
                    my: 1,
                    p: 1,
                    border: "1px solid black",
                    bgcolor: "#888888",
                    "&:hover": {
                      backgroundColor: "#BBBBBB",
                      opacity: [0.9, 0.8, 0.7],
                    },
                  }}
                >
                  <InputLabel htmlFor="input-with-icon-adornment"></InputLabel>
                  <Input
                    id="input-with-icon-adornment"
                    startAdornment={
                      <InputAdornment position="start">
                        <AccountCircle />
                        <h6>{message.sender}</h6>
                      </InputAdornment>
                    }
                  />
                  <item>
                    <h6>{message.subject}</h6>
                  </item>
                  <FormHelperText>
                    <h6>{message.date}</h6>
                  </FormHelperText>
                </Box>
              </FormControl>
            </Grid>
          ))}
        </List>
      );
    } else {
      return <div>Loading</div>;
    }
  }
}

export default SideBar;
