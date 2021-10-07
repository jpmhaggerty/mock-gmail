import * as React from "react";
import "./App.css";
import Paper from "@mui/material/Paper";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

import SubjectList from "./subjectList.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gmailAPIArray: [],
      searchText: ""
    };
    this.searchBoxBlur = this.searchBoxBlur.bind(this);
    // this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    let response = await fetch("http://localhost:3001/emails");
    if (response.status >= 200 && response.status <= 299) {
      let json = await response.json();
      this.setState({ gmailAPIArray: json });
    } else {
      console.log(response.status, response.statusText);
    }
  }

  searchBoxBlur(event) {
    console.log("1:", this.state.searchText);
    this.setState({ searchText: event.target.value });
    console.log("2:", this.state.searchText);
  }

  render() {
    const Search = styled("div")(({ theme }) => ({
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    }));

    const SearchIconWrapper = styled("div")(({ theme }) => ({
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
      color: "inherit",
      "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
          width: "12ch",
          "&:focus": {
            width: "20ch",
          },
        },
      },
    }));
    return (
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              >
                Galvanize Mail
              </Typography>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  id="search-field"
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  onBlur={(event) => this.searchBoxBlur(event)}
                />
              </Search>
            </Toolbar>
          </AppBar>
        </Box>
        <Paper elevation={5} />
        <SubjectList gmailAPIArray={this.state.gmailAPIArray} />
      </div>
    );
  }
}

export default App;

// <MessageList messages={this.state.gmailFeed ? this.state.gmailFeed : []} />
