import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const Row = ({ key, element }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {element.id}
        </TableCell>
        <TableCell align="right">{element.sender}</TableCell>
        <TableCell align="right">{element.subject}</TableCell>
        <TableCell align="right">{element.recipient}</TableCell>
        <TableCell align="right">{element.date}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Message
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {element.message}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const SubjectList = ({ gmailAPIArray }) => {
  let getMyList = gmailAPIArray.map((element, index) => (
    <Row element={element} />
  ));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="left">Item</TableCell>
              <TableCell align="center">Sender</TableCell>
              <TableCell align="center">Subject</TableCell>
              <TableCell align="center">Recipient</TableCell>
              <TableCell align="center">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{getMyList}</TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SubjectList;
