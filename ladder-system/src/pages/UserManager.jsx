import * as React from 'react';
import { Link } from "react-router-dom";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from "@mui/material/TablePagination";

import { Paper, styled, Typography, Container, Box, Button } from '@mui/material';



import IconButton from '@mui/material/IconButton';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

/*
User Manager (v.1)
  - delete user
  - edit user
  - Ladder Moderator and Admin only
  - alphabetical sort users 
User Manager (v.2)
  - (Admin) switch between tournaments
  - (Ladder Moderator) restricted to their tournament
User Manager (v.3)
  - Story for user setting functionality 
*/

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

/* Testing Data */

// return data
function createData(fName, lName, team, role) {
  return { fName, lName, team, role };
}

// Hardcoded Dummy Users
const users = [
  createData('first1', 'last1', 'Team1, Team6', 'Member'),
  createData('first2', 'last2', 'Team2','Member, Team Leader, Moderator'),
  createData('first3', 'last3', 'Team3','Team Leader'),
  createData('first4', 'last4', 'Team4','Ladder Moderator'),
  createData('first5', 'last5', 'Team5','Admin'),
  createData('first6', 'last6', 'Team6','Team Leader'),
];

/* User Manager Page */
export function UserManager() {

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


  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >

        {/* Title */}

        <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
          User Manager
        </Typography>

        {/* Table */}
        <TableContainer component={Paper}>
          <Table>
            {/* Table Header */}
            <TableHead>
              <TableRow>
                <StyledTableCell align="center"> First Name </StyledTableCell>
                <StyledTableCell align="center"> Last Name </StyledTableCell>
                <StyledTableCell align="center"> Team(s) </StyledTableCell>
                <StyledTableCell align="center"> Role(s) </StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
              </TableRow>
            </TableHead>
            {/* Table Body */}
            <TableBody>
            {users.slice(pg * rpg, pg * rpg + rpg).map((user) => (
                <StyledTableRow key={user.name} sx={{ "&:last-child td,  &:last-child th": { border: 0 } }}>
                  <StyledTableCell align="center" sx={{ width: '20%' }} scope="user">{user.fName}</StyledTableCell>
                  <StyledTableCell align="center" sx={{ width: '20%' }} scope="user">{user.lName}</StyledTableCell>
                  <StyledTableCell align="center" sx={{ width: '20%' }}>{user.team}</StyledTableCell>
                  <StyledTableCell align="center" sx={{ width: '20%' }}>{user.role}</StyledTableCell>
                  <StyledTableCell align="right" sx={{ width: '5%' }}>
                    {/* Edit User */}
                    <IconButton  sx={{ width: '25%', height: '10%', marginRight: 4 }}>
                      <ManageAccountsIcon />
                    </IconButton>

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
          <Button variant="text" sx={{ marginTop: 2 }}>Back</Button>
        </Link>

      </Box>
    </Container>
  );
}