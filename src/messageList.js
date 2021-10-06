import Tooltip from "@material-ui/core/Tooltip";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import { CardContent } from "@material-ui/core";

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
