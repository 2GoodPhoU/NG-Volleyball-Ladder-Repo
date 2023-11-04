import * as React from 'react';
import { Link } from "react-router-dom";
import { useState } from "react";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { Paper, styled, Typography, Container, Box, Button } from '@mui/material';

import IconButton from '@mui/material/IconButton';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

import Popup from "../components/Popup";


// page only accessible by Ladder Admin and Admin

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
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

/* Dropdown / Popup */




/* Testing Data */

// return data
function createData(name, team, role) {
  return { name, team, role };
}

// Hardcoded Dummy Users
const users = [
  createData('User1', 'Team1', 'Member'),
  createData('User2', 'Team2', 'Member'),
  createData('User3', 'Team3', 'Team Leader'),
  createData('User4', 'Team4', 'Ladder Admin'),
  createData('User5', 'Team5', 'Admin'),
];


/* User Manager Page */
export function UserManager() {

  // Popup State
  const [isPopupOpen, togglePopup] = useState(false);

  return (
    <Container component="main" maxWidth="">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >

        {/* Title */}

        <Typography component="h1" variant="h5" sx={{marginBottom: 2}}>
          User Manager
        </Typography>

        {/* Table */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 100 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center" sx={{ width: '25%' }}> Username </StyledTableCell>
                <StyledTableCell align="right" sx={{ width: '25%' }}> Team </StyledTableCell>
                <StyledTableCell align="right" sx={{ width: '45%' }}>Role</StyledTableCell>
                <StyledTableCell align="center" sx={{ width: '5%' }}></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <StyledTableRow key={user.name}>
                  <StyledTableCell align="center" sx={{ width: '25%' }} scope="row">{user.name}</StyledTableCell>
                  <StyledTableCell align="right" sx={{ width: '25%' }}>{user.team}</StyledTableCell>
                  <StyledTableCell align="right" sx={{ width: '45%' }}>{user.role}</StyledTableCell>
                  <StyledTableCell align="right" sx={{ width: '5%' }}>  <IconButton disableRipple> <ManageAccountsIcon onClick={() => togglePopup(true)} /> </IconButton> </StyledTableCell>
                  {isPopupOpen ? <Popup
                                className="userPopup"
                                title="[User]'s Account Information"
                                text="*insert terms here*"
                                closePopup={() => togglePopup(false)} /> : null}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Return */}
        <Link to="/Settings">
          <Button variant="text" sx={{marginTop: 2}}>Back</Button>
        </Link>

      </Box>
    </Container>
  );
}