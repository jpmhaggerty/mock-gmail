import "./App.css";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class CreateSendMail extends React.Component {
  constructor(props) {
    super(props);
    this.toSender = "";
    this.toSubject = "";
    this.toMessage = "";
    this.handleEmailForm = this.handleEmailForm.bind(this);
    this.handleSendMessage = this.handleSendMessage.bind(this);
  }

  handleEmailForm = (event) => this.props.onForm(event.target.value);
  handleSendMessage = (outgoing) => this.props.onFormSend(outgoing);

  fillField(event) {
    this[event.target.name] = event.target.value;
    this.outgoing = {
      "sender": "me@sdicohort.mil",
      "recipient": this.toSender,
      "subject": this.toSubject,
      "message": this.toMessage,
      "date": Date.now(),
      "id": 50
    }
    return;
  }

  render() {
    let open = this.props.open;
    return (
      <div>
        <Button
          id="create-email"
          variant="outlined"
          onClick={(event) => this.handleEmailForm(event)}
        >
          Create Email
        </Button>
        <Dialog
          fullScreen
          open={open}
          onClose={(event) => this.handleEmailForm(event)}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={(event) => this.handleEmailForm(event)}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Send Mail
              </Typography>
              <Button
                autoFocus
                color="inherit"
                onClick={(event) => {
                  this.handleSendMessage(this.outgoing);
                  this.handleEmailForm(event);
                }}
              >
                Send
              </Button>
            </Toolbar>
          </AppBar>
          <List>
            <ListItemText primary="To:" />
            <TextField
              name="toSender"
              onChange={(event) => this.fillField(event)}
              variant="outlined"
              fullWidth="true"
            ></TextField>
            <Divider />
            <ListItemText primary="Subject:" />
            <TextField
              name="toSubject"
              onChange={(event) => this.fillField(event)}
              variant="outlined"
              fullWidth="true"
            ></TextField>
            <Divider />
            <ListItemText primary="Message:" />
            <TextField
              name="toMessage"
              onChange={(event) => this.fillField(event)}
              variant="outlined"
              fullWidth="true"
              multiline="true"
            ></TextField>
          </List>
        </Dialog>
      </div>
    );
  }
}

export default CreateSendMail;
