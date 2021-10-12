import * as React from 'react';
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";

class FillMainScreen extends React.Component {

  render() {
    return (
      <React.Fragment>
      <Toolbar />
      <Typography paragraph>
        <h5>ID: {this.props.id}</h5>
        <h5>Sender: {this.props.sender}</h5>
        <h5>Date: {this.props.date}</h5>
        <h5>Subject: {this.props.subject}</h5>
        <h5>Recipient: {this.props.recipient}</h5>
        <h5>Message: {this.props.message}</h5>
      </Typography>
      </React.Fragment>
      )
  }
}

export default FillMainScreen;