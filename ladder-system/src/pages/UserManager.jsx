import * as React from "react";
import { Link } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";

import { styled, Typography, Container, Box, Button } from "@mui/material";

import { supabase } from "../supabaseClient";

import { useState, useEffect } from "react";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

/*
User Manager (functionality)
  - Admin Only
  - View / Delete Users
*/

/* Dialog Transition */
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

/* Cell and Row Styling */
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

/* Testing Data */

// return data
function createData(fName, lName, email) {
  return { fName, lName, email };
}

/* User Manager Page */
export function UserManager() {
  // Dialog States (Terms and Conditions)
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    const { data } = await supabase
      .from("users")
      .select()
      .eq("activated", true);

    let tempUsers = [];
    data.forEach((user) => {
      tempUsers.push(createData(user.first_name, user.last_name, user.email));
    });

    setUsers(tempUsers);
  }

  // Table Pagination
  const [pg, setpg] = React.useState(0);
  const [rpg, setrpg] = React.useState(5);

  function handleChangePage(event, newpage) {
    setpg(newpage);
  }

  function handleChangeRowsPerPage(event) {
    setrpg(parseInt(event.target.value, 10));
    setpg(0);
  }

  // Delete User
  const deleteUser = async (e) => {
    // delete user from database

    console.log(e);
    console.log(e.email);

    const { data, error } = await supabase
      .from("users")
      .update({ activated: false })
      .eq("email", e.email);

    if (error) {
      console.log(error);
    } else {
      console.log(data);
      window.location.reload();
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        {/* Title */}

        <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
          User Manager
        </Typography>

        {/* Table */}
        <TableContainer>
          <Table>
            {/* Table Header */}
            <TableHead>
              <TableRow>
                <StyledTableCell align="center"> First Name </StyledTableCell>
                <StyledTableCell align="center"> Last Name </StyledTableCell>

                <StyledTableCell align="center"></StyledTableCell>
              </TableRow>
            </TableHead>
            {/* Table Body */}
            <TableBody>
              {users.slice(pg * rpg, pg * rpg + rpg).map((user) => (
                <StyledTableRow
                  key={user.name}
                  sx={{ "&:last-child td,  &:last-child th": { border: 0 } }}>
                  <StyledTableCell
                    align="center"
                    sx={{ width: "20%" }}
                    scope="user">
                    {user.fName}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{ width: "20%" }}
                    scope="user">
                    {user.lName}
                  </StyledTableCell>

                  <StyledTableCell align="right" sx={{ width: "0%" }}>
                    {/* Delete User */}
                    <IconButton
                      sx={{ width: "25%", height: "10%", marginRight: 4 }}
                      onClick={handleClickOpen}>
                      <DeleteIcon />
                    </IconButton>
                    <Dialog
                      open={open}
                      TransitionComponent={Transition}
                      keepMounted
                      onClose={handleClose}
                      BackdropProps={{
                        style: { backgroundColor: "transparent" },
                      }}
                      sx={{ position: "absolute", bottom: "20%" }}>
                      <DialogTitle align="center"> Delete Forever </DialogTitle>
                      <DialogContent>
                        <DialogContentText align="center">
                          Are you sure you wish to delete this user?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          onClick={() => {
                            handleClose();
                            deleteUser(user);
                          }}>
                          Delete
                        </Button>
                        <Button onClick={handleClose}>Cancel</Button>
                      </DialogActions>
                    </Dialog>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Table Footer */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rpg}
          page={pg}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        {/* Return */}
        <Link to="/Settings">
          <Button variant="text" sx={{ marginTop: 2 }}>
            Back
          </Button>
        </Link>
      </Box>
    </Container>
  );
}
