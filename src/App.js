import "./App.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import MailIcon from "@mui/icons-material/Mail";
import CreateSendMail from "./sendMail.js";
import FillMainScreen from "./mainScreen.js";
import SideBar from "./sideBar.js";
import SearchBar from "./searchBar.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backupArray: [],
      gmailAPIArray: [],
      searchArray: [],
      open: false,
      searchText: "",
      curId: "",
      curDate: "",
      curMessage: "",
      curRecipient: "",
      curSender: "",
      curSubject: "",
      // outgoing: [],
      sendToAPI: {},
    };
    this.drawerWidth = 300;
    this.handleEmailForm = this.handleEmailForm.bind(this);
    this.handleSendMessage = this.handleSendMessage.bind(this);
    this.handleFillMain = this.handleFillMain.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleResetSideBar = this.handleResetSideBar.bind(this);
  }

  handleEmailForm() {
    this.setState({ open: this.state.open ? false : true });
  }

  handleSendMessage(outgoing) {
    this.setState({ sendToAPI: outgoing });
    console.log("Ready to send:", this.state.sendToAPI);
    this.postData("http://localhost:3001/send", this.state.sendToAPI).then(
      (data) => {
        console.log(data);
      }
    );
  }

  async postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });
    return response.json();
  }

  handleSearch(searchText) {
    this.handleResetSideBar();
    this.setState({ searchText: searchText });
    console.log("Search text:", this.state.searchText);
    for (let i = 0; i < this.state.gmailAPIArray.length; i++) {
      if (this.state.gmailAPIArray[i].subject.includes(searchText)) {
        this.state.searchArray.push(this.state.gmailAPIArray[i]);
      }
    }
    this.setState({ gmailAPIArray: this.state.searchArray });
    if (this.state.gmailAPIArray.length) {
      this.handleFillMain(this.state.gmailAPIArray[0]);
    } else {
      this.handleFillMain([]);
    }
  }

  handleResetSideBar() {
    this.setState({ gmailAPIArray: this.state.backupArray, searchArray: [] });
    document.getElementById("search-field").value = "";
  }

  handleFillMain(message) {
    this.setState({
      curId: message.id,
      curSender: message.sender,
      curDate: message.date,
      curSubject: message.subject,
      curRecipient: message.recipient,
      curMessage: message.message,
    });
  }

  async componentDidMount() {
    let response = await fetch("http://localhost:3001/emails");
    if (response.status >= 200 && response.status <= 299) {
      let json = await response.json();
      this.setState({ gmailAPIArray: json, backupArray: json });
      console.log("Received from server: ", this.state.gmailAPIArray);
    } else {
      console.log(response.status, response.statusText);
    }
  }

  render() {
    return (
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <SearchBar
          onChange={this.handleSearch}
          onReset={this.handleResetSideBar}
        />
        <Drawer
          variant="permanent"
          sx={{
            width: this.drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: this.drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <MailIcon />
                </ListItemIcon>
                <CreateSendMail
                  open={this.state.open}
                  onForm={this.handleEmailForm}
                  onFormSend={this.handleSendMessage}
                />
              </ListItem>
            </List>
            <Divider />
            <SideBar
              messages={this.state.gmailAPIArray}
              onSideFocus={this.handleFillMain}
            />
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <FillMainScreen
            id={this.state.curId}
            sender={this.state.curSender}
            date={this.state.curDate}
            subject={this.state.curSubject}
            recipient={this.state.curRecipient}
            message={this.state.curMessage}
          />
        </Box>
      </Box>
    );
  }
}

export default App;
